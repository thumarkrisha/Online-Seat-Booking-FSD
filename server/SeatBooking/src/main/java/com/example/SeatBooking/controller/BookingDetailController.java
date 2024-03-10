package com.example.SeatBooking.controller;

import com.example.SeatBooking.entity.User;
import com.example.SeatBooking.entity.BookingDetail;
import com.example.SeatBooking.entity.UserBooking;
import com.example.SeatBooking.repository.BookingDetailRepo;
import com.example.SeatBooking.repository.UserBookingRepo;
import com.example.SeatBooking.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/api/book")
public class BookingDetailController {
    @Autowired
    private BookingDetailRepo bookingDetailRepo;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserBookingRepo userBookingRepo;

    @PostMapping("/details")
    public List<BookingDetail> Booking(@RequestBody List<BookingDetail> bookingDetails, @RequestParam String username, @RequestParam String pnrNumber) {
        User user = userRepository.findByUsername(username);

        if (user == null) {
            throw new IllegalArgumentException("User not found");
        }

        UserBooking userBooking = userBookingRepo.findByPnrNumber(pnrNumber);

        for (BookingDetail bookingDetail : bookingDetails) {
            bookingDetail.setUser(user);
            bookingDetail.setUserBooking(userBooking);
        }

        return bookingDetailRepo.saveAll(bookingDetails);
    }

}
