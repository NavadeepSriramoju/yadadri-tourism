package com.yadadri.temple.service;

import com.yadadri.temple.dto.BookingDto;
import com.yadadri.temple.exception.ResourceNotFoundException;
import com.yadadri.temple.model.Booking;
import com.yadadri.temple.model.DarshanTiming;
import com.yadadri.temple.repository.BookingRepository;
import com.yadadri.temple.repository.DarshanTimingRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service layer for Booking operations.
 * Implements business logic for managing visitor bookings with proper validations.
 */
@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class BookingService {

    private final BookingRepository bookingRepository;
    private final DarshanTimingRepository darshanTimingRepository;

    /**
     * Create a new booking with validation
     */
    public BookingDto createBooking(BookingDto dto) {
        log.info("Creating new booking for email: {}", dto.getUserEmail());

        // Validate timing exists
        DarshanTiming timing = darshanTimingRepository.findById(dto.getDarshanTimingId())
                .orElseThrow(() -> new ResourceNotFoundException("Darshan timing not found with ID: " + dto.getDarshanTimingId()));

        // Check availability
        if (!timing.isAvailable()) {
            throw new IllegalStateException("No slots available for this timing");
        }

        if (timing.getAvailableSlots() < dto.getNumberOfPersons()) {
            throw new IllegalStateException("Not enough slots available. Available: " + timing.getAvailableSlots());
        }

        // Create booking
        Booking booking = Booking.builder()
                .darshanTiming(timing)
                .visitorName(dto.getVisitorName())
                .userEmail(dto.getUserEmail())
                .phoneNumber(dto.getPhoneNumber())
                .numberOfPersons(dto.getNumberOfPersons())
                .bookingDate(dto.getBookingDate())
                .status("CONFIRMED")
                .specialRequests(dto.getSpecialRequests())
                .build();

        Booking saved = bookingRepository.save(booking);

        // Update booked count
        timing.setCurrentBooked((timing.getCurrentBooked() != null ? timing.getCurrentBooked() : 0) + dto.getNumberOfPersons());
        darshanTimingRepository.save(timing);

        log.info("Booking created successfully with ID: {}", saved.getId());
        return convertToDto(saved);
    }

    /**
     * Get booking by ID
     */
    public BookingDto getBookingById(Long id) {
        log.info("Fetching booking with ID: {}", id);
        return bookingRepository.findById(id)
                .map(this::convertToDto)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with ID: " + id));
    }

    /**
     * Get all bookings for a user
     */
    public List<BookingDto> getBookingsByEmail(String email) {
        log.info("Fetching bookings for email: {}", email);
        return bookingRepository.findByUserEmailOrderByBookingDateDesc(email)
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    /**
     * Get all bookings (admin)
     */
    public List<BookingDto> getAllBookings() {
        log.info("Fetching all bookings");
        return bookingRepository.findAll()
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    /**
     * Cancel a booking
     */
    public BookingDto cancelBooking(Long id) {
        log.info("Cancelling booking with ID: {}", id);

        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with ID: " + id));

        if ("CANCELLED".equals(booking.getStatus())) {
            throw new IllegalStateException("Booking is already cancelled");
        }

        // Restore available slots
        DarshanTiming timing = booking.getDarshanTiming();
        timing.setCurrentBooked(timing.getCurrentBooked() - booking.getNumberOfPersons());
        darshanTimingRepository.save(timing);

        // Update booking status
        booking.setStatus("CANCELLED");
        Booking updated = bookingRepository.save(booking);

        log.info("Booking cancelled successfully");
        return convertToDto(updated);
    }

    /**
     * Update booking status (admin)
     */
    public BookingDto updateBookingStatus(Long id, String status) {
        log.info("Updating booking status to: {}", status);

        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with ID: " + id));

        booking.setStatus(status);
        Booking updated = bookingRepository.save(booking);

        log.info("Booking status updated successfully");
        return convertToDto(updated);
    }

    /**
     * Get booking statistics
     */
    public BookingStatsDto getBookingStats() {
        log.info("Fetching booking statistics");

        List<Booking> allBookings = bookingRepository.findAll();
        int totalBookings = allBookings.size();
        int confirmedBookings = (int) allBookings.stream().filter(b -> "CONFIRMED".equals(b.getStatus())).count();
        int cancelledBookings = (int) allBookings.stream().filter(b -> "CANCELLED".equals(b.getStatus())).count();
        int totalVisitors = allBookings.stream().mapToInt(Booking::getNumberOfPersons).sum();

        return BookingStatsDto.builder()
                .totalBookings(totalBookings)
                .confirmedBookings(confirmedBookings)
                .cancelledBookings(cancelledBookings)
                .totalVisitors(totalVisitors)
                .build();
    }

    /**
     * Convert entity to DTO
     */
    private BookingDto convertToDto(Booking booking) {
        return BookingDto.builder()
                .id(booking.getId())
                .darshanTimingId(booking.getDarshanTiming().getId())
                .visitorName(booking.getVisitorName())
                .userEmail(booking.getUserEmail())
                .phoneNumber(booking.getPhoneNumber())
                .numberOfPersons(booking.getNumberOfPersons())
                .bookingDate(booking.getBookingDate())
                .status(booking.getStatus())
                .specialRequests(booking.getSpecialRequests())
                .createdAt(booking.getCreatedAt())
                .build();
    }
}
