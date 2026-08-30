# RGBify Website

Web Bluetooth control UI for the **RGBify Projector** — an 8x8 WS2812B LED matrix driven by ESP32 firmware. Control it from any browser: scroll text messages, pick a solid color, toggle screensaver, adjust volume, or turn your screen into live ambient lighting.

Companion firmware: [rgbify-projector](https://bitbucket.org/standard3d/rgbify-projector) (ESP32 Arduino sketch, Web Bluetooth GATT server).

## Live

https://dcerisano.github.io/rgbify/

## Features

- **Connect** to the projector over Web Bluetooth (BLE)
- **Message** — scrolling text (capped at 256 chars, Atari font on-device)
- **Ambience** — captures your screen, downsamples it to 8x8, and streams frames over BLE at 30 FPS for ambient lighting
- **Solid color** — full iro color picker
- **Screensaver** — on/off toggle
- **Volume** slider
- Automatic reconnect — survives BLE drops (with exponential backoff) without reloading the page, so a running ambience stream persists
- Multi-client sync — changes made on one page update every connected page via GATT notifications

## Requirements

- A browser with **Web Bluetooth** and secure context (**HTTPS** or **localhost**).
  - Chrome is recommended. On Linux enable the experimental flag: `chrome://flags/#enable-experimental-web-platform-features` (needs Linux Kernel 3.19+ and BlueZ 5.41+).
- The projector powered on and advertising (pairing passkey `123456`).

## Usage

1. Open the page, click **Connect**, and pick the projector from the chooser.
2. Use the sliders, toggles, color picker, or type a message and press Enter.
3. **Start Capture** under *Ambience* to stream your screen to the matrix (screen-pick the window/tab you want mirrored).

## BLE Protocol

Service UUID: `8bc01404-0000-4bf4-95d1-ce27a0477183`

| Name        | UUID                                   | Properties | Data                          |
| ----------- | -------------------------------------- | ---------- | ----------------------------- |
| Volume      | `…0004-4bf4-95d1-ce27a0477183`         | Read/Write | `Uint8` 0–10                  |
| Color       | `…0005-4bf4-95d1-ce27a0477183`         | Read/Write | 3 × `Uint8` (R, G, B)         |
| Projector   | `…0006-4bf4-95d1-ce27a0477183`         | Read/Write | 256 × `Uint8` (8x8 RGB frame) |
| Text        | `…0007-4bf4-95d1-ce27a0477183`         | Read/Write | `Uint8[]` LEDText format      |
| Screensaver | `…0008-4bf4-95d1-ce27a0477183`         | Read/Write | `Uint8` on/off                |

(The full UUID is `8bc01404-000X-4bf4-95d1-ce27a0477183`, where `000X` is the characteristic suffix above.)

## Development

Static site — no build step. Serve the folder over localhost:

```bash
python3 -m http.server
# open http://localhost:8000
```

- `index.html` — UI (Bootstrap 4.6.1, jQuery, [iro color picker](https://github.com/jaames/iro.js) via CDN)
- `js/rgbify-projector.js` — the BLE client (settings registry, write coalescing, reconnect loop, ambience pipeline)
- `manifest.json` — PWA manifest (standalone, landscape)

`index-org.html`, `js/data.js`, `js/grid/`, `js/util/`, `yui/`, `css/` and most of `img/` are legacy assets from the original 2018 "RGBify studio" app and are unused by the current page.

## Repository

- Remote: `git@bitbucket.org:standard3d/rgbify-website.git` (branch `main`)
- Live site published from a GitHub mirror via Pages
