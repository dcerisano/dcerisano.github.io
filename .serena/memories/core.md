# dcerisano.github.io — core

- GitHub Pages **user site** for account `dcerisano`: repo `dcerisano/dcerisano.github.io`, branch **`gh-pages`** (this branch IS the deployed content — no build step here), served at https://dcerisano.github.io/. Remote `origin` = `https://github.com/dcerisano/dcerisano.github.io.git`.
- Subdirectories are independent project sites: `blitter/` (Blitter web app) plus `standardorbit/`, `karai/`, `lander/`, `3D-VR-Game/`, `3D-VR-Video/`, `distributed-renderer/`, `crypt/`, `assets/`; root `index.html`, `privacy.txt`, `.nojekyll`.
- **`blitter/` is generated** by the `standard3d/blitter-website` repo's `./deploy.sh` (rebuilds from that repo's `main`, `git rm -r blitter` + fresh copy, force-pushes `gh-pages`). Never hand-edit `blitter/`; `deploy.sh` preserves every other directory.
- **`rgbify/` was REMOVED 2026-09-19** (`git rm -r rgbify`, commit `6d5bf20`): after the site moved to `/blitter/` (`19487d0`, which left a redirect stub), the old `https://dcerisano.github.io/rgbify/` now returns **404**. The "old /rgbify still visible" report was the Pages `max-age=600` cache, not the server.
- `README.md` was a 2-line "YOLO !!" placeholder; rewritten 2026-09-19 with the hosting/deploy doc.
- 2026-09-19: baseline Serena memories created (`core`, `deployment`).
- Companions (Blitter family): firmware `standard3d/blitter`; website `standard3d/blitter-website`; server `dcerisano/blitter-server`; studio `standard3d/blitter-studio`; plugin `dcerisano/opencode-blitter-plugin`.
