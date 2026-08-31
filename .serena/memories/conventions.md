# RGBify Website — conventions

- Commit message style: lowercase prefixes like `Web app: ...`, `Volume slider: ...`, `Color picker: ...`, `chore: ...` (feature-line specific).
- JS style in `rgbify-projector.js`: tabs for indentation, `const`/`let` (legacy code uses `var`), no semicolons omitted, small top-level functions.
- Inline `<style>` lives in `index.html` head (no separate app css file for the current UI; `css/ui.css` is legacy).
- Repo `opencode.json` has `plugin` array: `@tarquinen/opencode-dcp@latest` + `file:///home/kronos/git/opencode-rgbify-plugin/dist/index.js`. `command` section registers `dcp` and `rgbify` (template `$ARGUMENTS`, description "RGBify controls: rgbify volume <0-10>, wallpaper, wallpaper close, wallpaper url").
- Serena memories live in `.serena/memories/` and are git-tracked; `project.yml` migrated from the token-reduce template had a wrong `project_name` — should read `rgbify-website`.