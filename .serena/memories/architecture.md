# RGBify Website — architecture (BLE client)

All logic in `js/rgbify-projector.js` (~700 lines, vanilla JS). No framework. Web Bluetooth + getDisplayMedia.

## settings registry
- Central `settings` object maps key → { uuid, properties, structure, data, writeBusy, writePending, dataUpdated }.
- `structure` is a list of types ("Uint8", "Uint8"/"Uint8"/"Uint8" for solidColor) consumed by `handleIncoming()` to unpack GATT bytes via DataView into `setting.data` columns, then calls `dataUpdated(setting)`.
- Settings: `screensaver`, `volume`, `solidColor`, `projector`, `text` (video/audio/brightness characteristics were removed from firmware and website).
- `setupGatt()` loops `settingKeys`, fetches each characteristic, `readValue()` (3 retries @ 200ms) and `startNotifications()` (same retry) — back-to-back GATT ops transiently fail on Android.
- `handleIncoming()` is the notification handler → keeps every connected client page in sync.

## write coalescing
- `BLEwriteTo(key)`: if `writeBusy`, set `writePending` and return; otherwise loop writing `setting.writeValue` while pending. Prevents slider/picker drags from leaving stale device state / multi-client jitter.
- Color picker echo guard: `settings.solidColor.suppressWrite` — a remote-updated color (notification) is applied without echoing a write back, else firmware re-broadcasts → infinite ping-pong jitter.

## connect / reconnect
- `connect()`: `requestDevice({ filters: [{ services: [SERVICE_UUID] }] })`; registers `gattserverdisconnected` → `onDisconnected` exactly once (`device._hasDisconnectListener`). On error `location.reload()`.
- `setupGatt()` is shared by connect and reconnect and re-fetches server/service/characteristics each call (stale after drop).
- `onDisconnected()`: reconnect forever, backoff 500ms→5s (capped); never reloads so a running ambience track survives drops.

## ambience
- `connectAmbience()`: `getDisplayMedia` (desktop `{displaySurface:"monitor"}`, Android `{video:true}`), ImageCapture, `setInterval(streamer, FPS=30)`.
- `streamer()`: crop center square, blur(5px)+contrast(120%) on offscreen canvas, downsample to 8x8, send 256-byte RGBA frame via `updateProjector`.
- Ambience section is hidden when `getDisplayMedia` is unsupported. On `document.hidden` the track stops (`onAmbienceDisconnected`).

## UI wiring (index.html)
- Buttons/sliders directly flip `settings.*.writeValue` then `BLEwriteTo`. `setConnectedUI()`/`setDisconnectedUI()` gate enabled state. iro ColorPicker (150px) mirrors hidden `#solidColorInput`. Message input capped at 256 chars (maxlength + `updateText` slice).