import { useCallback, useRef, useState } from 'react'
import { APIProvider } from '@vis.gl/react-google-maps'
import MapView from './components/MapView'
import PoiList from './components/PoiList'
import PoiForm from './components/PoiForm'
import { fetchPoisInViewport, deletePoi } from './api/pois'

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
const GOOGLE_MAPS_MAP_ID = import.meta.env.VITE_GOOGLE_MAPS_MAP_ID

function App() {
  const [bounds, setBounds] = useState(null)
  const [pois, setPois] = useState([])
  const [selectedId, setSelectedId] = useState(null)
  const [editingPoi, setEditingPoi] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [pendingLocation, setPendingLocation] = useState(null)
  const debounceRef = useRef(null)

  const loadPois = useCallback((b) => {
    fetchPoisInViewport(b).then(setPois).catch(console.error)
  }, [])

  const handleBoundsChanged = useCallback(
    (newBounds) => {
      setBounds(newBounds)
      if (debounceRef.current) clearTimeout(debounceRef.current)
      debounceRef.current = setTimeout(() => loadPois(newBounds), 400)
    },
    [loadPois]
  )

  const refresh = useCallback(() => {
    if (bounds) loadPois(bounds)
  }, [bounds, loadPois])

  const handleDelete = async (id) => {
    await deletePoi(id)
    if (selectedId === id) setSelectedId(null)
    refresh()
  }

  const handleEdit = (poi) => {
    setEditingPoi(poi)
    setShowForm(true)
  }

  const handleCreate = () => {
    setEditingPoi(null)
    setPendingLocation(null)
    setShowForm(true)
  }

  const handleMapClick = (latLng) => {
    setEditingPoi(null)
    setPendingLocation(latLng)
    setShowForm(true)
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setPendingLocation(null)
  }

  const handleSaved = () => {
    setShowForm(false)
    setEditingPoi(null)
    setPendingLocation(null)
    refresh()
  }

  return (
    <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
      <div className="app">
        <aside className="sidebar">
          <div className="sidebar-header">
            <h1>POI urbani</h1>
            <button type="button" onClick={handleCreate}>+ Nuovo POI</button>
          </div>
          <PoiList
            pois={pois}
            selectedId={selectedId}
            onSelect={setSelectedId}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </aside>
        <main className="map-container">
          <MapView
            mapId={GOOGLE_MAPS_MAP_ID}
            pois={pois}
            selectedId={selectedId}
            onSelect={setSelectedId}
            onBoundsChanged={handleBoundsChanged}
            onMapClick={handleMapClick}
            pendingLocation={pendingLocation}
          />
        </main>
        {showForm && (
          <PoiForm
            poi={editingPoi}
            initialLocation={pendingLocation}
            onClose={handleCloseForm}
            onSaved={handleSaved}
          />
        )}
      </div>
    </APIProvider>
  )
}

export default App
