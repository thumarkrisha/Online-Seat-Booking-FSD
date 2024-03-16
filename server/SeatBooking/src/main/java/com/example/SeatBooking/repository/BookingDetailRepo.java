package com.example.SeatBooking.repository;

import com.example.SeatBooking.entity.BookingDetail;
import com.example.SeatBooking.entity.UserBooking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookingDetailRepo extends JpaRepository<BookingDetail,Long> {
    List<BookingDetail> findByUserBookingAndSeatNoIn(UserBooking userBooking, List<String> seatNos);

}
