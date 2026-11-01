import { useState } from 'react'
import { featureById, formatValue, hasValue } from '../data/features.js'

export default function Hotspot({ part, car, pinned, onPin, hover, setHover }) {
  const [local, setLocal] = useState(false)
  const features = part.featureIds.map((id) => featureById[id])
  const present = features.some((f) => hasValue(f, car.values[f.id]))
  const linked = hover.partId === part.id || part.featureIds.includes(hover.featureId)
  const open = local || pinned

  const side = part.x < 200 ? 'left' : part.x > 400 ? 'right' : 'center'
  const vert = part.y > 135 ? 'above' : 'below'

  return (
    <div
      className={`hotspot ${part.group} ${present ? 'on' : 'off'} ${linked ? 'linked' : ''} ${open ? 'open' : ''}`}
      style={{ left: `${(part.x / 600) * 100}%`, top: `${(part.y / 260) * 100}%` }}
      onMouseEnter={() => { setLocal(true); setHover({ partId: part.id }) }}
      onMouseLeave={() => { setLocal(false); setHover({}) }}
    >
      <button
        type="button"
        className="dot"
        aria-label={`${part.label}: ${features.map((f) => `${f.label} ${formatValue(f, car.values[f.id])}`).join(', ')}`}
        aria-expanded={open}
        onClick={onPin}
        onFocus={() => { setLocal(true); setHover({ partId: part.id }) }}
        onBlur={() => { setLocal(false); setHover({}) }}
      />
      {open && (
        <div className={`popover ${side} ${vert}`} role="tooltip">
          <h4>{part.label}</h4>
          <p className="what">{part.description}</p>
          <dl>
            {features.map((f) => (
              <div key={f.id} className={hasValue(f, car.values[f.id]) ? '' : 'missing'}>
                <dt>{f.label}</dt>
                <dd>{formatValue(f, car.values[f.id])}</dd>
              </div>
            ))}
          </dl>
          {pinned && <small>Click again or press Esc to close</small>}
        </div>
      )}
    </div>
  )
}
