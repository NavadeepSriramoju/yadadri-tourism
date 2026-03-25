package com.yadadri.temple.controller;

import com.yadadri.temple.model.DarshanTiming;
import com.yadadri.temple.service.DarshanTimingService;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class DarshanTimingController {

    private final DarshanTimingService service;

    @Autowired
    public DarshanTimingController(DarshanTimingService service) {
        this.service = service;
    }

    // ── Public endpoints ──────────────────────────────────────────────
    @GetMapping("/api/darshan/public/timings")
    public ResponseEntity<List<DarshanTiming>> getPublicTimings() {
        return ResponseEntity.ok(service.getPublicTimings());
    }

    // ── Admin endpoints (protected by JWT in SecurityConfig) ─────────
    @GetMapping("/api/darshan/admin/timings")
    public ResponseEntity<List<DarshanTiming>> getAllTimings() {
        return ResponseEntity.ok(service.getAllTimings());
    }

    @PostMapping("/api/darshan/admin/timings")
    public ResponseEntity<DarshanTiming> addTiming(@RequestBody DarshanTiming timing) {
        return ResponseEntity.ok(service.addTiming(timing));
    }

    @PutMapping("/api/darshan/admin/timings/{id}")
    public ResponseEntity<DarshanTiming> updateTiming(
            @PathVariable Long id, @RequestBody DarshanTiming timing) {
        return ResponseEntity.ok(service.updateTiming(id, timing));
    }

    @DeleteMapping("/api/darshan/admin/timings/{id}")
    public ResponseEntity<Void> deleteTiming(@PathVariable Long id) {
        service.deleteTiming(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/api/darshan/admin/timings/{id}/toggle")
    public ResponseEntity<DarshanTiming> toggleActive(@PathVariable Long id) {
        return ResponseEntity.ok(service.toggleActive(id));
    }
}
