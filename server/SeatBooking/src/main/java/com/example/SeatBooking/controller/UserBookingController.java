package com.example.SeatBooking.controller;

import com.example.SeatBooking.entity.BookingDetail;
import com.example.SeatBooking.entity.User;
import com.example.SeatBooking.entity.UserBooking;
import com.example.SeatBooking.repository.BookingDetailRepo;
import com.example.SeatBooking.repository.UserBookingRepo;
import com.example.SeatBooking.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/userbooking")
public class UserBookingController {

    @Autowired
    private UserBookingRepo userBookingRepo;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BookingDetailRepo bookingDetailRepo;

    @PostMapping("/booking")
    public UserBooking bookingSeat(@RequestBody UserBooking userBookings, @RequestParam String username){
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new IllegalArgumentException("User not found");
        }

        userBookings.setUser(user);
        return userBookingRepo.save(userBookings);
    }

    @GetMapping("/bookedSeats")
    public List<String> getBookedSeats(@RequestParam LocalDate date, @RequestParam String time) {
        return userBookingRepo.findBookedSeatsByDateAndTime(date, time);
    }

    @GetMapping("/fetchbooked")
    public List<String> getFetchBooked(@RequestParam String pnrNumber){
        return userBookingRepo.findSeatsByPnrNumber(pnrNumber);
    }
    @CrossOrigin(origins = "*", methods = {RequestMethod.DELETE, RequestMethod.OPTIONS})
    @DeleteMapping("/cancelling")
    public ResponseEntity<String> cancelBooking(@RequestParam String pnrNumber, @RequestParam String seatNos) {
        List<String> seatNo = Arrays.asList(seatNos.split(","));
        UserBooking userBooking = userBookingRepo.findByPnrNumber(pnrNumber);

        if (userBooking == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Booking not found");
        }

        List<String> seats = userBooking.getSeats();
        List<String> seatsToRemove = new ArrayList<>();

        for (String seat : seatNo) {
            if (!seats.contains(seat)) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Seat " + seat + " not booked");
            }
            seatsToRemove.add(seat);
        }


        // Remove the seats from the seats list
        seats.removeAll(seatsToRemove);

        // Delete the associated booking details
        List<BookingDetail> bookingDetails = bookingDetailRepo.findByUserBookingAndSeatNoIn(userBooking, seatsToRemove);
        bookingDetailRepo.deleteInBatch(bookingDetails);

        // Update the UserBooking entity
        userBooking.setSeats(seats);
        userBookingRepo.save(userBooking);

        return ResponseEntity.ok("Seats canceled successfully");
    }

}
