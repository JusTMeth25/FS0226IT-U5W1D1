package com.example.u5w1d1.geocoding;

import com.example.u5w1d1.geocoding.dto.GeocodeResponse;
import com.example.u5w1d1.geocoding.dto.GoogleGeocodeResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class GeocodingService {

    private final GeocodingClient geocodingClient;

    @Value("${google.maps.api-key}")
    private String apiKey;

    public GeocodingService(GeocodingClient geocodingClient) {
        this.geocodingClient = geocodingClient;
    }

    public GeocodeResponse geocode(String address) {
        GoogleGeocodeResponse response = geocodingClient.geocode(address, apiKey);
        if (!"OK".equals(response.status()) || response.results().isEmpty()) {
            throw new GeocodingNotFoundException(address);
        }
        GoogleGeocodeResponse.Result result = response.results().get(0);
        return new GeocodeResponse(
                result.geometry().location().lat(),
                result.geometry().location().lng(),
                result.formatted_address()
        );
    }

    public GeocodeResponse reverseGeocode(BigDecimal latitude, BigDecimal longitude) {
        String latlng = latitude.toPlainString() + "," + longitude.toPlainString();
        GoogleGeocodeResponse response = geocodingClient.reverseGeocode(latlng, apiKey);
        if (!"OK".equals(response.status()) || response.results().isEmpty()) {
            throw new GeocodingNotFoundException(latlng);
        }
        GoogleGeocodeResponse.Result result = response.results().get(0);
        return new GeocodeResponse(latitude, longitude, result.formatted_address());
    }
}
