const BASE_URL = 'http://localhost:3001/api'

async function handleResponse(res) {
  if (!res.ok) {
    const body = await res.json().catch(() => null)
    throw new Error(body?.message ?? `Errore HTTP ${res.status}`)
  }
  if (res.status === 204) return null
  return res.json()
}

export function fetchPoisInViewport({ minLat, maxLat, minLng, maxLng }) {
  const params = new URLSearchParams({ minLat, maxLat, minLng, maxLng })
  return fetch(`${BASE_URL}/pois?${params}`).then(handleResponse)
}

export function fetchTipologie() {
  return fetch(`${BASE_URL}/pois/tipologie`).then(handleResponse)
}

export function createPoi(data) {
  return fetch(`${BASE_URL}/pois`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(handleResponse)
}

export function updatePoi(id, data) {
  return fetch(`${BASE_URL}/pois/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(handleResponse)
}

export function deletePoi(id) {
  return fetch(`${BASE_URL}/pois/${id}`, { method: 'DELETE' }).then(handleResponse)
}

export function geocodeAddress(address) {
  const params = new URLSearchParams({ address })
  return fetch(`${BASE_URL}/geocoding?${params}`).then(handleResponse)
}

export function reverseGeocode(lat, lng) {
  const params = new URLSearchParams({ lat, lng })
  return fetch(`${BASE_URL}/geocoding/reverse?${params}`).then(handleResponse)
}
