package com.example.SeatBooking.controller;

import com.example.SeatBooking.entity.User;
import com.example.SeatBooking.entity.BookingDetail;
import com.example.SeatBooking.repository.BookingDetailRepo;
import com.example.SeatBooking.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/book")
public class BookingDetailController {
    @Autowired
    private BookingDetailRepo bookingDetailRepo;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/details")
    public List<BookingDetail> Booking(@RequestBody List<BookingDetail> bookingDetails, @RequestParam String username) {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new IllegalArgumentException("User not found");
        }

        for (BookingDetail bookingDetail : bookingDetails) {
            bookingDetail.setUser(user);
        }

        return bookingDetailRepo.saveAll(bookingDetails);
    }

}
