package com.example.u5w1d1.poi;

import com.example.u5w1d1.poi.dto.PoiRequest;
import com.example.u5w1d1.poi.dto.PoiResponse;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
@Transactional(readOnly = true)
public class PoiService {

    private final PoiRepository poiRepository;

    public PoiService(PoiRepository poiRepository) {
        this.poiRepository = poiRepository;
    }

    public List<PoiResponse> findInViewport(BigDecimal minLat, BigDecimal maxLat, BigDecimal minLng, BigDecimal maxLng) {
        return poiRepository.findByLatitudeBetweenAndLongitudeBetween(minLat, maxLat, minLng, maxLng)
                .stream()
                .map(PoiMapper::toResponse)
                .toList();
    }

    public PoiResponse findById(Long id) {
        return PoiMapper.toResponse(getOrThrow(id));
    }

    @Transactional
    public PoiResponse create(PoiRequest request) {
        Poi poi = new Poi();
        PoiMapper.applyRequest(poi, request);
        return PoiMapper.toResponse(poiRepository.save(poi));
    }

    @Transactional
    public PoiResponse update(Long id, PoiRequest request) {
        Poi poi = getOrThrow(id);
        PoiMapper.applyRequest(poi, request);
        return PoiMapper.toResponse(poiRepository.save(poi));
    }

    @Transactional
    public void delete(Long id) {
        if (!poiRepository.existsById(id)) {
            throw new EntityNotFoundException("POI non trovato: " + id);
        }
        poiRepository.deleteById(id);
    }

    private Poi getOrThrow(Long id) {
        return poiRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("POI non trovato: " + id));
    }
}
