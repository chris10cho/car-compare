import { useEffect, useState } from 'react'
import { PARTS } from '../data/features.js'
import Hotspot from './Hotspot.jsx'

// Side-view outlines, car faces right. Hotspot positions in features.js are
// chosen to sit inside every outline.
const BODIES = {
  sedan: {
    body: 'M40 196 L40 160 Q42 148 70 142 L170 128 Q215 82 275 80 L360 80 Q405 82 430 124 L520 134 Q565 142 568 170 L568 196 Z',
    glass: 'M195 128 Q228 92 275 90 L355 90 Q392 92 415 124 Z',
  },
  suv: {
    body: 'M40 196 L40 150 Q42 134 70 130 L150 120 Q165 70 225 66 L410 66 Q440 68 452 116 L525 128 Q568 138 568 170 L568 196 Z',
    glass: 'M168 118 Q180 76 228 74 L405 74 Q428 76 440 114 Z',
  },
  truck: {
    body: 'M40 196 L40 128 L235 128 L245 76 Q250 68 270 68 L380 68 Q410 70 425 118 L525 124 Q568 132 568 165 L568 196 Z',
    glass: 'M256 78 L378 78 Q400 80 413 116 L256 116 Z',
  },
  coupe: {
    body: 'M40 196 L40 165 Q44 150 80 146 L190 134 Q240 96 300 94 L360 94 Q410 100 440 132 L525 140 Q566 148 568 172 L568 196 Z',
    glass: 'M205 130 Q245 102 300 102 L358 102 Q395 106 420 128 Z',
  },
}

function Wheel({ cx }) {
  return (
    <g>
      <circle cx={cx} cy="186" r="42" fill="var(--well)" />
      <circle cx={cx} cy="186" r="36" fill="#1a1d23" />
      <circle cx={cx} cy="186" r="22" fill="#9aa3b2" />
      <circle cx={cx} cy="186" r="7" fill="#1a1d23" />
      {[0, 72, 144, 216, 288].map((a) => (
        <line key={a} x1={cx} y1="186" x2={cx} y2="166" stroke="#1a1d23" strokeWidth="3"
          transform={`rotate(${a} ${cx} 186)`} />
      ))}
    </g>
  )
}

export default function CarGraphic({ car, hover, setHover }) {
  const [pinned, setPinned] = useState(null)
  const shape = BODIES[car.bodyType] || BODIES.sedan

  useEffect(() => {
    if (!pinned) return
    const onKey = (e) => e.key === 'Escape' && setPinned(null)
    const onDown = (e) => !e.target.closest?.('.hotspot') && setPinned(null)
    window.addEventListener('keydown', onKey)
    window.addEventListener('pointerdown', onDown)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('pointerdown', onDown)
    }
  }, [pinned])

  return (
    <figure className="car-card">
      <figcaption>
        <strong>{car.name}</strong>
        <span>{car.year}{car.mine ? ' · My car' : ''}</span>
      </figcaption>

      <div className="stage">
        <svg viewBox="0 0 600 260" role="img" aria-label={`Cutaway side view of ${car.name}`}>
          <ellipse cx="305" cy="228" rx="270" ry="8" fill="rgba(0,0,0,.35)" />
          <path d={shape.body} fill={car.color} stroke="#0b0d11" strokeWidth="3" strokeLinejoin="round" />
          <path d={shape.glass} fill="var(--glass)" stroke="#0b0d11" strokeWidth="2" />

          {/* cutaway: engine bay */}
          <g opacity=".85">
            <rect x="492" y="140" width="62" height="42" rx="6" fill="#2b303a" stroke="#0b0d11" strokeWidth="2" />
            {[502, 516, 530, 544].map((x) => <rect key={x} x={x} y="132" width="8" height="12" rx="2" fill="#6b7587" />)}
            {/* transmission + driveshaft */}
            <rect x="335" y="162" width="62" height="26" rx="8" fill="#3a4150" stroke="#0b0d11" strokeWidth="2" />
            <line x1="335" y1="176" x2="120" y2="176" stroke="#3a4150" strokeWidth="4" strokeDasharray="10 5" />
            <line x1="397" y1="176" x2="492" y2="168" stroke="#3a4150" strokeWidth="4" />
            {/* seats + dash + wheel */}
            <path d="M240 160 L240 128 Q240 118 252 118 Q262 118 262 130 L270 160 Z" fill="#232831" />
            <path d="M290 160 L290 128 Q290 118 302 118 Q312 118 312 130 L320 160 Z" fill="#232831" />
            <path d="M352 134 L408 130 L410 142 L352 146 Z" fill="#232831" />
            <line x1="372" y1="136" x2="352" y2="120" stroke="#232831" strokeWidth="4" strokeLinecap="round" />
          </g>

          <Wheel cx="120" />
          <Wheel cx="440" />
        </svg>

        {PARTS.map((part) => (
          <Hotspot
            key={part.id}
            part={part}
            car={car}
            pinned={pinned === part.id}
            onPin={() => setPinned((cur) => (cur === part.id ? null : part.id))}
            hover={hover}
            setHover={setHover}
          />
        ))}
      </div>
    </figure>
  )
}
