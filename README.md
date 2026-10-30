# omarchy-opencode-theme

An OpenCode Desktop GUI plugin that themes the app with the current Omarchy theme and follows `omarchy theme set`
live.

## How it works

- `src/main.ts` (Electron main process) reads `~/.local/state/omarchy/current/theme/colors.toml` and watches
  `current/theme.name`, which `omarchy theme set` writes after swapping the theme directory. It publishes the parsed
  theme to every window through the `omarchy-opencode-theme.theme` Ipc.
- `src/palette.ts` maps Omarchy's colors onto OpenCode's 10-color desktop palette, plus syntax and background
  overrides.
- `src/resolver/` is OpenCode's own theme resolver, copied unchanged from `@opencode/ui@2.2.4` (MIT; the GUI build
  cannot import `@opencode/*`). It derives the ~450 CSS variables exactly as the app does for a built-in theme.
- `src/layers/` turns the theme into stylesheets. `src/window.ts` injects each layer with `ctx.add(Style, …)` under
  `:root:root[data-color-scheme="<omarchy mode>"]`, which outranks the app's own `:root` theme block.

The colors apply only while the app's mode matches the Omarchy theme's mode. Set **Settings > Appearance** to
**System**: Omarchy sets the GNOME color scheme on every theme switch, so the two stay in step.

## Develop

```bash
npm install
npm run dev        # vite build --watch; each rebuild hot-reloads the plugin in the app
npm run typecheck
```

The plugin is listed in `~/.config/opencode/opencode.json` under `plugins` by its absolute path.

## Adding restyle layers

Each layer is `(theme) => css | undefined` and gets its own `<style>` element. Add new files under `src/layers/` and
append them to the list in `src/layers/index.ts`. Use `scope(theme)` from `layers/layer.ts` for the selector.

The restyle follows [Strata](https://github.com/lgse/strata)'s look, with its stylesheet as the reference:

- `strata.ts` defines `--strata-*` tokens from `colors.toml` the way Strata maps them (border is `muted`, surface is
  `dark_background`); `alpha(name, amount)` mirrors Strata's `alpha(@strata_<name>, amount)`.
- `shape.ts` squares every corner. Most radii are hard-coded, so it uses a universal `border-radius: 0 !important`.
- `type.ts` sets JetBrains Mono for the whole UI. The app writes the font variables inline from Settings > Appearance,
  so they carry `!important`; the font choice there has no effect while the plugin is loaded.
- `src/icons.ts` redraws the app's icon sprite (`#opencode-v2-icon-sprite`) with [Lucide](https://lucide.dev), the
  set Strata's icons come from, and restores the original artwork when the plugin unloads. Unmapped names (brand marks,
  filled glyphs) keep OpenCode's artwork.
- `chrome.ts` maps borders, hover/press/selection states, elevation, buttons, fields and scrollbars onto Strata's
  1px lines and accent tints.

## Updating for a new OpenCode release

The token names come from the copied resolver. After an app update, recopy `src/theme/{resolve,color,types}.ts` and
`src/theme/v2/*.ts` from the matching `@opencode/ui` version (`npm pack @opencode/ui@<version>`) and bump
`@opencode/plugin` to the same version.

## License

MIT; see [LICENSE](LICENSE).

`src/resolver/` is copied from [`@opencode/ui`](https://github.com/anomalyco/opencode) and stays under OpenCode's MIT
license; see [src/resolver/LICENSE](src/resolver/LICENSE). Built bundles include icons from
[Lucide](https://lucide.dev) under the [ISC license](https://github.com/lucide-icons/lucide/blob/main/LICENSE).
