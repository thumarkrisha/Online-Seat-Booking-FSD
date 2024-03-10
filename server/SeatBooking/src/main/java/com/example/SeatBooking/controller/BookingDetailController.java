package com.example.SeatBooking.controller;

import com.example.SeatBooking.entity.User;
import com.example.SeatBooking.entity.UserBooking;
import com.example.SeatBooking.repository.UserBookingRepo;
import com.example.SeatBooking.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
    public List<UserBooking> Booking(@RequestBody List<UserBooking> userBookings, @RequestParam String username) {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new IllegalArgumentException("User not found");
        }

        for (UserBooking userBooking : userBookings) {
            userBooking.setUser(user);
        }

        return userBookingRepo.saveAll(userBookings);
    }

}
