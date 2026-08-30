#!/bin/bash
# Deploy this repo's site files to GitHub Pages (dcerisano.github.io/rgbify).
#
# The site is served from the `rgbify/` directory in the `gh-pages` branch of
# the `dcerisano/dcerisano.github.io` repo (remote: `github`).
# This script rebuilds `rgbify/` from the current `main` branch and force-pushes
# it to that branch. GitHub Pages takes a short while to propagate the update.

set -euo pipefail

GITHUB_REMOTE="${GITHUB_REMOTE:-github}"
BRANCH=gh-pages-deploy

# Files/dirs that belong in the rgbify/ subfolder.
SITE_PATHS=(css everything-architecture.md favicon.ico img index.html js manifest.json yui)

# Make sure the github remote exists.
if ! git remote get-url "$GITHUB_REMOTE" >/dev/null 2>&1; then
	echo "error: no remote named '$GITHUB_REMOTE'. Add it with:" >&2
	echo "  git remote add $GITHUB_REMOTE https://github.com/dcerisano/dcerisano.github.io.git" >&2
	exit 1
fi

echo ">> Fetching gh-pages from $GITHUB_REMOTE..."
git fetch "$GITHUB_REMOTE" gh-pages --depth=1

echo ">> Building rgbify/ content from main..."
BUILD_DIR="$(mktemp -d)"
trap 'rm -rf "$BUILD_DIR"; git checkout main 2>/dev/null; git branch -D "$BRANCH" 2>/dev/null' EXIT
git archive main | tar -C "$BUILD_DIR" -x

# Trim non-site files, add .nojekyll.
rm -rf "$BUILD_DIR/.git" "$BUILD_DIR/index-org.html" "$BUILD_DIR/opencode.json" \
	"$BUILD_DIR/README.md" "$BUILD_DIR/.opencode" "$BUILD_DIR/.serena" "$BUILD_DIR/.github" \
	"$BUILD_DIR/deploy.sh"
touch "$BUILD_DIR/.nojekyll"

echo ">> Switching to gh-pages worktree..."
git checkout -B "$BRANCH" "$GITHUB_REMOTE/gh-pages"

# Replace rgbify/ with the fresh build, keeping everything else intact.
git rm -r --quiet rgbify 2>/dev/null || true
cp -r "$BUILD_DIR" rgbify

git add -A rgbify/
if git diff --cached --quiet; then
	echo ">> No changes to deploy."
	exit 0
fi

git commit -m "Update rgbify site from main" --no-verify
echo ">> Pushing to $GITHUB_REMOTE gh-pages..."
git push "$GITHUB_REMOTE" "$BRANCH:gh-pages" --force

# Poll the live site until the deployed files match what we just pushed.
# GitHub Pages has a short propagation delay; loop with backoff and notify
# the user as soon as the change is live.
echo ">> Polling https://dcerisano.github.io/rgbify/ for the update to go live..."
SITE="https://dcerisano.github.io/rgbify"
# Reference content = exactly what we pushed (from the fresh build).
JS_SHA="$(sha256sum "$BUILD_DIR/js/rgbify-projector.js" | awk '{print $1}')"
IDX_SHA="$(sha256sum "$BUILD_DIR/index.html" | awk '{print $1}')"
ATTEMPT=0
MAX_ATTEMPTS=30
while [ "$ATTEMPT" -lt "$MAX_ATTEMPTS" ]; do
	ATTEMPT=$((ATTEMPT + 1))
	LIVE_JS="$(curl -sf "$SITE/js/rgbify-projector.js" | sha256sum | awk '{print $1}')" || LIVE_JS=""
	LIVE_IDX="$(curl -sf "$SITE/index.html" | sha256sum | awk '{print $1}')" || LIVE_IDX=""
	if [ "$LIVE_JS" = "$JS_SHA" ] && [ "$LIVE_IDX" = "$IDX_SHA" ]; then
		echo ">> LIVE: site is up to date at $SITE/ (attempt $ATTEMPT)."
		exit 0
	fi
	echo "    ... not live yet (attempt $ATTEMPT), retrying in 10s"
	sleep 10
done

echo ">> TIMEOUT: site not confirmed live after ${MAX_ATTEMPTS} attempts (~$((MAX_ATTEMPTS * 10))s)." >&2
echo "   Push succeeded, but the change hasn't propagated yet. Check $SITE/ shortly." >&2
exit 1
