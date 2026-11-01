import { useEffect, useMemo, useState } from 'react'
import { PARTS } from '../data/features.js'
import { HALF_W, PROFILES, VB, lighten, partPoint, project } from '../iso.js'
import Hotspot from './Hotspot.jsx'

const EXT = '#ff9f43'
const INT = '#35d0ba'
const GREY = '#9aa3b2'
const W = HALF_W
const WHEEL_R = 38

const pt = (x, y, z) => project(x, y, z).map((n) => n.toFixed(1)).join(',')
const poly = (pts) => pts.map((p) => pt(...p)).join(' ')
const ring = (cx, y, cz, r, n = 40) =>
  Array.from({ length: n }, (_, i) => {
    const a = (i / n) * 2 * Math.PI
    return pt(cx + r * Math.cos(a), y, cz + r * Math.sin(a))
  }).join(' ')

// Translucent box: shows top, near side and front face.
function Box({ x0, x1, y0, y1, z0, z1, color, on }) {
  const s = {
    fill: color, fillOpacity: on ? 0.55 : 0.2, stroke: color,
    strokeOpacity: on ? 1 : 0.7, strokeWidth: on ? 2 : 1.2, strokeLinejoin: 'round',
  }
  return (
    <g>
      <polygon points={poly([[x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]])} {...s} />
      <polygon points={poly([[x0, y1, z0], [x1, y1, z0], [x1, y1, z1], [x0, y1, z1]])} {...s} />
      <polygon points={poly([[x1, y0, z0], [x1, y1, z0], [x1, y1, z1], [x1, y0, z1]])} {...s} />
    </g>
  )
}

function Wheel({ cx, side, wheelsOn, brakesOn }) {
  const yIn = side * (W - 24)
  const yOut = side * (W + 4)
  const treads = Array.from({ length: 10 }, (_, i) => {
    const a = (i / 10) * 2 * Math.PI
    const x = cx + WHEEL_R * Math.cos(a), z = WHEEL_R + WHEEL_R * Math.sin(a)
    return <line key={i} x1={pt(x, yIn, z).split(',')[0]} y1={pt(x, yIn, z).split(',')[1]}
      x2={pt(x, yOut, z).split(',')[0]} y2={pt(x, yOut, z).split(',')[1]} stroke="#e8ecf3" strokeOpacity=".18" />
  })
  return (
    <g>
      <polygon points={ring(cx, yIn, WHEEL_R, WHEEL_R)} fill="#e8ecf3" fillOpacity=".05" stroke="#e8ecf3" strokeOpacity=".35" />
      {treads}
      <polygon points={ring(cx, yOut, WHEEL_R, WHEEL_R)} fill="#0b0d11" fillOpacity={wheelsOn ? 0.55 : 0.4}
        stroke={wheelsOn ? EXT : '#e8ecf3'} strokeOpacity={wheelsOn ? 1 : 0.7} strokeWidth={wheelsOn ? 2.4 : 1.4} />
      <polygon points={ring(cx, yOut, WHEEL_R, 24)} fill={GREY} fillOpacity=".18" stroke={GREY} strokeOpacity=".7" />
      <polygon points={ring(cx, yOut - side * 6, WHEEL_R, 16)} fill="none" stroke={EXT}
        strokeOpacity={brakesOn ? 1 : 0.5} strokeWidth={brakesOn ? 3 : 1.4} />
      {[0, 72, 144, 216, 288].map((deg) => {
        const a = (deg * Math.PI) / 180
        return <polyline key={deg} stroke={GREY} strokeOpacity=".6" fill="none"
          points={`${pt(cx, yOut, WHEEL_R)} ${pt(cx + 24 * Math.cos(a), yOut, WHEEL_R + 24 * Math.sin(a))}`} />
      })}
    </g>
  )
}

function Ground() {
  const lines = []
  for (let v = -40; v <= 480; v += 40) {
    lines.push(<line key={`x${v}`} x1={pt(v, -140, 0).split(',')[0]} y1={pt(v, -140, 0).split(',')[1]}
      x2={pt(v, 140, 0).split(',')[0]} y2={pt(v, 140, 0).split(',')[1]} />)
  }
  for (let v = -140; v <= 140; v += 40) {
    lines.push(<line key={`y${v}`} x1={pt(-40, v, 0).split(',')[0]} y1={pt(-40, v, 0).split(',')[1]}
      x2={pt(480, v, 0).split(',')[0]} y2={pt(480, v, 0).split(',')[1]} />)
  }
  return <g stroke="#ffffff" strokeOpacity=".07">{lines}</g>
}

export default function CarGraphic({ car, hover, setHover }) {
  const [pinned, setPinned] = useState(null)
  const prof = PROFILES[car.bodyType] || PROFILES.sedan

  // part ids that are lit up (hovered dot, or a hovered table row's part)
  const active = useMemo(
    () => new Set(PARTS.filter((p) => hover.partId === p.id || p.featureIds.includes(hover.featureId)).map((p) => p.id)),
    [hover],
  )
  const on = (id) => active.has(id)

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

  const edge = lighten(car.color, 0.45)
  const skin = { fill: lighten(car.color, 0.25), fillOpacity: 0.13, stroke: edge, strokeWidth: 1.6, strokeLinejoin: 'round' }

  return (
    <figure className="car-card">
      <figcaption>
        <strong>{car.name}</strong>
        <span>{car.year}{car.mine ? ' · My car' : ''}</span>
      </figcaption>

      <div className="stage">
        <svg viewBox={`${VB.x} ${VB.y} ${VB.w} ${VB.h}`} role="img" aria-label={`Transparent isometric view of ${car.name}`}>
          <Ground />

          {/* inner mechanicals, drawn first so they sit "inside" the glass body */}
          <Box x0={110} x1={260} y0={-60} y1={60} z0={24} z1={34} color={EXT} on={on('energy')} />
          <Box x0={90} x1={270} y0={-6} y1={6} z0={32} z1={40} color={GREY} on={on('transmission')} />
          <Box x0={70} x1={100} y0={-22} y1={22} z0={30} z1={46} color={GREY} on={on('transmission')} />
          <Box x0={270} x1={345} y0={-22} y1={22} z0={28} z1={58} color={EXT} on={on('transmission')} />
          <Box x0={350} x1={425} y0={-45} y1={45} z0={30} z1={80} color={EXT} on={on('engine')} />

          {/* cabin */}
          <Box x0={190} x1={225} y0={-58} y1={-14} z0={36} z1={48} color={INT} on={on('heatedSeats')} />
          <Box x0={186} x1={194} y0={-58} y1={-14} z0={48} z1={86} color={INT} on={on('heatedSeats')} />
          <Box x0={190} x1={225} y0={14} y1={58} z0={36} z1={48} color={INT} on={on('heatedSeats')} />
          <Box x0={186} x1={194} y0={14} y1={58} z0={48} z1={86} color={INT} on={on('heatedSeats')} />
          <Box x0={110} x1={145} y0={-58} y1={58} z0={36} z1={46} color={INT} on={false} />
          <Box x0={106} x1={113} y0={-58} y1={58} z0={46} z1={82} color={INT} on={false} />
          <Box x0={235} x1={265} y0={-10} y1={10} z0={36} z1={52} color={INT} on={on('wirelessCharging')} />
          <Box x0={285} x1={305} y0={-70} y1={70} z0={62} z1={80} color={INT} on={on('screen')} />

          {/* body skin: two side panels + connecting bands (glass where the roof/windows are) */}
          {[-W, W].map((y) => (
            <polygon key={y} points={poly(prof.map(([x, z]) => [x, y, z]))} {...skin} />
          ))}
          {prof.map((a, i) => {
            const b = prof[(i + 1) % prof.length]
            const glass = (a[1] + b[1]) / 2 >= 95 && a[0] !== b[0] || ((a[1] + b[1]) / 2 >= 100)
            return (
              <polygon key={i} points={poly([[a[0], -W, a[1]], [b[0], -W, b[1]], [b[0], W, b[1]], [a[0], W, a[1]]])}
                {...skin} fill={glass ? '#9fc4e6' : skin.fill} fillOpacity={glass ? 0.2 : 0.1} />
            )
          })}
          {/* door cuts on both sides */}
          {[-W, W].map((y) => (
            <polyline key={`d${y}`} fill="none" stroke={edge} strokeOpacity=".55"
              points={poly([[150, y, 30], [150, y, 78], [300, y, 78], [300, y, 30], [225, y, 30], [225, y, 78]])} />
          ))}

          {/* wheels sit on top: far side first, then near side */}
          <Wheel cx={85} side={-1} wheelsOn={on('wheels')} brakesOn={on('brakes')} />
          <Wheel cx={355} side={-1} wheelsOn={on('wheels')} brakesOn={on('brakes')} />
          <Wheel cx={85} side={1} wheelsOn={on('wheels')} brakesOn={on('brakes')} />
          <Wheel cx={355} side={1} wheelsOn={on('wheels')} brakesOn={on('brakes')} />
        </svg>

        {PARTS.map((part) => (
          <Hotspot
            key={part.id}
            part={part}
            place={partPoint(part, car.bodyType)}
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
