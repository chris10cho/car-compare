import { FEATURES, formatValue, hasValue, partOfFeature } from '../data/features.js'

// Which car(s) win a numeric row. Returns a Set of car ids.
function winners(feature, cars) {
  if (feature.type !== 'number' || !feature.better) return new Set()
  const nums = cars
    .filter((c) => hasValue(feature, c.values[feature.id]))
    .map((c) => ({ id: c.id, v: Number(c.values[feature.id]) }))
  if (nums.length < 2) return new Set()
  const best = feature.better === 'high' ? Math.max(...nums.map((n) => n.v)) : Math.min(...nums.map((n) => n.v))
  if (nums.every((n) => n.v === best)) return new Set()
  return new Set(nums.filter((n) => n.v === best).map((n) => n.id))
}

export default function CompareTable({ cars, hover, setHover }) {
  const groups = [
    ['exterior', 'Exterior & mechanical'],
    ['interior', 'Interior & tech'],
  ]

  return (
    <div className="table-wrap">
      <table className="compare">
        <thead>
          <tr>
            <th scope="col">Spec</th>
            {cars.map((c) => (
              <th scope="col" key={c.id}>
                <span className="swatch" style={{ background: c.color }} />
                {c.name}
                <small>{c.year}</small>
              </th>
            ))}
          </tr>
        </thead>
        {groups.map(([group, title]) => (
          <tbody key={group}>
            <tr className="group-row"><th colSpan={cars.length + 1}>{title}</th></tr>
            {FEATURES.filter((f) => f.group === group).map((f) => {
              const win = winners(f, cars)
              const part = partOfFeature(f.id)
              const linked = hover.featureId === f.id || (part && hover.partId === part.id)
              return (
                <tr
                  key={f.id}
                  className={linked ? 'linked' : ''}
                  onMouseEnter={() => setHover({ featureId: f.id })}
                  onMouseLeave={() => setHover({})}
                >
                  <th scope="row">{f.label}</th>
                  {cars.map((c) => {
                    const v = c.values[f.id]
                    const cls = [
                      win.has(c.id) ? 'best' : '',
                      f.type === 'bool' ? (v ? 'yes' : 'no') : '',
                    ].join(' ')
                    return (
                      <td key={c.id} className={cls}>
                        {f.type === 'bool' ? (v ? '✓' : '—') : formatValue(f, v)}
                        {f.type === 'bool' && <span className="sr-only">{v ? 'Yes' : 'No'}</span>}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        ))}
      </table>
    </div>
  )
}
