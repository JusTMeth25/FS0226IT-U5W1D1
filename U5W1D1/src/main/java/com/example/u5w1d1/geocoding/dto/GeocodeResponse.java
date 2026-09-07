package com.example.u5w1d1.geocoding.dto;

import java.math.BigDecimal;

public record GeocodeResponse(BigDecimal latitude, BigDecimal longitude, String formattedAddress) {
}
