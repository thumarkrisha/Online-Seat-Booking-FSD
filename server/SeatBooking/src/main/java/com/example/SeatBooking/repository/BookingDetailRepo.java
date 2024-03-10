package com.example.SeatBooking.repository;

import com.example.SeatBooking.entity.BookingDetail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookingDetailRepo extends JpaRepository<BookingDetail,Long> {


}
