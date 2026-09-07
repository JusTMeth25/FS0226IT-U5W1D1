package com.example.u5w1d1.poi;

import org.springframework.data.jpa.repository.JpaRepository;

import java.math.BigDecimal;
import java.util.List;

public interface PoiRepository extends JpaRepository<Poi, Long> {

    List<Poi> findByLatitudeBetweenAndLongitudeBetween(
            BigDecimal minLat, BigDecimal maxLat,
            BigDecimal minLng, BigDecimal maxLng
    );
}
