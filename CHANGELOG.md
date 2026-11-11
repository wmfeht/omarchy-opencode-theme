# Changelog

All notable changes to this project are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the project uses
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.3] - 2026-11-10

### Changed

- Targets OpenCode Desktop 2.2.7. The copied theme resolver still matches `@opencode/ui`: that resolver is unchanged from 2.2.6.

### Fixed

- Custom answers in the question dock stay borderless. OpenCode 2.2.7 draws them as a plain field on the option, and the theme's field chrome was painting a background and a hover line over that.

## [0.1.2] - 2026-11-07

### Changed

- Targets OpenCode Desktop 2.2.6. The copied theme resolver matches `@opencode/ui@2.2.6`.

### Fixed

- Text inputs, textareas and selects stay a 1px line. OpenCode draws them with `--v2-elevation-input`, so they no longer pick up the built-in theme's drop shadow.

## [0.1.1] - 2026-10-30

### Added

- Settings > General > Omarchy > Omarchy variant, Strata's Lighter / Darker / Contrast choice, remembered for each
  Omarchy theme. Darker, the default as in Strata, puts the whole window on the theme's `dark_background`.
- The terminal's background follows the theme instead of the app's built-in theme.

### Fixed

- The README's Troubleshooting section names the right logs: the plugin's messages are in the desktop app's
  `main.log` and `renderer.log`, not `opencode.log`.

## [0.1.0]

First release. Targets OpenCode Desktop 2.2.4 on Linux.

### Added

- Themes OpenCode Desktop with the current Omarchy theme, read from
  `~/.local/state/omarchy/current/theme/colors.toml`.
- Follows `omarchy theme set` live by watching `current/theme.name`.
- Derives every color token through OpenCode's own theme resolver, copied from `@opencode/ui@2.2.4`, so surfaces,
  borders, diffs and syntax highlighting follow the Omarchy palette.
- Applies colors only while the app's mode matches the Omarchy theme's `mode`.
- Strata restyle:
  - Square corners everywhere.
  - JetBrains Mono for the whole UI, overriding the font choice in Settings > Appearance.
  - The app's icon sprite redrawn with Lucide icons; the original artwork is restored when the plugin unloads.
  - Borders, hover/press/selection states, buttons, fields and scrollbars as 1px lines and accent tints, with no drop
    shadows.
- Logs `omarchy theme loaded`, `omarchy theme unreadable` and `cannot watch omarchy theme` to the OpenCode log.

[Unreleased]: https://github.com/wmfeht/omarchy-opencode-theme/compare/v0.1.3...HEAD
[0.1.3]: https://github.com/wmfeht/omarchy-opencode-theme/compare/v0.1.2...v0.1.3
[0.1.2]: https://github.com/wmfeht/omarchy-opencode-theme/compare/v0.1.1...v0.1.2
[0.1.1]: https://github.com/wmfeht/omarchy-opencode-theme/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/wmfeht/omarchy-opencode-theme/releases/tag/v0.1.0
