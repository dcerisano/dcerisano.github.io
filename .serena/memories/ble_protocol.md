# RGBify Website — BLE GATT protocol

Firmware: `rgbify-projector-esp32` in sibling repo (`mem:projector_firmware`). Full protocol table in that repo's README.

- Service UUID: `8bc01404-0000-4bf4-95d1-ce27a0477183`
- Characteristics (all `8bc01404-000X-4bf4-95d1-ce27a0477183`):
  - `0004` Volume — Uint8 0–10 (UI slider 0–10)
  - `0005` Color — 3×Uint8 R,G,B
  - `0006` Projector — 256×Uint8 (8x8 RGB frame, ambience)
  - `0007` Text — Uint8[] LEDText format (capped 256 chars)
  - `0008` Screensaver — Uint8 on/off
  - `0009` Text Bridge — write-no-response, raw chars (not used by this web app)
- Pairing: passkey `123456`.
- JS constants: `SERVICE_UUID` + `*_UUID` at top of `js/rgbify-projector.js`.