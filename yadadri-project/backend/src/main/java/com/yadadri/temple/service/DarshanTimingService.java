package com.yadadri.temple.service;

import com.yadadri.temple.dto.DarshanTimingDto;
import com.yadadri.temple.exception.ResourceNotFoundException;
import com.yadadri.temple.model.DarshanTiming;
import com.yadadri.temple.repository.DarshanTimingRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Service layer for DarshanTiming operations.
 * Implements business logic for managing Darshan (temple visit) timings.
 * Provides both public and admin operations with proper validation.
 */
@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class DarshanTimingService {

    private final DarshanTimingRepository darshanTimingRepository;

    /**
     * Get all active timings visible to public
     */
    public List<DarshanTimingDto> getPublicTimings() {
        log.info("Fetching public timings");
        return darshanTimingRepository.findByActiveTrue()
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    /**
     * Get all timings (admin only)
     */
    public List<DarshanTimingDto> getAllTimings() {
        log.info("Fetching all timings");
        return darshanTimingRepository.findAll()
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    /**
     * Get timing by ID
     */
    public DarshanTimingDto getTimingById(Long id) {
        log.info("Fetching timing with ID: {}", id);
        return darshanTimingRepository.findById(id)
                .map(this::convertToDto)
                .orElseThrow(() -> new ResourceNotFoundException("Timing not found with ID: " + id));
    }

    /**
     * Create new timing
     */
    public DarshanTimingDto createTiming(DarshanTimingDto dto) {
        log.info("Creating new timing: {}", dto.getSevaName());
        
        DarshanTiming timing = DarshanTiming.builder()
                .sevaName(dto.getSevaName())
                .timeSlot(dto.getTimeSlot())
                .price(dto.getPrice())
                .capacity(dto.getCapacity())
                .dayAvailability(dto.getDayAvailability())
                .active(dto.isActive())
                .currentBooked(0)
                .build();

        DarshanTiming saved = darshanTimingRepository.save(timing);
        log.info("Timing created successfully with ID: {}", saved.getId());
        return convertToDto(saved);
    }

    /**
     * Update existing timing
     */
    public DarshanTimingDto updateTiming(Long id, DarshanTimingDto dto) {
        log.info("Updating timing with ID: {}", id);
        
        DarshanTiming timing = darshanTimingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Timing not found with ID: " + id));

        timing.setSevaName(dto.getSevaName());
        timing.setTimeSlot(dto.getTimeSlot());
        timing.setPrice(dto.getPrice());
        timing.setCapacity(dto.getCapacity());
        timing.setDayAvailability(dto.getDayAvailability());
        timing.setActive(dto.isActive());

        DarshanTiming updated = darshanTimingRepository.save(timing);
        log.info("Timing updated successfully");
        return convertToDto(updated);
    }

    /**
     * Delete timing by ID
     */
    public void deleteTiming(Long id) {
        log.info("Deleting timing with ID: {}", id);
        
        if (!darshanTimingRepository.existsById(id)) {
            throw new ResourceNotFoundException("Timing not found with ID: " + id);
        }
        
        darshanTimingRepository.deleteById(id);
        log.info("Timing deleted successfully");
    }

    /**
     * Toggle active status of timing
     */
    public DarshanTimingDto toggleActive(Long id) {
        log.info("Toggling active status for timing with ID: {}", id);
        
        DarshanTiming timing = darshanTimingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Timing not found with ID: " + id));

        timing.setActive(!timing.isActive());
        DarshanTiming updated = darshanTimingRepository.save(timing);
        
        log.info("Timing active status toggled to: {}", updated.isActive());
        return convertToDto(updated);
    }

    /**
     * Get available timings (with slots available)
     */
    public List<DarshanTimingDto> getAvailableTimings() {
        log.info("Fetching available timings");
        return darshanTimingRepository.findByActiveTrue()
                .stream()
                .filter(DarshanTiming::isAvailable)
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    /**
     * Update booked count for a timing
     */
    public void updateBookedCount(Long timingId, Integer count) {
        DarshanTiming timing = darshanTimingRepository.findById(timingId)
                .orElseThrow(() -> new ResourceNotFoundException("Timing not found with ID: " + timingId));
        
        timing.setCurrentBooked(count);
        darshanTimingRepository.save(timing);
    }

    /**
     * Convert entity to DTO
     */
    private DarshanTimingDto convertToDto(DarshanTiming timing) {
        return DarshanTimingDto.builder()
                .id(timing.getId())
                .sevaName(timing.getSevaName())
                .timeSlot(timing.getTimeSlot())
                .price(timing.getPrice())
                .capacity(timing.getCapacity())
                .dayAvailability(timing.getDayAvailability())
                .active(timing.isActive())
                .currentBooked(timing.getCurrentBooked())
                .build();
    }
}
