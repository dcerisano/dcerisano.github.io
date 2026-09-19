# dcerisano.github.io

GitHub **user site** for `dcerisano` — serves independent project sites from subdirectories of
the `gh-pages` branch at **https://dcerisano.github.io/**.

## Layout

- `index.html` — root landing page
- `blitter/` — the **Blitter** web app (control UI). **Generated — do not hand-edit.** Source:
  [blitter-website](https://bitbucket.org/standard3d/blitter-website) (Bitbucket), deployed by that
  repo's `./deploy.sh`, which rebuilds `blitter/` from its `main` and force-pushes this branch.
- `rgbify/` — **removed 2026-09-19** (`git rm -r rgbify`). The old Blitter/RGBify site lived here;
  after the move to `/blitter/` it briefly held a redirect stub, and the old URL now returns 404.
- `standardorbit/`, `karai/`, `lander/`, `3D-VR-Game/`, `3D-VR-Video/`, `distributed-renderer/`,
  `crypt/`, `assets/` — other project pages and shared assets
- `.nojekyll` — disable Jekyll processing
- `privacy.txt`

## Deploying the Blitter app

Do not edit `blitter/` in this repo. In the **blitter-website** repo run:

```bash
./deploy.sh
```

It rebuilds `blitter/` from `main`, strips `.serena/`/`.opencode/`, replaces only the `blitter/`
subtree, and force-pushes `gh-pages` here. All other directories are preserved.

## Caching

GitHub Pages serves documents with `cache-control: max-age=600` (10 minutes), which **overrides**
the page's own `no-cache` meta tags — a normal (even hard) reload can keep serving the previous
document for up to 10 minutes after a deploy. To see changes immediately use a fresh cache key
(e.g. `?nocache=1`), DevTools → Network → *Disable cache*, or a private window.

## Repository

- `https://github.com/dcerisano/dcerisano.github.io.git` (branch `gh-pages`)
- Live: https://dcerisano.github.io/

## Blitter family

- **Firmware**: [blitter](https://bitbucket.org/standard3d/blitter)
- **Web app**: [blitter-website](https://bitbucket.org/standard3d/blitter-website) — live at https://dcerisano.github.io/blitter/
- **Streaming server**: [blitter-server](https://bitbucket.org/dcerisano/blitter-server)
- **Studio**: [blitter-studio](https://bitbucket.org/standard3d/blitter-studio)
- **opencode plugin**: [opencode-blitter-plugin](https://github.com/dcerisano/opencode-blitter-plugin)
