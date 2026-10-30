import { scope, type Layer } from "./layer"

const hex = (value: string | undefined) => (value && /^#[0-9a-fA-F]{6}$/.test(value) ? value.toLowerCase() : undefined)

// Strata's blend(): a linear per-channel mix of two #rrggbb colors.
const blend = (a: string, b: string, t: number) => {
  const channel = (color: string, i: number) => parseInt(color.slice(1 + i * 2, 3 + i * 2), 16)
  const mixed = [0, 1, 2].map((i) => Math.round(channel(a, i) + (channel(b, i) - channel(a, i)) * t))

  return `#${mixed.map((value) => value.toString(16).padStart(2, "0")).join("")}`
}

// Strata's own token set, mapped from colors.toml as Strata maps it (strata/src/ui/theme.rs, tokens_from_quattro).
// The restyle layers draw on these, so borders and states read the way they do in Strata rather than the way OpenCode
// derives them.
export const strata: Layer = (theme) => {
  const c = theme.colors
  const bg = hex(c.background)
  const text = hex(c.foreground)
  const accent = hex(c.accent)

  if (!bg || !text || !accent) throw new Error("colors.toml lacks background, foreground or accent")

  const lighter = hex(c.lighter_background)

  return `${scope(theme)} {
  --strata-bg: ${bg};
  --strata-surface: ${hex(c.dark_background) ?? bg};
  --strata-text: ${text};
  --strata-accent: ${accent};
  --strata-muted: ${lighter && lighter !== bg ? lighter : blend(bg, text, 0.1)};
  --strata-highlight: ${hex(c.selection) ?? blend(bg, accent, 0.25)};
  --strata-border: ${hex(c.muted) ?? blend(bg, text, 0.36)};
  --strata-dim-text: ${blend(bg, text, 0.62)};
  --strata-danger: ${hex(c.color1) ?? hex(c.red) ?? "#e5484d"};
  --strata-font: "JetBrains Mono", "JetBrainsMono Nerd Font", monospace;
}`
}

// `alpha(@strata_<name>, <amount>)` from Strata's stylesheet.
export const alpha = (name: string, amount: number) =>
  `color-mix(in srgb, var(--strata-${name}) ${Math.round(amount * 100)}%, transparent)`
