# RGBify Website — deployment & serving

- Production: GitHub Pages at https://dcerisano.github.io/rgbify/. Deploy by pushing to `main` on Bitbucket (`git@bitbucket.org:standard3d/rgbify-website.git`); verify the GitHub mirror syncs before assuming Pages is updated. To push directly to GitHub Pages, use the `github` remote (`git@github.com:dcerisano/dcerisano.github.io.git`, branch `gh-pages`, files under `rgbify/`).
- Web Bluetooth requires a secure context: HTTPS or localhost.
- Linux/Chrome: Web Bluetooth is behind flag `chrome://flags/#enable-experimental-web-platform-features`; needs Linux Kernel 3.19+ and BlueZ 5.41+. UI alerts with guidance when unsupported.
- Local dev: `python3 -m http.server` in repo root (localhost counts as secure).
- On Linux/BlueZ pair the device at OS level first (firmware accepts passkey 123456); the firmware's single shared BlueZ link teardown is why the app reconnects forever.