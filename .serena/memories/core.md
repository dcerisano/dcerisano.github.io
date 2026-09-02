# RGBify Website — core

Static web app that is the **Web Bluetooth UI for the RGBify Projector** (ESP32 8x8 WS2812B matrix firmware in the sibling repo `mem:projector_firmware`).

- Purpose: control a projector over BLE from a browser — scrolling text, bridge text, solid color, screensaver toggle, volume, a live mirror of the matrix, and "Ambience" (live screen capture downsampled to 8x8 RGBA and streamed at 30 FPS). (Video/audio/brightness controls were removed from both firmware and website.)
- Deployed via GitHub Pages at https://dcerisano.github.io/rgbify/ (source lives in Bitbucket repo `standard3d/rgbify-website`, branch `main`).
- Entry point: `index.html` → `js/rgbify-projector.js`. Everything else in `js/`, `yui/`, `css/` and `index-org.html` is legacy from the 2018 "RGBify studio" (WebSocket/EditableGrid) and is dead code.
- See `mem:architecture` (BLE client design), `mem:ble_protocol` (GATT map), `mem:tech_stack`, `mem:conventions`, `mem:deployment`.
- `everything-architecture.md` at repo root is STALE/unrelated content (a mobile "Everything CLI" concept doc) — not part of the web app.