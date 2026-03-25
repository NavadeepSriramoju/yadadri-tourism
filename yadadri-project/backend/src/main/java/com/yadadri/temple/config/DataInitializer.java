package com.yadadri.temple.config;

import com.yadadri.temple.model.DarshanTiming;
import com.yadadri.temple.repository.DarshanTimingRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Autowired;

@Component
public class DataInitializer implements CommandLineRunner {

    private final DarshanTimingRepository repo;

    @Autowired
    public DataInitializer(DarshanTimingRepository repo) {
        this.repo = repo;
    }

    @Override
    public void run(String... args) {
        // Seed initial darshan timings so the app works out of the box
        repo.save(DarshanTiming.builder()
                .sevaName("Suprabhatam Darshan").timeSlot("04:30 AM – 05:30 AM")
                .price("Free").capacity(500).dayAvailability("All Days").active(true).build());

        repo.save(DarshanTiming.builder()
                .sevaName("Thomala Seva").timeSlot("07:00 AM – 08:00 AM")
                .price("Paid").capacity(100).dayAvailability("All Days").active(true).build());

        repo.save(DarshanTiming.builder()
                .sevaName("Asthadala Pada Padmaradhana").timeSlot("08:00 AM – 09:00 AM")
                .price("Paid").capacity(50).dayAvailability("Friday, Sunday").active(true).build());

        repo.save(DarshanTiming.builder()
                .sevaName("Nijaroopa Darshan").timeSlot("10:00 AM – 12:00 PM")
                .price("Free").capacity(1000).dayAvailability("All Days").active(true).build());

        repo.save(DarshanTiming.builder()
                .sevaName("Ekanta Seva").timeSlot("01:00 PM – 02:00 PM")
                .price("Paid").capacity(80).dayAvailability("All Days").active(true).build());

        repo.save(DarshanTiming.builder()
                .sevaName("Dolotsavam").timeSlot("05:00 PM – 06:00 PM")
                .price("Paid").capacity(60).dayAvailability("Friday, Sunday").active(false).build());

        repo.save(DarshanTiming.builder()
                .sevaName("Evening Darshan").timeSlot("06:00 PM – 08:00 PM")
                .price("Free").capacity(800).dayAvailability("All Days").active(true).build());

        repo.save(DarshanTiming.builder()
                .sevaName("Pavitrotsavam Seva").timeSlot("08:30 PM – 09:30 PM")
                .price("Paid").capacity(40).dayAvailability("Friday").active(true).build());

        System.out.println("✅ Demo darshan timings seeded successfully!");
    }
}
