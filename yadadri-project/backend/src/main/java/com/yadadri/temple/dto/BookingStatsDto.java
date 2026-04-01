package com.yadadri.temple.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO for booking statistics.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BookingStatsDto {
    private int totalBookings;
    private int confirmedBookings;
    private int cancelledBookings;
    private int totalVisitors;
}
