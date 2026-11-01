import { useState } from 'react'
import { useCars } from './store.js'
import CarPicker from './components/CarPicker.jsx'
import CarGraphic from './components/CarGraphic.jsx'
import CompareTable from './components/CompareTable.jsx'
import CarForm from './components/CarForm.jsx'

export default function App() {
  const { allCars, selectedCars, selected, toggleSelected, saveCar, deleteCar } = useCars()
  // hover = { partId } from the graphic, or { featureId } from a table row
  const [hover, setHover] = useState({})
  const [form, setForm] = useState(null) // null | { car?: car }

  const onDelete = (car) => {
    if (window.confirm(`Delete "${car.name}"?`)) deleteCar(car.id)
  }

  return (
    <div className="app">
      <header>
        <h1>Car Compare</h1>
        <p>Hover or tap a dot to see what a part does and each car's spec. Hollow dots mean the car doesn't have it.</p>
      </header>

      <CarPicker
        cars={allCars}
        selected={selected}
        onToggle={toggleSelected}
        onAdd={() => setForm({})}
        onEdit={(car) => setForm({ car })}
        onDelete={onDelete}
      />

      <section className="graphics" style={{ '--cols': selectedCars.length }} aria-label="Car graphics">
        {selectedCars.map((c) => (
          <CarGraphic key={c.id} car={c} hover={hover} setHover={setHover} />
        ))}
      </section>

      <div className="legend">
        <span><i className="dot-sample exterior" /> Exterior / mechanical</span>
        <span><i className="dot-sample interior" /> Interior / tech</span>
        <span><i className="dot-sample hollow" /> Not equipped</span>
      </div>

      <CompareTable cars={selectedCars} hover={hover} setHover={setHover} />

      <footer>Preset specs are approximate sample numbers, not official. Add your own car to compare real ones.</footer>

      {form && (
        <CarForm
          initial={form.car}
          onSave={saveCar}
          onClose={() => setForm(null)}
        />
      )}
    </div>
  )
}
