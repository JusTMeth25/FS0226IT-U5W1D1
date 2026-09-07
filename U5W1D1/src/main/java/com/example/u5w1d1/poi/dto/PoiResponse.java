package com.example.u5w1d1.poi.dto;

import com.example.u5w1d1.poi.TipologiaUrbana;

import java.math.BigDecimal;
import java.time.Instant;

public record PoiResponse(
        Long id,
        String nome,
        TipologiaUrbana tipologia,
        String descrizione,
        String indirizzo,
        BigDecimal latitude,
        BigDecimal longitude,
        Instant createdAt,
        Instant updatedAt
) {
}
