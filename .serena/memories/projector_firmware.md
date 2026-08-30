# RGBify Projector firmware (companion)

- Repo: `~/git/rgbify-projector` (`git@bitbucket.org:standard3d/rgbify-projector.git`, branch `master`).
- ESP32 Arduino sketch in `rgbify-projector-esp32/`; 8x8 WS2812B matrix on pin 27, piezo buzzer (toneAC fork), FastLED 3.9.0 + LEDMatrix + LEDText.
- arduino-cli, ESP32 core 2.0.17. `NUM_HANDLES` (19) passed to `createService` (default 15 too low for 6 characteristics). NOTE: default partition build is at 101% (pre-existing overflow, compiles fine with `PartitionScheme=huge_app`).
- Power limiting: `FastLED.setMaxPowerInVoltsAndMilliamps(5, MILLI_AMPS)` (1600mA) + `setBrightness(255)` in setup(). Solid color is gamma-corrected like other modes.
- Device Information Service (`0x180A`) exposes firmware version (`FIRMWARE_VERSION` macro in `ble.h`, currently "0.1.4"). No Service Changed characteristic (deliberate: rare GATT changes, manual re-pair is fine).
- Implements the BLE service the web app drives — see `mem:ble_protocol`. Full protocol/build docs in its README.