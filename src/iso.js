// Isometric helpers. 3D axes: X = car length (0 rear → 440 front),
// Y = width (+ is the near/left-down side), Z = height. Screen = 30° isometric.

const C = Math.cos(Math.PI / 6)
export const VB = { x: -95, y: -190, w: 580, h: 470 }
export const HALF_W = 88

export const project = (X, Y, Z) => [(X - Y) * C, (X + Y) * 0.5 - Z]

// Side profiles as [x, z] points, closed loop (last point connects to first).
export const PROFILES = {
  sedan: [[0, 22], [0, 72], [95, 80], [150, 132], [265, 132], [335, 82], [425, 76], [440, 56], [440, 22]],
  suv: [[0, 22], [0, 104], [25, 142], [290, 142], [345, 96], [425, 88], [440, 60], [440, 22]],
  truck: [[0, 22], [0, 90], [175, 90], [185, 140], [190, 148], [300, 148], [345, 92], [425, 88], [440, 60], [440, 22]],
  coupe: [[0, 22], [0, 70], [80, 78], [150, 112], [250, 118], [320, 80], [425, 72], [440, 50], [440, 22]],
}

// Roof/hood height of a profile at a given X (highest point there).
export function topAt(profile, x) {
  let best = 0
  for (let i = 0; i < profile.length; i++) {
    const [x1, z1] = profile[i]
    const [x2, z2] = profile[(i + 1) % profile.length]
    if (x1 === x2) continue
    const [lo, hi] = x1 < x2 ? [[x1, z1], [x2, z2]] : [[x2, z2], [x1, z1]]
    if (x >= lo[0] && x <= hi[0]) best = Math.max(best, lo[1] + ((x - lo[0]) / (hi[0] - lo[0])) * (hi[1] - lo[1]))
  }
  return best
}

// Where a part's dot goes, as % of the stage box.
export function partPoint(part, bodyType) {
  const [X, Y, rawZ] = part.pos
  const Z = rawZ === 'roof' ? topAt(PROFILES[bodyType] || PROFILES.sedan, X) : rawZ
  const [sx, sy] = project(X, Y, Z)
  return { left: ((sx - VB.x) / VB.w) * 100, top: ((sy - VB.y) / VB.h) * 100 }
}

// Mix a hex color toward white so dark cars still show up on a dark background.
export function lighten(hex, amt) {
  const n = parseInt(hex.slice(1), 16)
  const mix = (c) => Math.round(c + (255 - c) * amt)
  const r = mix((n >> 16) & 255), g = mix((n >> 8) & 255), b = mix(n & 255)
  return `#${[r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('')}`
}
