import { useEffect, useRef, useState } from 'react'
import { BODY_TYPES, FEATURES } from '../data/features.js'
import { PRESETS } from '../data/presets.js'

const blank = () => ({
  id: `my-${Date.now()}`, name: '', year: new Date().getFullYear(), bodyType: 'sedan',
  color: '#4f8cff', mine: true, values: {},
})

export default function CarForm({ initial, onSave, onClose }) {
  const [car, setCar] = useState(() => (initial ? structuredClone(initial) : blank()))
  const [error, setError] = useState('')
  const nameRef = useRef(null)

  useEffect(() => {
    nameRef.current?.focus()
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const setField = (k, v) => setCar((c) => ({ ...c, [k]: v }))
  const setValue = (k, v) => setCar((c) => ({ ...c, values: { ...c.values, [k]: v } }))

  const copyPreset = (id) => {
    const p = PRESETS.find((x) => x.id === id)
    if (!p) return
    setCar((c) => ({ ...c, bodyType: p.bodyType, color: p.color, values: { ...p.values } }))
  }

  const submit = (e) => {
    e.preventDefault()
    if (!car.name.trim()) return setError('Give your car a name.')
    // store numbers as numbers, blanks as empty
    const values = { ...car.values }
    FEATURES.filter((f) => f.type === 'number').forEach((f) => {
      const v = values[f.id]
      values[f.id] = v === '' || v == null || Number.isNaN(Number(v)) ? '' : Number(v)
    })
    onSave({ ...car, name: car.name.trim(), year: Number(car.year) || '', values })
    onClose()
  }

  const renderField = (f) => {
    const v = car.values[f.id]
    if (f.type === 'bool')
      return (
        <label key={f.id} className="check">
          <input type="checkbox" checked={!!v} onChange={(e) => setValue(f.id, e.target.checked)} />
          {f.label}
        </label>
      )
    return (
      <label key={f.id}>
        {f.label}{f.unit ? ` (${f.unit})` : ''}
        <input
          type={f.type === 'number' ? 'number' : 'text'}
          step="any"
          value={v ?? ''}
          placeholder={f.placeholder || ''}
          onChange={(e) => setValue(f.id, e.target.value)}
        />
      </label>
    )
  }

  return (
    <div className="overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <form className="modal" onSubmit={submit} aria-label={initial ? 'Edit car' : 'Add your car'}>
        <h2>{initial ? 'Edit car' : 'Add your car'}</h2>

        <div className="grid">
          <label className="wide">
            Name
            <input ref={nameRef} value={car.name} onChange={(e) => setField('name', e.target.value)}
              placeholder="e.g. 2019 Subaru WRX" />
          </label>
          <label>
            Year
            <input type="number" value={car.year} onChange={(e) => setField('year', e.target.value)} />
          </label>
          <label>
            Body type
            <select value={car.bodyType} onChange={(e) => setField('bodyType', e.target.value)}>
              {BODY_TYPES.map((b) => <option key={b}>{b}</option>)}
            </select>
          </label>
          <label>
            Color
            <input type="color" value={car.color} onChange={(e) => setField('color', e.target.value)} />
          </label>
          <label className="check">
            <input type="checkbox" checked={car.mine} onChange={(e) => setField('mine', e.target.checked)} />
            This is my car
          </label>
          {!initial && (
            <label className="wide">
              Start from a preset (optional)
              <select defaultValue="" onChange={(e) => copyPreset(e.target.value)}>
                <option value="">— blank —</option>
                {PRESETS.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            </label>
          )}
        </div>

        <h3>Exterior &amp; mechanical</h3>
        <div className="grid">{FEATURES.filter((f) => f.group === 'exterior').map(renderField)}</div>
        <h3>Interior &amp; tech</h3>
        <div className="grid">{FEATURES.filter((f) => f.group === 'interior').map(renderField)}</div>

        {error && <p className="error" role="alert">{error}</p>}
        <div className="actions">
          <button type="button" onClick={onClose}>Cancel</button>
          <button type="submit" className="primary">Save car</button>
        </div>
      </form>
    </div>
  )
}
