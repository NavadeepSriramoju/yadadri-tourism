package com.yadadri.temple.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

/**
 * Entity representing a Darshan (temple visit) timing slot.
 * Stores information about different Seva (service) offerings with their availability.
 */
@Entity
@Table(name = "darshan_timings", indexes = {
    @Index(name = "idx_active", columnList = "active"),
    @Index(name = "idx_day_availability", columnList = "dayAvailability")
})
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DarshanTiming {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String sevaName;

    @Column(nullable = false, length = 50)
    private String timeSlot;

    @Column(nullable = false, length = 20)
    private String price; // "Free" or "Paid"

    @Column(nullable = false)
    private Integer capacity;

    @Column(nullable = false, length = 50)
    private Integer currentBooked;

    @Column(nullable = false, length = 100)
    private String dayAvailability; // "All Days", "Friday", "Sunday", etc.

    @Column(nullable = false)
    private boolean active = true;

    @Column(name = "created_at", nullable = false, updatable = false)
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at")
    @Builder.Default
    private LocalDateTime updatedAt = LocalDateTime.now();

    /**
     * Calculate available slots
     */
    public Integer getAvailableSlots() {
        return capacity - (currentBooked != null ? currentBooked : 0);
    }

    /**
     * Check if slots are available
     */
    public boolean isAvailable() {
        return active && getAvailableSlots() > 0;
    }

    /**
     * Update the currentBooked count before saving
     */
    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    @PrePersist
    public void prePersist() {
        if (this.createdAt == null) {
            this.createdAt = LocalDateTime.now();
        }
        if (this.updatedAt == null) {
            this.updatedAt = LocalDateTime.now();
        }
        if (this.currentBooked == null) {
            this.currentBooked = 0;
        }
    }
}

