# RGBify Website — deployment & serving

- Production: GitHub Pages at https://dcerisano.github.io/rgbify/ (source remote is `git@bitbucket.org:standard3d/rgbify-website.git`, branch `main`). Push to Bitbucket, then a GitHub mirror publishes Pages.
- Web Bluetooth requires a secure context: HTTPS or localhost.
- Linux/Chrome: Web Bluetooth is behind flag `chrome://flags/#enable-experimental-web-platform-features`; needs Linux Kernel 3.19+ and BlueZ 5.41+. UI alerts with guidance when unsupported.
- Local dev: `python3 -m http.server` in repo root (localhost counts as secure).
- On Linux/BlueZ pair the device at OS level first (firmware accepts passkey 123456); the firmware's single shared BlueZ link teardown is why the app reconnects forever.