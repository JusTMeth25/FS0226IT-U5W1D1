package com.example.u5w1d1.geocoding.dto;

import java.math.BigDecimal;
import java.util.List;

public record GoogleGeocodeResponse(String status, List<Result> results) {

    public record Result(String formatted_address, Geometry geometry) {
    }

    public record Geometry(Location location) {
    }

    public record Location(BigDecimal lat, BigDecimal lng) {
    }
}
