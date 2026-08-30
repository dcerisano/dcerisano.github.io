# RGBify Website — deployment & serving

- Production: GitHub Pages at https://dcerisano.github.io/rgbify/. The site is served from the `rgbify/` directory in the `gh-pages` branch of the `dcerisano/dcerisano.github.io` repo (GitHub account `dcerisano`, remote name `github`, URL `git@github.com:dcerisano/dcerisano.github.io.git`). `rgbify/` is NOT a path in this repo — it only exists in that gh-pages branch.
- Deploy to Pages by running `./deploy.sh` (rebuilds `rgbify/` from current `main` and force-pushes to gh-pages). Then poll https://dcerisano.github.io/rgbify/ — GitHub Pages has a short propagation delay. Bitbucket `origin` is the source repo and does NOT host the live site; always run `deploy.sh` after pushing to `origin/main`.
- Web Bluetooth requires a secure context: HTTPS or localhost.
- Linux/Chrome: Web Bluetooth is behind flag `chrome://flags/#enable-experimental-web-platform-features`; needs Linux Kernel 3.19+ and BlueZ 5.41+. UI alerts with guidance when unsupported.
- Local dev: `python3 -m http.server` in repo root (localhost counts as secure).
- On Linux/BlueZ pair the device at OS level first (firmware accepts passkey 123456); the firmware's single shared BlueZ link teardown is why the app reconnects forever.