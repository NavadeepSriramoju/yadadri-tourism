package com.yadadri.temple.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.validation.constraints.*;
import java.time.LocalDateTime;

/**
 * DTO for Booking API requests and responses.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BookingDto {
    private Long id;

    @NotNull(message = "Darshan timing ID is required")
    private Long darshanTimingId;

    @NotBlank(message = "Visitor name is required")
    @Size(min = 2, max = 100)
    private String visitorName;

    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    private String userEmail;

    @NotBlank(message = "Phone number is required")
    @Pattern(regexp = "\\d{10}", message = "Phone number should be 10 digits")
    private String phoneNumber;

    @NotNull(message = "Number of persons is required")
    @Positive(message = "Number of persons must be positive")
    private Integer numberOfPersons;

    @NotNull(message = "Booking date is required")
    private LocalDateTime bookingDate;

    private String status;

    @Size(max = 500)
    private String specialRequests;

    private LocalDateTime createdAt;
}
