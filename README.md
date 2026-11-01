# Car Compare

Compare up to 3 cars side by side. Each car is a see-through isometric 3D view (engine, transmission, wheels, seats and dash visible inside) with dots on the parts and features (engine, transmission, wheels, lane assist, adaptive cruise, sound system, etc.). Hover or tap a dot to see what it is and the car's spec. A comparison table under the graphics lines up every spec, with the best numeric value marked ▲.

## Run it

```bash
npm install
npm run dev
```

Build for hosting: `npm run build` (output in `dist/`).

## Use it

- Pick cars with the chips at the top (max 3).
- **+ Add my car** opens a form. You can start from a preset to save typing. Your cars save in your browser (localStorage) and can be edited or deleted.
- Hover a dot: see the spec. Click it: pin the popover (Esc to close).
- Hover a table row: the matching dot lights up on each car, and the other way around.
- Hollow dashed dots mean the car doesn't have that feature.

## Add a new feature to compare

Add one entry to `FEATURES` in `src/data/features.js`, then include its id in a `PARTS` entry's `featureIds` (that sets where the dot sits and the plain-English description). The form, graphic, and table all pick it up.

## Notes

- Preset specs in `src/data/presets.js` are approximate sample numbers, not official.
- Body outlines (sedan, SUV, truck, coupe) are in `src/iso.js`. Each dot has a 3D position in `src/data/features.js` and is projected onto the car, so it lands on the right part for every body type.
