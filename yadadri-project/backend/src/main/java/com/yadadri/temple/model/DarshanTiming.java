package com.yadadri.temple.model;

import jakarta.persistence.*;

@Entity
@Table(name = "darshan_timings")
public class DarshanTiming {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String sevaName;

    @Column(nullable = false)
    private String timeSlot;

    @Column(nullable = false)
    private String price; // "Free" or "Paid"

    @Column(nullable = false)
    private Integer capacity;

    @Column(nullable = false)
    private String dayAvailability; // "All Days", "Friday", "Sunday", etc.

    @Column(nullable = false)
    private boolean active = true;

    public DarshanTiming() {}

    public DarshanTiming(Long id, String sevaName, String timeSlot, String price, Integer capacity, String dayAvailability, boolean active) {
        this.id = id;
        this.sevaName = sevaName;
        this.timeSlot = timeSlot;
        this.price = price;
        this.capacity = capacity;
        this.dayAvailability = dayAvailability;
        this.active = active;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getSevaName() { return sevaName; }
    public void setSevaName(String sevaName) { this.sevaName = sevaName; }
    public String getTimeSlot() { return timeSlot; }
    public void setTimeSlot(String timeSlot) { this.timeSlot = timeSlot; }
    public String getPrice() { return price; }
    public void setPrice(String price) { this.price = price; }
    public Integer getCapacity() { return capacity; }
    public void setCapacity(Integer capacity) { this.capacity = capacity; }
    public String getDayAvailability() { return dayAvailability; }
    public void setDayAvailability(String dayAvailability) { this.dayAvailability = dayAvailability; }
    public boolean isActive() { return active; }
    public void setActive(boolean active) { this.active = active; }

    public static DarshanTimingBuilder builder() {
        return new DarshanTimingBuilder();
    }

    public static class DarshanTimingBuilder {
        private String sevaName;
        private String timeSlot;
        private String price;
        private Integer capacity;
        private String dayAvailability;
        private boolean active;

        public DarshanTimingBuilder sevaName(String sevaName) { this.sevaName = sevaName; return this; }
        public DarshanTimingBuilder timeSlot(String timeSlot) { this.timeSlot = timeSlot; return this; }
        public DarshanTimingBuilder price(String price) { this.price = price; return this; }
        public DarshanTimingBuilder capacity(Integer capacity) { this.capacity = capacity; return this; }
        public DarshanTimingBuilder dayAvailability(String dayAvailability) { this.dayAvailability = dayAvailability; return this; }
        public DarshanTimingBuilder active(boolean active) { this.active = active; return this; }

        public DarshanTiming build() {
            DarshanTiming dt = new DarshanTiming();
            dt.setSevaName(this.sevaName);
            dt.setTimeSlot(this.timeSlot);
            dt.setPrice(this.price);
            dt.setCapacity(this.capacity);
            dt.setDayAvailability(this.dayAvailability);
            dt.setActive(this.active);
            return dt;
        }
    }
}
