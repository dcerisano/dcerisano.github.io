# RGBify Website — architecture (BLE client)

All logic in `js/rgbify-projector.js` (~615 lines, vanilla JS). No framework. Web Bluetooth + getDisplayMedia.

## settings registry
- Central `settings` object maps key → { uuid, properties, structure, data, writeBusy, writePending, dataUpdated }.
- `structure` is a list of types ("Uint8", "Uint8"/"Uint8"/"Uint8" for solidColor) consumed by `handleIncoming()` to unpack GATT bytes via DataView into `setting.data` columns, then calls `dataUpdated(setting, dataReceived)` — the raw DataView is passed through (the `projector` handler needs all 256 bytes).
- `projector`'s `dataUpdated` renders the live mirror via `renderProjectorFrame(dataReceived)` (256-byte guard, rendered upright — buffer row y → canvas row y — `putImageData` into the 8x8 mirror canvas).
- Settings: `screensaver`, `volume`, `solidColor`, `projector`, `text` (video/audio/brightness characteristics were removed from firmware and website).
- `setupGatt()` loops `settingKeys`, fetches each characteristic, `readValue()` (3 retries @ 200ms) and `startNotifications()` (same retry) — back-to-back GATT ops transiently fail on Android.
- `handleIncoming()` is the notification handler → keeps every connected client page in sync.

## write coalescing
- `BLEwriteTo(key)`: if `writeBusy`, set `writePending` and return; otherwise loop writing `setting.writeValue` while pending. Prevents slider/picker drags from leaving stale device state / multi-client jitter.
- Color picker echo guard: `settings.solidColor.suppressWrite` — a remote-updated color (notification) is applied without echoing a write back, else firmware re-broadcasts → infinite ping-pong jitter.

## connect / reconnect (Chrome/Linux disconnect strategy)
- `connect()`: `requestDevice({ filters: [{ services: [SERVICE_UUID] }] })`; registers `gattserverdisconnected` → `onDisconnected` exactly once (`device._hasDisconnectListener`).
- **Chrome/Linux does NOT reliably fire `gattserverdisconnected`** (Android does). Fix: a 2s watchdog (`device._bleWd`, installed once in `connect()`) polls `device.gatt.connected` and calls `onDisconnected()` when it flips false and `!reconnecting`. Never rely on the event alone on Linux. (The plugin bridge's `_reapply_bluez` AutoConnect attempt to fix this was REMOVED — AutoConnect affects re-linking, not disconnect notification.)
- `withTimeout(promise, ms)` races a promise vs a timer so a hanging GATT op can't stall the reconnect loop:
  - `device.gatt.connect()` → 5000ms.
  - The whole `setupGatt(device)` in the reconnect loop → `RECONNECT_SETUP_TIMEOUT = 15000`. Chromium #40212297: `getPrimaryService()` (and later ops) can HANG forever after a drop — only timing out `connect()` left the reconnect stuck and froze the mirror.
- `setupGatt()` is shared by connect and reconnect and re-fetches server/service/characteristics each call (stale after drop). Before setting up GATT, it reads the firmware version from the Device Information Service (DIS, `0x180A` / `0x2A26`) and verifies it matches `"0.1.5"` (trimmed, `EXPECTED_FW_VERSION`). On mismatch, an alert tells the user to forget/re-pair the device and the connection is cancelled (no reload, no reconnect retry). If DIS is unavailable, the check is skipped and the connection proceeds.
- `onDisconnected()`: reconnect forever, backoff 500ms→5s (capped); never reloads so a running ambience track survives drops. Each retry = `withTimeout(setupGatt(device), 15000)`. Firmware mismatch stops the reconnect loop.

## mirror canvas (permanent)
- The 8x8 `#screencanvas` + `img/dots.png` overlay is ALWAYS visible, scaled to the full control-form width (canvas `width:100%; height:auto`, square) and centered above the form as the first element (not controlled by the Ambience button). It renders the projector's actual display from firmware notifications (see `mem:ble_protocol`) via `renderProjectorFrame()`; black until a device connects (initial `readValue()` also renders). On disconnect the page reconnects in place — the canvas simply stops updating until mirror notifications resume after the re-subscribe.
- The visible canvas is written ONLY by notifications (`renderProjectorFrame`) — ambience downsample uses an offscreen 8x8 `frameCanvas` (`frameCtx`, `willReadFrequently`) so the mirror is a single source of truth (no flicker between local draw and echo).

## ambience (screen capture, decoupled from the canvas)
- `connectAmbience()`: `getDisplayMedia` (desktop `{displaySurface:"monitor"}`, Android `{video:true}`), ImageCapture, `setInterval(streamer, FPS=30)`. The button no longer toggles canvas visibility.
- `streamer()`: crop center square, blur(5px)+contrast(120%) on offscreen canvas, downsample to 8x8 into `frameCtx`, send 256-byte RGBA frame via `updateProjector`. The firmware echoes it back as a mirror notification.
- Ambience control is hidden when `getDisplayMedia` is unsupported (mirror canvas stays). On `document.hidden` the track stops (`onAmbienceDisconnected`).

## UI wiring (index.html)
- Buttons/sliders directly flip `settings.*.writeValue` then `BLEwriteTo`. `setConnectedUI()`/`setDisconnectedUI()` gate enabled state. iro ColorPicker (150px) mirrors hidden `#solidColorInput`. Message input capped at 256 chars (maxlength + `updateText` slice).
- The live mirror display (canvas + overlay) is the first element in `<form>`, before the Bluetooth row.