# RGBify Website — conventions

- Commit message style: lowercase prefixes like `Web app: ...`, `Volume slider: ...`, `Color picker: ...`, `chore: ...` (feature-line specific).
- JS style in `rgbify-projector.js`: tabs for indentation, `const`/`let` (legacy code uses `var`), no semicolons omitted, small top-level functions.
- Inline `<style>` lives in `index.html` head (no separate app css file for the current UI; `css/ui.css` is legacy).
- Repo `opencode.json` has `plugin` array: `@tarquinen/opencode-dcp@latest` + `file:///home/kronos/git/opencode-rgbify-plugin/dist/index.js`. `command` section registers `dcp` and `rgbify` (template `$ARGUMENTS`, description "RGBify controls: rgbify volume <0-10>, wallpaper, wallpaper close, wallpaper url").
- Serena memories live in `.serena/memories/` and are git-tracked; `project.yml` migrated from the token-reduce template had a wrong `project_name` — should read `rgbify-website`.

## Reconnect strategy (Chrome/Linux)
- Chrome/Linux Web Bluetooth is unreliable for disconnect DETECTION: `gattserverdisconnected` often never fires (Android is fine). Detect drops via a 2s `device.gatt.connected` watchdog instead of trusting the event.
- Never let a GATT op hang the reconnect loop: wrap `gatt.connect()` in a 5s timeout and the whole `setupGatt()` in a 15s timeout (`withTimeout` + `RECONNECT_SETUP_TIMEOUT`). Chromium #40212297: `getPrimaryService()` can hang forever after a drop.
- The mirror is driven by firmware frame notifications; if it "lags then stops" during reconnect, suspect a hung `setupGatt` (now time-bounded) — not the frame broadcast (firmware TX-backoff for it was tried and reverted).