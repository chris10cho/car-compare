import { useCallback, useEffect, useMemo, useState } from 'react'
import { MY_CAR, PRESETS } from './data/presets.js'

const CARS_KEY = 'carcompare.cars.v1'
const SEL_KEY = 'carcompare.selected.v1'
export const MAX_COMPARE = 3

function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function save(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* storage blocked: app still works for this session */
  }
}

export function useCars() {
  const [custom, setCustom] = useState(() => load(CARS_KEY, [MY_CAR]))
  const [selected, setSelected] = useState(() => load(SEL_KEY, [MY_CAR.id, 'preset-ioniq5']))

  useEffect(() => save(CARS_KEY, custom), [custom])
  useEffect(() => save(SEL_KEY, selected), [selected])

  const allCars = useMemo(() => [...custom, ...PRESETS], [custom])
  const selectedCars = useMemo(
    () => selected.map((id) => allCars.find((c) => c.id === id)).filter(Boolean),
    [selected, allCars],
  )

  const toggleSelected = useCallback((id) => {
    setSelected((cur) => {
      if (cur.includes(id)) return cur.length > 1 ? cur.filter((x) => x !== id) : cur
      return cur.length >= MAX_COMPARE ? cur : [...cur, id]
    })
  }, [])

  const saveCar = useCallback((car) => {
    setCustom((cur) => {
      const cleared = car.mine ? cur.map((c) => ({ ...c, mine: false })) : cur
      return cleared.some((c) => c.id === car.id)
        ? cleared.map((c) => (c.id === car.id ? car : c))
        : [car, ...cleared]
    })
    setSelected((cur) => {
      if (cur.includes(car.id)) return cur
      // my car goes first; otherwise drop the oldest pick if we're full
      const next = car.mine ? [car.id, ...cur] : [...cur, car.id]
      return next.slice(0, MAX_COMPARE)
    })
  }, [])

  const deleteCar = useCallback((id) => {
    setCustom((cur) => cur.filter((c) => c.id !== id))
    setSelected((cur) => {
      const next = cur.filter((x) => x !== id)
      return next.length ? next : ['preset-camry']
    })
  }, [])

  return { allCars, selectedCars, selected, toggleSelected, saveCar, deleteCar }
}
