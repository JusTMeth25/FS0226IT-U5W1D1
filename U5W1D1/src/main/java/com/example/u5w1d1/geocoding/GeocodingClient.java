package com.example.u5w1d1.geocoding;

import com.example.u5w1d1.geocoding.dto.GoogleGeocodeResponse;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.service.annotation.GetExchange;

public interface GeocodingClient {

    @GetExchange("/maps/api/geocode/json")
    GoogleGeocodeResponse geocode(@RequestParam("address") String address, @RequestParam("key") String key);

    @GetExchange("/maps/api/geocode/json")
    GoogleGeocodeResponse reverseGeocode(@RequestParam("latlng") String latlng, @RequestParam("key") String key);
}
