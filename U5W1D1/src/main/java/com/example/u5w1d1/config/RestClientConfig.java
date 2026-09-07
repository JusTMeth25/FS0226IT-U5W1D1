package com.example.u5w1d1.config;

import com.example.u5w1d1.geocoding.GeocodingClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.support.RestClientAdapter;
import org.springframework.web.service.invoker.HttpServiceProxyFactory;

@Configuration
public class RestClientConfig {

    @Value("${google.maps.geocode-base-url}")
    private String geocodeBaseUrl;

    @Bean
    public GeocodingClient geocodingClient() {
        RestClient restClient = RestClient.builder()
                .baseUrl(geocodeBaseUrl)
                .build();
        RestClientAdapter adapter = RestClientAdapter.create(restClient);
        HttpServiceProxyFactory factory = HttpServiceProxyFactory.builderFor(adapter).build();
        return factory.createClient(GeocodingClient.class);
    }
}
