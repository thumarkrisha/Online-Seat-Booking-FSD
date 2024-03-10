package com.example.SeatBooking.repository;

import com.example.SeatBooking.entity.UserBooking;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserBookingRepo extends JpaRepository<UserBooking,Long> {


}
