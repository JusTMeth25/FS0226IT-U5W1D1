package com.example.u5w1d1.poi.dto;

import com.example.u5w1d1.poi.TipologiaUrbana;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record PoiRequest(
        @NotBlank String nome,
        @NotNull TipologiaUrbana tipologia,
        String descrizione,
        String indirizzo,
        @NotNull @DecimalMin("-90") @DecimalMax("90") BigDecimal latitude,
        @NotNull @DecimalMin("-180") @DecimalMax("180") BigDecimal longitude
) {
}
