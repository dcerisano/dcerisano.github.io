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

echo ">> Done. Site: https://dcerisano.github.io/rgbify/ (allow a short propagation delay)"
