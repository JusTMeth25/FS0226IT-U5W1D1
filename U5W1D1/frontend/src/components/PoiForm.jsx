import { useEffect, useState } from 'react'
import { fetchTipologie, createPoi, updatePoi, geocodeAddress, reverseGeocode } from '../api/pois'

const emptyForm = {
  nome: '',
  tipologia: '',
  descrizione: '',
  indirizzo: '',
  latitude: '',
  longitude: '',
}

export default function PoiForm({ poi, initialLocation, onClose, onSaved }) {
  const [tipologie, setTipologie] = useState([])
  const [form, setForm] = useState(() => {
    if (poi) {
      return {
        nome: poi.nome,
        tipologia: poi.tipologia,
        descrizione: poi.descrizione ?? '',
        indirizzo: poi.indirizzo ?? '',
        latitude: poi.latitude,
        longitude: poi.longitude,
      }
    }
    if (initialLocation) {
      return { ...emptyForm, latitude: initialLocation.lat, longitude: initialLocation.lng }
    }
    return emptyForm
  })
  const [geocoding, setGeocoding] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchTipologie().then(setTipologie).catch(() => setTipologie([]))
  }, [])

  useEffect(() => {
    if (!initialLocation || poi) return
    reverseGeocode(initialLocation.lat, initialLocation.lng)
      .then((result) => setForm((prev) => ({ ...prev, indirizzo: result.formattedAddress })))
      .catch(() => {})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  const handleGeocode = async () => {
    if (!form.indirizzo) return
    setGeocoding(true)
    setError(null)
    try {
      const result = await geocodeAddress(form.indirizzo)
      setForm((prev) => ({ ...prev, latitude: result.latitude, longitude: result.longitude }))
    } catch (err) {
      setError(err.message)
    } finally {
      setGeocoding(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    const payload = {
      nome: form.nome,
      tipologia: form.tipologia,
      descrizione: form.descrizione || null,
      indirizzo: form.indirizzo || null,
      latitude: Number(form.latitude),
      longitude: Number(form.longitude),
    }
    try {
      if (poi) {
        await updatePoi(poi.id, payload)
      } else {
        await createPoi(payload)
      }
      onSaved()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <form className="modal" onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
        <h2>{poi ? 'Modifica POI' : 'Nuovo POI'}</h2>

        <label>
          Nome
          <input value={form.nome} onChange={handleChange('nome')} required />
        </label>

        <label>
          Tipologia
          <select value={form.tipologia} onChange={handleChange('tipologia')} required>
            <option value="" disabled>Seleziona...</option>
            {tipologie.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </label>

        <label>
          Descrizione
          <textarea value={form.descrizione} onChange={handleChange('descrizione')} />
        </label>

        <label>
          Indirizzo
          <div className="row">
            <input value={form.indirizzo} onChange={handleChange('indirizzo')} />
            <button type="button" onClick={handleGeocode} disabled={geocoding || !form.indirizzo}>
              {geocoding ? 'Geocodifica...' : 'Geocodifica'}
            </button>
          </div>
        </label>

        <div className="row">
          <label>
            Latitudine
            <input
              type="number"
              step="0.000001"
              value={form.latitude}
              onChange={handleChange('latitude')}
              readOnly={Boolean(initialLocation)}
              required
            />
          </label>
          <label>
            Longitudine
            <input
              type="number"
              step="0.000001"
              value={form.longitude}
              onChange={handleChange('longitude')}
              readOnly={Boolean(initialLocation)}
              required
            />
          </label>
        </div>
        {initialLocation && (
          <p className="hint">Posizione impostata dal punto selezionato sulla mappa.</p>
        )}

        {error && <p className="error">{error}</p>}

        <div className="row">
          <button type="submit">Salva</button>
          <button type="button" onClick={onClose}>Annulla</button>
        </div>
      </form>
    </div>
  )
}
