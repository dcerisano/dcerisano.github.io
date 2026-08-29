# RGBify Projector firmware (companion)

- Repo: `~/git/rgbify-projector` (`git@bitbucket.org:standard3d/rgbify-projector.git`, branch `master`).
- ESP32 Arduino sketch in `rgbify-projector-esp32/`; 8x8 WS2812B matrix on pin 27, piezo buzzer (toneAC fork), FastLED 3.9.0 + LEDMatrix + LEDText.
- arduino-cli, ESP32 core 2.0.17. `NUM_HANDLES` (19) passed to `createService` (default 15 too low for 6 characteristics). NOTE: default partition build is at 101% (pre-existing overflow, compiles fine with `PartitionScheme=huge_app`).
- Implements the BLE service the web app drives — see `mem:ble_protocol`. Full protocol/build docs in its README.