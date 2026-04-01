package com.yadadri.temple.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

/**
 * Entity representing a Darshan booking made by a visitor.
 * Tracks booking details, visitor information, and booking status.
 */
@Entity
@Table(name = "bookings", indexes = {
    @Index(name = "idx_user_email", columnList = "userEmail"),
    @Index(name = "idx_booking_date", columnList = "bookingDate"),
    @Index(name = "idx_status", columnList = "status")
})
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "darshan_timing_id", nullable = false)
    private DarshanTiming darshanTiming;

    @Column(nullable = false, length = 100)
    private String visitorName;

    @Column(nullable = false, length = 100)
    private String userEmail;

    @Column(nullable = false, length = 20)
    private String phoneNumber;

    @Column(nullable = false)
    private Integer numberOfPersons;

    @Column(name = "booking_date", nullable = false)
    private LocalDateTime bookingDate;

    @Column(length = 50)
    @Builder.Default
    private String status = "PENDING"; // PENDING, CONFIRMED, CANCELLED, COMPLETED

    @Column(length = 500)
    private String specialRequests;

    @Column(name = "created_at", nullable = false, updatable = false)
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at")
    @Builder.Default
    private LocalDateTime updatedAt = LocalDateTime.now();

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
    }
}
