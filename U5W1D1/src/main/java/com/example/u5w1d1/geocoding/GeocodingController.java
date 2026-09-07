package com.example.u5w1d1.geocoding;

import com.example.u5w1d1.geocoding.dto.GeocodeResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;

@RestController
public class GeocodingController {

    private final GeocodingService geocodingService;

    public GeocodingController(GeocodingService geocodingService) {
        this.geocodingService = geocodingService;
    }

    @GetMapping("/api/geocoding")
    public GeocodeResponse geocode(@RequestParam String address) {
        return geocodingService.geocode(address);
    }

    @GetMapping("/api/geocoding/reverse")
    public GeocodeResponse reverseGeocode(@RequestParam BigDecimal lat, @RequestParam BigDecimal lng) {
        return geocodingService.reverseGeocode(lat, lng);
    }
}
