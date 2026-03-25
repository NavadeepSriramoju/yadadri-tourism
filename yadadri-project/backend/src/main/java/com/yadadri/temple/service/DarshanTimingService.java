package com.yadadri.temple.service;

import com.yadadri.temple.model.DarshanTiming;
import com.yadadri.temple.repository.DarshanTimingRepository;
import org.springframework.stereotype.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

@Service
public class DarshanTimingService {

    private final DarshanTimingRepository repo;

    @Autowired
    public DarshanTimingService(DarshanTimingRepository repo) {
        this.repo = repo;
    }

    // Public: only active timings
    public List<DarshanTiming> getPublicTimings() {
        return repo.findByActiveTrue();
    }

    // Admin: all timings
    public List<DarshanTiming> getAllTimings() {
        return repo.findAll();
    }

    public DarshanTiming addTiming(DarshanTiming timing) {
        return repo.save(timing);
    }

    public DarshanTiming updateTiming(Long id, DarshanTiming updated) {
        DarshanTiming existing = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Timing not found: " + id));
        existing.setSevaName(updated.getSevaName());
        existing.setTimeSlot(updated.getTimeSlot());
        existing.setPrice(updated.getPrice());
        existing.setCapacity(updated.getCapacity());
        existing.setDayAvailability(updated.getDayAvailability());
        existing.setActive(updated.isActive());
        return repo.save(existing);
    }

    public void deleteTiming(Long id) {
        repo.deleteById(id);
    }

    public DarshanTiming toggleActive(Long id) {
        DarshanTiming timing = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Timing not found: " + id));
        timing.setActive(!timing.isActive());
        return repo.save(timing);
    }
}
