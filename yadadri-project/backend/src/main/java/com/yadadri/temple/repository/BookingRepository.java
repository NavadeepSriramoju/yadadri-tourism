package com.yadadri.temple.repository;

import com.yadadri.temple.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Repository for Booking entity operations.
 * Provides CRUD operations and custom queries for booking management.
 */
@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {

    /**
     * Find all bookings for a specific email
     */
    List<Booking> findByUserEmailOrderByBookingDateDesc(String email);

    /**
     * Find bookings by status
     */
    List<Booking> findByStatus(String status);

    /**
     * Find bookings for a specific darshan timing
     */
    @Query("SELECT b FROM Booking b WHERE b.darshanTiming.id = ?1")
    List<Booking> findByDarshanTimingId(Long darshanTimingId);

    /**
     * Find bookings within a date range
     */
    @Query("SELECT b FROM Booking b WHERE b.bookingDate BETWEEN ?1 AND ?2")
    List<Booking> findBookingsBetweenDates(LocalDateTime startDate, LocalDateTime endDate);

    /**
     * Count bookings for a specific timing
     */
    @Query("SELECT COUNT(b) FROM Booking b WHERE b.darshanTiming.id = ?1 AND b.status != 'CANCELLED'")
    Integer countActiveBookingsForTiming(Long darshanTimingId);
}
