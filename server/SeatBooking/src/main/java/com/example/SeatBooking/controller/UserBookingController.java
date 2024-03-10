package com.example.SeatBooking.controller;

import com.example.SeatBooking.entity.UserBooking;
import com.example.SeatBooking.repository.UserBookingRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/userbooking")
public class UserBookingController {
    @Autowired
    private UserBookingRepo userBookingRepo;
    @PostMapping("/booking")
    public List<UserBooking> Booking(@RequestBody List<UserBooking> userBookings) {
        return userBookingRepo.saveAll(userBookings);
    }

}
