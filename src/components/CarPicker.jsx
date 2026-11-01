import { MAX_COMPARE } from '../store.js'

export default function CarPicker({ cars, selected, onToggle, onAdd, onEdit, onDelete }) {
  const full = selected.length >= MAX_COMPARE
  return (
    <section className="picker" aria-label="Choose cars to compare">
      <div className="picker-head">
        <h2>Pick up to {MAX_COMPARE} cars</h2>
        <button type="button" className="primary" onClick={onAdd}>+ Add my car</button>
      </div>
      <ul>
        {cars.map((c) => {
          const on = selected.includes(c.id)
          return (
            <li key={c.id} className={on ? 'on' : ''}>
              <button
                type="button"
                className="chip"
                aria-pressed={on}
                disabled={!on && full}
                title={!on && full ? `Remove a car first (max ${MAX_COMPARE})` : ''}
                onClick={() => onToggle(c.id)}
              >
                <span className="swatch" style={{ background: c.color }} />
                {c.name}
                {c.mine && <em>mine</em>}
              </button>
              {!c.preset && (
                <span className="chip-actions">
                  <button type="button" onClick={() => onEdit(c)} aria-label={`Edit ${c.name}`}>Edit</button>
                  <button type="button" onClick={() => onDelete(c)} aria-label={`Delete ${c.name}`}>Delete</button>
                </span>
              )}
            </li>
          )
        })}
      </ul>
    </section>
  )
}
