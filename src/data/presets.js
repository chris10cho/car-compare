// Approximate sample specs for demo purposes. Not official numbers.
export const PRESETS = [
  {
    id: 'preset-camry', name: 'Toyota Camry SE Hybrid', year: 2024, bodyType: 'sedan', color: '#c8ccd2', preset: true,
    values: {
      engine: '2.5L 4-cyl hybrid', horsepower: 225, torque: 163, transmission: 'eCVT', drivetrain: 'FWD',
      wheelSize: 18, tires: '235/45R18', brakes: 'Vented front discs', fuel: 'Hybrid, ~51 mpg',
      zeroToSixty: 7.2, weight: 3500,
      laneAssist: true, adaptiveCruise: true, blindSpot: true, parkingAssist: true,
      sound: '7-speaker', screen: '9-inch touchscreen', heatedSeats: false, sunroof: false, wirelessCharging: true,
    },
  },
  {
    id: 'preset-model3', name: 'Tesla Model 3 Long Range', year: 2024, bodyType: 'sedan', color: '#c0392b', preset: true,
    values: {
      engine: 'Dual-motor electric', horsepower: 498, torque: 389, transmission: 'Single-speed', drivetrain: 'AWD',
      wheelSize: 18, tires: '235/45R18', brakes: 'Discs, regen assist', fuel: '~82 kWh battery, ~340 mi',
      zeroToSixty: 4.2, weight: 4034,
      laneAssist: true, adaptiveCruise: true, blindSpot: true, parkingAssist: true,
      sound: '9-speaker', screen: '15.4-inch touchscreen', heatedSeats: true, sunroof: true, wirelessCharging: true,
    },
  },
  {
    id: 'preset-f150', name: 'Ford F-150 XLT 3.5L EcoBoost', year: 2024, bodyType: 'truck', color: '#2e5aa8', preset: true,
    values: {
      engine: '3.5L twin-turbo V6', horsepower: 400, torque: 500, transmission: '10-speed automatic', drivetrain: '4WD',
      wheelSize: 18, tires: '275/65R18', brakes: 'Vented discs', fuel: 'Gas, ~20 mpg',
      zeroToSixty: 5.3, weight: 4900,
      laneAssist: true, adaptiveCruise: true, blindSpot: true, parkingAssist: true,
      sound: '6-speaker', screen: '12-inch touchscreen', heatedSeats: true, sunroof: false, wirelessCharging: true,
    },
  },
  {
    id: 'preset-m340i', name: 'BMW M340i xDrive', year: 2024, bodyType: 'sedan', color: '#1f2a44', preset: true,
    values: {
      engine: '3.0L turbo inline-6', horsepower: 382, torque: 369, transmission: '8-speed automatic', drivetrain: 'AWD',
      wheelSize: 19, tires: '225/40R19', brakes: 'M Sport vented discs', fuel: 'Gas, ~26 mpg',
      zeroToSixty: 4.1, weight: 3900,
      laneAssist: true, adaptiveCruise: true, blindSpot: true, parkingAssist: true,
      sound: 'Harman Kardon, 16-speaker', screen: '14.9-inch curved display', heatedSeats: true, sunroof: true, wirelessCharging: true,
    },
  },
  {
    id: 'preset-ioniq5', name: 'Hyundai Ioniq 5 AWD', year: 2024, bodyType: 'suv', color: '#8a9a8e', preset: true,
    values: {
      engine: 'Dual-motor electric', horsepower: 320, torque: 446, transmission: 'Single-speed', drivetrain: 'AWD',
      wheelSize: 20, tires: '255/45R20', brakes: 'Discs, regen assist', fuel: '~77 kWh battery, ~260 mi',
      zeroToSixty: 4.5, weight: 4600,
      laneAssist: true, adaptiveCruise: true, blindSpot: true, parkingAssist: true,
      sound: 'Bose, 8-speaker', screen: '12.3-inch touchscreen', heatedSeats: true, sunroof: true, wirelessCharging: true,
    },
  },
  {
    id: 'preset-mustang', name: 'Ford Mustang GT', year: 2024, bodyType: 'coupe', color: '#e6b422', preset: true,
    values: {
      engine: '5.0L V8', horsepower: 480, torque: 415, transmission: '6-speed manual', drivetrain: 'RWD',
      wheelSize: 18, tires: '255/40R18', brakes: 'Vented discs, Brembo option', fuel: 'Gas, ~19 mpg',
      zeroToSixty: 4.3, weight: 3800,
      laneAssist: true, adaptiveCruise: false, blindSpot: true, parkingAssist: false,
      sound: '8-speaker', screen: '13.2-inch touchscreen', heatedSeats: false, sunroof: false, wirelessCharging: true,
    },
  },
]

// The owner's car. Seeded into the editable list on first visit, so it can be changed or deleted.
// Confirmed from public listings: engine, hp, torque, transmission, drivetrain, wheels, tires, weight, mpg.
// Estimated / unconfirmed (check against the window sticker and edit): 0-60, sound, brakes, screen, and the
// blind-spot / parking / heated seat / wireless charging flags.
export const MY_CAR = {
  id: 'my-trax', name: '2026 Chevy Trax 2RS', year: 2026, bodyType: 'suv', color: '#d9342b', mine: true,
  values: {
    engine: '1.2L turbo 3-cyl', horsepower: 137, torque: 162, transmission: '6-speed automatic', drivetrain: 'FWD',
    wheelSize: 19, tires: '245/45R19', brakes: '', fuel: 'Gas, ~30 mpg combined, 13.2 gal tank',
    zeroToSixty: 9, weight: 3040,
    laneAssist: true, adaptiveCruise: true, blindSpot: true, parkingAssist: true,
    sound: '', screen: '11-inch touchscreen', heatedSeats: true, sunroof: true, wirelessCharging: true,
  },
}
