import { TIPOLOGIA_COLORS } from '../tipologie'

export default function PoiList({ pois, selectedId, onSelect, onEdit, onDelete }) {
  if (pois.length === 0) {
    return <p className="empty">Nessun POI nel viewport corrente.</p>
  }

  return (
    <ul className="poi-list">
      {pois.map((poi) => (
        <li
          key={poi.id}
          className={poi.id === selectedId ? 'selected' : ''}
          onClick={() => onSelect(poi.id)}
        >
          <span className="dot" style={{ background: TIPOLOGIA_COLORS[poi.tipologia] ?? '#666' }} />
          <div className="poi-info">
            <strong>{poi.nome}</strong>
            <small>{poi.tipologia}</small>
          </div>
          <div className="poi-actions">
            <button type="button" onClick={(e) => { e.stopPropagation(); onEdit(poi) }}>Modifica</button>
            <button type="button" onClick={(e) => { e.stopPropagation(); onDelete(poi.id) }}>Elimina</button>
          </div>
        </li>
      ))}
    </ul>
  )
}
