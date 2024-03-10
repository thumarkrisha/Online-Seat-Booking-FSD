package com.example.SeatBooking.repository;

import com.example.SeatBooking.entity.UserBooking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface UserBookingRepo extends JpaRepository<UserBooking,Long> {

    @Query("SELECT ub.seats FROM UserBooking ub WHERE ub.date = :date AND ub.time = :time")
    List<String> findBookedSeatsByDateAndTime(LocalDate date, String time);

    UserBooking findByPnrNumber(String pnrNumber);


}
