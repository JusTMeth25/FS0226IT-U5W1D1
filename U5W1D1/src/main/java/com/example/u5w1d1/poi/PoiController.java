package com.example.u5w1d1.poi;

import com.example.u5w1d1.poi.dto.PoiRequest;
import com.example.u5w1d1.poi.dto.PoiResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/pois")
public class PoiController {

    private final PoiService poiService;

    public PoiController(PoiService poiService) {
        this.poiService = poiService;
    }

    @GetMapping
    public List<PoiResponse> findInViewport(
            @RequestParam BigDecimal minLat,
            @RequestParam BigDecimal maxLat,
            @RequestParam BigDecimal minLng,
            @RequestParam BigDecimal maxLng
    ) {
        return poiService.findInViewport(minLat, maxLat, minLng, maxLng);
    }

    @GetMapping("/tipologie")
    public TipologiaUrbana[] tipologie() {
        return TipologiaUrbana.values();
    }

    @GetMapping("/{id}")
    public PoiResponse findById(@PathVariable Long id) {
        return poiService.findById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public PoiResponse create(@Valid @RequestBody PoiRequest request) {
        return poiService.create(request);
    }

    @PutMapping("/{id}")
    public PoiResponse update(@PathVariable Long id, @Valid @RequestBody PoiRequest request) {
        return poiService.update(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        poiService.delete(id);
    }
}
