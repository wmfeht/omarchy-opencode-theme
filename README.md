# omarchy-opencode-theme

An OpenCode Desktop GUI plugin that themes the app with the current Omarchy theme and follows `omarchy theme set`
live. It also restyles the UI in the look of [Strata](https://github.com/lgse/strata): square corners, JetBrains Mono
everywhere, Lucide icons, 1px lines.

## Requirements

- Linux. The plugin declares `os: ["linux"]` and does not load elsewhere.
- [Omarchy](https://omarchy.org). The plugin reads `~/.local/state/omarchy/current/theme/colors.toml`.
- OpenCode Desktop 2.2.4. See [Compatibility](#compatibility).
- JetBrains Mono installed, as `JetBrains Mono` or the `JetBrainsMono Nerd Font` Omarchy ships. Without either, the
  UI falls back to the system `monospace` font.
- **Settings > Appearance** set to **System**. The colors apply only while the app's mode matches the Omarchy theme's
  mode; Omarchy sets the GNOME color scheme on every theme switch, so with System the two stay in step.

## Install

Add the package to `plugins` in the global config, `~/.config/opencode/opencode.json` (or `opencode.jsonc`). OpenCode
Desktop loads GUI plugins only from the global config, not from a project's.

```json
{
  "$schema": "https://opencode.ai/config.json",
  "plugins": ["omarchy-opencode-theme"]
}
```

Pin a version with `"omarchy-opencode-theme@0.1.0"`. Config changes apply without a restart.

Update with `opencode plugin update`. Remove with `opencode plugin remove omarchy-opencode-theme`, or delete the entry.

## What it changes

- Colors follow the current Omarchy theme and update live on `omarchy theme set`. OpenCode's own resolver derives
  every token from the Omarchy palette, so surfaces, borders, diffs and syntax highlighting all follow it.
- The Strata restyle:
  - Square corners everywhere.
  - JetBrains Mono for the whole UI. This overrides the font choice in **Settings > Appearance**, which has no effect
    while the plugin is on.
  - The app's icon sprite redrawn with [Lucide](https://lucide.dev) icons. Brand marks and filled glyphs keep
    OpenCode's artwork.
  - Borders, hover/press/selection states, buttons, fields and scrollbars drawn as 1px lines and accent tints, with no
    drop shadows.

There are no options. To turn it off, use the plugin's switch in **Settings > Extensions > Plugins**, or remove it
from the config. Turning it off restores the original icons and styles.

## Compatibility

OpenCode's GUI plugin API is experimental. This release targets OpenCode 2.2.4: it builds against
`@opencode/plugin@2.2.4`, and its theme resolver is copied from `@opencode/ui@2.2.4`. Other OpenCode versions may
break it, or leave some colors unthemed.

## Troubleshooting

- **No colors.** Check that **Settings > Appearance** is **System** and that the app's mode matches the Omarchy theme's
  `mode` in `colors.toml` (anything other than `light` counts as dark).
- **Still no colors.** Check that `~/.local/state/omarchy/current/theme/colors.toml` exists. Omarchy's themes define
  every color the plugin reads; a custom theme missing `background`, `foreground`, `accent`, `cyan`, `red`, `green`,
  `yellow` or `magenta` (as `#rrggbb`) leaves part of the UI unthemed. That failure goes to the window's developer
  console as `[omarchy-opencode-theme] layer failed`, not to the log file.
- **Logs.** The plugin writes to `~/.local/share/opencode/log/opencode.log`: `omarchy theme loaded` on each read,
  `omarchy theme unreadable` when `colors.toml` cannot be read, and `cannot watch omarchy theme` when live updates
  cannot start.

## Development

### How it works

- `src/main.ts` (Electron main process) reads `~/.local/state/omarchy/current/theme/colors.toml` and watches
  `current/theme.name`, which `omarchy theme set` writes after swapping the theme directory. It publishes the parsed
  theme to every window through the `omarchy-opencode-theme.theme` Ipc.
- `src/palette.ts` maps Omarchy's colors onto OpenCode's 10-color desktop palette, plus syntax and background
  overrides.
- `src/resolver/` is OpenCode's own theme resolver, copied unchanged from `@opencode/ui@2.2.4` (MIT; the GUI build
  cannot import `@opencode/*`). It derives the ~450 CSS variables exactly as the app does for a built-in theme.
- `src/layers/` turns the theme into stylesheets. `src/window.ts` injects each layer with `ctx.add(Style, …)` under
  `:root:root[data-color-scheme="<omarchy mode>"]`, which outranks the app's own `:root` theme block.

### Develop

```bash
npm install
npm run dev        # vite build --watch; each rebuild hot-reloads the plugin in the app
npm run typecheck
```

For local development, list the plugin in `plugins` in `~/.config/opencode/opencode.json` by its absolute path instead
of the package name.

### Adding restyle layers

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

### Updating for a new OpenCode release

The token names come from the copied resolver. After an app update, recopy `src/resolver/{resolve,color,types}.ts`
and `src/resolver/v2/*.ts` from the matching `@opencode/ui` version (`npm pack @opencode/ui@<version>`) and bump
`@opencode/plugin` to the same version.

### Releasing

Bump `version` in `package.json` and add the release to [CHANGELOG.md](CHANGELOG.md). `npm publish` runs typecheck and
build through `prepublishOnly`. Pushing a `v*` tag publishes through GitHub Actions, which needs an `NPM_TOKEN`
repository secret.

## License

MIT; see [LICENSE](LICENSE).

`src/resolver/` is copied from [`@opencode/ui`](https://github.com/anomalyco/opencode) and stays under OpenCode's MIT
license; see [src/resolver/LICENSE](src/resolver/LICENSE). Built bundles include icons from
[Lucide](https://lucide.dev) under the [ISC license](https://github.com/lucide-icons/lucide/blob/main/LICENSE).
Third-party notices for code in the built bundle (the OpenCode resolver, MIT; Lucide, ISC) are in
[THIRD_PARTY_LICENSES](THIRD_PARTY_LICENSES).
