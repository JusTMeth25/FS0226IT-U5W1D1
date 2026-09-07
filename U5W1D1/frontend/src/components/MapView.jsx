import { useCallback, useEffect, useRef, useState } from 'react'
import { Map, AdvancedMarker, InfoWindow, useMap } from '@vis.gl/react-google-maps'
import { MarkerClusterer } from '@googlemaps/markerclusterer'
import { TIPOLOGIA_COLORS } from '../tipologie'

const DEFAULT_CENTER = { lat: 41.9028, lng: 12.4964 }
const DEFAULT_ZOOM = 14

function Markers({ pois, onSelect }) {
  const map = useMap()
  const [markers, setMarkers] = useState({})
  const clustererRef = useRef(null)

  useEffect(() => {
    if (!map) return
    clustererRef.current = new MarkerClusterer({ map })
    return () => {
      clustererRef.current?.clearMarkers()
      clustererRef.current = null
    }
  }, [map])

  useEffect(() => {
    const clusterer = clustererRef.current
    if (!clusterer) return
    clusterer.clearMarkers()
    clusterer.addMarkers(Object.values(markers))
  }, [markers])

  const setMarkerRef = useCallback((marker, id) => {
    setMarkers((prev) => {
      if (marker && prev[id] === marker) return prev
      if (!marker && !prev[id]) return prev
      const next = { ...prev }
      if (marker) next[id] = marker
      else delete next[id]
      return next
    })
  }, [])

  return pois.map((poi) => (
    <Marker key={poi.id} poi={poi} onSelect={onSelect} setMarkerRef={setMarkerRef} />
  ))
}

function Marker({ poi, onSelect, setMarkerRef }) {
  const ref = useCallback((marker) => setMarkerRef(marker, poi.id), [setMarkerRef, poi.id])

  return (
    <AdvancedMarker
      position={{ lat: Number(poi.latitude), lng: Number(poi.longitude) }}
      ref={ref}
      onClick={() => onSelect(poi.id)}
    >
      <div
        className="marker-pin"
        style={{ background: TIPOLOGIA_COLORS[poi.tipologia] ?? '#666' }}
        title={poi.tipologia}
      />
    </AdvancedMarker>
  )
}

function PanToSelected({ pois, selectedId }) {
  const map = useMap()
  useEffect(() => {
    if (!map || selectedId == null) return
    const poi = pois.find((p) => p.id === selectedId)
    if (!poi) return
    map.panTo({ lat: Number(poi.latitude), lng: Number(poi.longitude) })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, selectedId])
  return null
}

function BoundsWatcher({ onBoundsChanged }) {
  const map = useMap()
  useEffect(() => {
    if (!map) return
    const listener = map.addListener('bounds_changed', () => {
      const bounds = map.getBounds()
      if (!bounds) return
      const ne = bounds.getNorthEast()
      const sw = bounds.getSouthWest()
      onBoundsChanged({
        minLat: sw.lat(),
        maxLat: ne.lat(),
        minLng: sw.lng(),
        maxLng: ne.lng(),
      })
    })
    return () => listener.remove()
  }, [map, onBoundsChanged])
  return null
}

export default function MapView({ mapId, pois, selectedId, onSelect, onBoundsChanged, onMapClick, pendingLocation }) {
  const selectedPoi = pois.find((p) => p.id === selectedId)

  return (
    <Map
      mapId={mapId}
      defaultCenter={DEFAULT_CENTER}
      defaultZoom={DEFAULT_ZOOM}
      gestureHandling="greedy"
      style={{ width: '100%', height: '100%' }}
      onClick={(e) => {
        if (e.detail.latLng) onMapClick(e.detail.latLng)
      }}
    >
      <Markers pois={pois} onSelect={onSelect} />
      <PanToSelected pois={pois} selectedId={selectedId} />
      <BoundsWatcher onBoundsChanged={onBoundsChanged} />
      {pendingLocation && (
        <AdvancedMarker position={pendingLocation}>
          <div className="marker-pin marker-pin-pending" />
        </AdvancedMarker>
      )}
      {selectedPoi && (
        <InfoWindow
          position={{ lat: Number(selectedPoi.latitude), lng: Number(selectedPoi.longitude) }}
          onCloseClick={() => onSelect(null)}
        >
          <div>
            <strong>{selectedPoi.nome}</strong>
            <div>{selectedPoi.tipologia}</div>
            {selectedPoi.descrizione && <p>{selectedPoi.descrizione}</p>}
            {selectedPoi.indirizzo && <p>{selectedPoi.indirizzo}</p>}
            <small>
              {Number(selectedPoi.latitude).toFixed(6)}, {Number(selectedPoi.longitude).toFixed(6)}
            </small>
          </div>
        </InfoWindow>
      )}
    </Map>
  )
}
