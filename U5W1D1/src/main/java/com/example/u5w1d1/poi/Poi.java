package com.example.u5w1d1.poi;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Check;

import java.math.BigDecimal;
import java.time.Instant;

@Entity
@Table(name = "poi")
@Check(constraints = "latitude BETWEEN -90 AND 90 AND longitude BETWEEN -180 AND 180")
@Getter
@Setter
@NoArgsConstructor
public class Poi {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TipologiaUrbana tipologia;

    private String descrizione;

    private String indirizzo;

    @Column(nullable = false, columnDefinition = "DECIMAL(9,6)")
    private BigDecimal latitude;

    @Column(nullable = false, columnDefinition = "DECIMAL(9,6)")
    private BigDecimal longitude;

    @Column(nullable = false, updatable = false)
    private Instant createdAt;

    @Column(nullable = false)
    private Instant updatedAt;

    @PrePersist
    void onCreate() {
        Instant now = Instant.now();
        createdAt = now;
        updatedAt = now;
    }

    @PreUpdate
    void onUpdate() {
        updatedAt = Instant.now();
    }
}
