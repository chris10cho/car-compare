// One list drives the graphic, the form, and the table.
// type: 'number' | 'text' | 'bool'
// better: 'high' | 'low' | null  (which direction wins in the table)

export const FEATURES = [
  // ---------- Exterior / mechanical ----------
  { id: 'engine', label: 'Engine', group: 'exterior', type: 'text', placeholder: '3.0L turbo inline-6' },
  { id: 'horsepower', label: 'Horsepower', group: 'exterior', type: 'number', unit: 'hp', better: 'high' },
  { id: 'torque', label: 'Torque', group: 'exterior', type: 'number', unit: 'lb-ft', better: 'high' },
  { id: 'transmission', label: 'Transmission', group: 'exterior', type: 'text', placeholder: '8-speed automatic' },
  { id: 'drivetrain', label: 'Drivetrain', group: 'exterior', type: 'text', placeholder: 'AWD' },
  { id: 'wheelSize', label: 'Wheel size', group: 'exterior', type: 'number', unit: 'in', better: null },
  { id: 'tires', label: 'Tires', group: 'exterior', type: 'text', placeholder: '235/40R19' },
  { id: 'brakes', label: 'Brakes', group: 'exterior', type: 'text', placeholder: 'Vented discs, 4-piston front' },
  { id: 'fuel', label: 'Fuel / battery', group: 'exterior', type: 'text', placeholder: 'Gas 26 mpg  or  82 kWh' },
  { id: 'zeroToSixty', label: '0–60 mph', group: 'exterior', type: 'number', unit: 's', better: 'low' },
  { id: 'weight', label: 'Curb weight', group: 'exterior', type: 'number', unit: 'lb', better: 'low' },

  // ---------- Interior / tech ----------
  { id: 'laneAssist', label: 'Lane assist', group: 'interior', type: 'bool' },
  { id: 'adaptiveCruise', label: 'Adaptive cruise', group: 'interior', type: 'bool' },
  { id: 'blindSpot', label: 'Blind-spot monitor', group: 'interior', type: 'bool' },
  { id: 'parkingAssist', label: 'Parking assist', group: 'interior', type: 'bool' },
  { id: 'sound', label: 'Sound system', group: 'interior', type: 'text', placeholder: 'Dolby Atmos, 17 speakers' },
  { id: 'screen', label: 'Infotainment screen', group: 'interior', type: 'text', placeholder: '12.3-inch touchscreen' },
  { id: 'heatedSeats', label: 'Heated seats', group: 'interior', type: 'bool' },
  { id: 'sunroof', label: 'Sunroof', group: 'interior', type: 'bool' },
  { id: 'wirelessCharging', label: 'Wireless phone charging', group: 'interior', type: 'bool' },
]

// Clickable spots on the car graphic. pos = [X, Y, Z] in the car's 3D space
// (X length 0 rear→440 front, Y width ±88, Z height). 'roof' = sit on the roof surface.
// Each spot can cover several features (the engine spot holds engine + hp + torque).
export const PARTS = [
  // exterior
  { id: 'engine', label: 'Engine', group: 'exterior', pos: [385, 0, 55], featureIds: ['engine', 'horsepower', 'torque'],
    description: 'Makes the power. Horsepower is how fast it can work (top-end speed); torque is the twisting push you feel when you step on the gas.' },
  { id: 'transmission', label: 'Transmission & drive', group: 'exterior', pos: [300, 0, 42], featureIds: ['transmission', 'drivetrain'],
    description: 'The transmission matches engine speed to road speed. The drivetrain says which wheels get the power: front, rear, or all four.' },
  { id: 'wheels', label: 'Wheels & tires', group: 'exterior', pos: [355, 92, 38], featureIds: ['wheelSize', 'tires'],
    description: 'Bigger wheels look sportier but ride firmer. The tire code reads width / sidewall height % / wheel diameter (235/40R19).' },
  { id: 'brakes', label: 'Brakes', group: 'exterior', pos: [85, 92, 38], featureIds: ['brakes'],
    description: 'Stops the car. Vented discs shed heat better; more pistons in the caliper means a firmer, more even clamp.' },
  { id: 'energy', label: 'Fuel / battery', group: 'exterior', pos: [160, 0, 30], featureIds: ['fuel'],
    description: 'What the car runs on and how far it goes: mpg for gas, kWh for the battery in an EV.' },
  { id: 'performance', label: 'Performance & weight', group: 'exterior', pos: [175, 88, 30], featureIds: ['zeroToSixty', 'weight'],
    description: '0–60 mph is the standard launch test (lower is quicker). Curb weight is the car with fluids but no passengers; lighter usually feels nimbler.' },

  // interior
  { id: 'laneAssist', label: 'Lane assist', group: 'interior', pos: [285, 0, 96], featureIds: ['laneAssist'],
    description: 'A camera by the mirror watches lane lines and gently steers you back if you drift without signaling.' },
  { id: 'adaptiveCruise', label: 'Adaptive cruise control', group: 'interior', pos: [440, 0, 40], featureIds: ['adaptiveCruise'],
    description: 'Radar in the nose keeps a set gap to the car ahead, slowing and speeding up for you.' },
  { id: 'blindSpot', label: 'Blind-spot monitor', group: 'interior', pos: [110, 88, 70], featureIds: ['blindSpot'],
    description: 'Rear-corner sensors light a warning in your mirror when a car is where you cannot see it.' },
  { id: 'parkingAssist', label: 'Parking assist', group: 'interior', pos: [0, 0, 45], featureIds: ['parkingAssist'],
    description: 'Bumper sensors beep as you near obstacles. Some cars also steer into the spot for you.' },
  { id: 'sound', label: 'Sound system', group: 'interior', pos: [215, 88, 55], featureIds: ['sound'],
    description: 'Speaker count and brand. Dolby Atmos adds overhead channels so sound moves around the cabin.' },
  { id: 'screen', label: 'Infotainment', group: 'interior', pos: [295, 0, 78], featureIds: ['screen'],
    description: 'The dash screen for maps, music, and phone connection (CarPlay / Android Auto).' },
  { id: 'heatedSeats', label: 'Heated seats', group: 'interior', pos: [205, -36, 62], featureIds: ['heatedSeats'],
    description: 'Warms the seat cushion and back in cold weather.' },
  { id: 'sunroof', label: 'Sunroof', group: 'interior', pos: [215, 0, 'roof'], featureIds: ['sunroof'],
    description: 'An opening or glass panel in the roof for light and air.' },
  { id: 'wirelessCharging', label: 'Wireless charging', group: 'interior', pos: [250, 0, 52], featureIds: ['wirelessCharging'],
    description: 'A pad in the console that charges a compatible phone with no cable.' },
]

export const featureById = Object.fromEntries(FEATURES.map((f) => [f.id, f]))

export const partOfFeature = (featureId) => PARTS.find((p) => p.featureIds.includes(featureId))

export const BODY_TYPES = ['sedan', 'suv', 'truck', 'coupe']

export function formatValue(feature, value) {
  if (feature.type === 'bool') return value ? 'Yes' : 'No'
  if (value === '' || value == null) return '—'
  return feature.unit ? `${Number(value).toLocaleString()} ${feature.unit}` : String(value)
}

export function hasValue(feature, value) {
  if (feature.type === 'bool') return !!value
  return value !== '' && value != null
}
