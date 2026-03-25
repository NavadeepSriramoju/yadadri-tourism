package com.yadadri.temple.repository;

import com.yadadri.temple.model.DarshanTiming;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface DarshanTimingRepository extends JpaRepository<DarshanTiming, Long> {
    List<DarshanTiming> findByActiveTrue();
}
