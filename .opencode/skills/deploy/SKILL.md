---
name: deploy
description: Use when deploying the RGBify website to GitHub Pages, or whenever the user says "deploy", "push to gh-pages", "update the site", "push to dcerisano.github.io", or asks to publish changes to the live site. Covers running ./deploy.sh and verifying the live site propagates.
---

# Deploy to GitHub Pages

The RGBify website is published at **https://dcerisano.github.io/rgbify/**. It is
**NOT** served from Bitbucket. The live site is the `rgbify/` directory in the
`gh-pages` branch of the `dcerisano/dcerisano.github.io` repo (GitHub account
`dcerisano`), added in this repo as the remote named `github`
(`git@github.com:dcerisano/dcerisano.github.io.git`).

`rgbify/` does not exist as a path in this repo — it exists only in that
gh-pages branch.

## Deploy steps

1. **Make sure `main` is pushed to Bitbucket first**:
   `git push origin main` (`origin` = `git@bitbucket.org:standard3d/rgbify-website.git`).
   This is the source of truth for the site files.

2. **Run the deploy script from the repo root**:
   ```bash
   ./deploy.sh
   ```
   It rebuilds `rgbify/` from the current `main`, force-pushes to
   `github` `gh-pages`, cleans up its temp branch automatically, then **polls
   the live site until the update propagates** and prints a
   `>> LIVE: site is up to date` message. It exits non-zero (with a timeout
   warning) if the change hasn't gone live after ~5 minutes — in that case tell
   the user the push succeeded but to check the site shortly. Do not re-push.

3. **Wait for the script's "LIVE" confirmation** and pass it to the user. Only
   if the script times out should you manually spot-check with curl
   (e.g. `curl -s https://dcerisano.github.io/rgbify/js/rgbify-projector.js`).

## Do NOT

- Do not manually copy files or hand-run `git checkout -B gh-pages...` — use
  `./deploy.sh`.
- Do not push the Bitbucket `main` branch directly to `github/gh-pages`
  (`git push github main:gh-pages`) — that would replace the whole Pages repo
  with this repo's root files and break every other project on the site.
- Do not delete the `github` remote or rename it.

## Reference

- `mem:deployment` — Serena memory with the full deployment notes.
- Site source lives in the repo root: `index.html`, `js/`, `css/`, `img/`, `yui/`,
  `manifest.json`, `favicon.ico`, `everything-architecture.md`.
- `.nojekyll` must exist in `rgbify/` (deploy.sh adds it).
