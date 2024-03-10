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

    @DeleteMapping("/cancelling")
    public ResponseEntity<String> cancelBooking(@RequestParam String pnrNumber, @RequestParam String seatNo) {
        UserBooking userBooking = userBookingRepo.findByPnrNumber(pnrNumber);

        if (userBooking == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Booking not found");
        }

        List<String> seats = userBooking.getSeats();
        if (!seats.contains(seatNo)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Seat not booked");
        }

        // Remove the seat from the seats list
        seats.remove(seatNo);

        // Delete the associated booking detail
        List<BookingDetail> bookingDetails = bookingDetailRepo.findByUserBooking(userBooking);
        for (BookingDetail bookingDetail : bookingDetails) {
            if (bookingDetail.getSeatNo().equals(seatNo)) {
                bookingDetailRepo.delete(bookingDetail);
                break;
            }
        }

        // Update the UserBooking entity
        userBooking.setSeats(seats);
        userBookingRepo.save(userBooking);

        return ResponseEntity.ok("Seat canceled successfully");
    }

}
