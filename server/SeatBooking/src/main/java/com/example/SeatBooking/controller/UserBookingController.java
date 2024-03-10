package com.example.SeatBooking.controller;

import com.example.SeatBooking.entity.BookingDetail;
import com.example.SeatBooking.entity.User;
import com.example.SeatBooking.entity.UserBooking;
import com.example.SeatBooking.repository.UserBookingRepo;
import com.example.SeatBooking.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
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
//    @CrossOrigin(origins = "http://localhost:3000")
    public List<String> getBookedSeats(@RequestParam LocalDate date, @RequestParam String time) {
        return userBookingRepo.findBookedSeatsByDateAndTime(date, time);
    }

}
