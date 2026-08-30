# RGBify Website — tech stack

- Static HTML/CSS/JS site. No build step, no package.json. Just serve the folder.
- CDN: Bootstrap 4.6.1 (css+js bundle), jQuery 3.5.1 slim, @jaames/iro color picker (iro.min.js). Local: `js/rgbify-projector.js` only.
- Web APIs: Web Bluetooth (`navigator.bluetooth`), getDisplayMedia + ImageCapture (ambience).
- PWA: `manifest.json` ("RGB LED Matrix", standalone, landscape). No service worker.
- Legacy/unused deps bundled: twgl, jquery 3.3.1, EditableGrid (`js/grid/*`), YUI (`yui/js/rgb-min.js`), `js/data.js`, `css/*`, `img/*` — only used by obsolete `index-org.html` studio app.