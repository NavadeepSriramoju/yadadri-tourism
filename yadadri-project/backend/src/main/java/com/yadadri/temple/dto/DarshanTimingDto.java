package com.yadadri.temple.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.validation.constraints.*;

/**
 * DTO for DarshanTiming API requests.
 * Includes validation annotations for input validation.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DarshanTimingDto {
    private Long id;

    @NotBlank(message = "Seva name is required")
    @Size(min = 2, max = 100, message = "Seva name should be between 2-100 characters")
    private String sevaName;

    @NotBlank(message = "Time slot is required")
    private String timeSlot;

    @NotBlank(message = "Price type is required")
    @Pattern(regexp = "Free|Paid", message = "Price should be either 'Free' or 'Paid'")
    private String price;

    @NotNull(message = "Capacity is required")
    @Positive(message = "Capacity must be positive")
    private Integer capacity;

    @NotBlank(message = "Day availability is required")
    private String dayAvailability;

    private boolean active;

    private Integer currentBooked;
}
