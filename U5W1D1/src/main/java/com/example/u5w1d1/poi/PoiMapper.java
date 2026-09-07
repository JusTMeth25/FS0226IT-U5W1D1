package com.example.u5w1d1.poi;

import com.example.u5w1d1.poi.dto.PoiRequest;
import com.example.u5w1d1.poi.dto.PoiResponse;

public class PoiMapper {

    private PoiMapper() {
    }

    public static PoiResponse toResponse(Poi poi) {
        return new PoiResponse(
                poi.getId(),
                poi.getNome(),
                poi.getTipologia(),
                poi.getDescrizione(),
                poi.getIndirizzo(),
                poi.getLatitude(),
                poi.getLongitude(),
                poi.getCreatedAt(),
                poi.getUpdatedAt()
        );
    }

    public static void applyRequest(Poi poi, PoiRequest request) {
        poi.setNome(request.nome());
        poi.setTipologia(request.tipologia());
        poi.setDescrizione(request.descrizione());
        poi.setIndirizzo(request.indirizzo());
        poi.setLatitude(request.latitude());
        poi.setLongitude(request.longitude());
    }
}
