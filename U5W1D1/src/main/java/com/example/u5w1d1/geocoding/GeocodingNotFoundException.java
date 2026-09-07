package com.example.u5w1d1.geocoding;

public class GeocodingNotFoundException extends RuntimeException {

    public GeocodingNotFoundException(String address) {
        super("Nessun risultato di geocoding per l'indirizzo: " + address);
    }
}
