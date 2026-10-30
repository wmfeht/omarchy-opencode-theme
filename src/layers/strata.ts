import { tokens } from "../variant"
import { scope, type Layer } from "./layer"

// Strata's own token set, mapped from colors.toml as Strata maps it, under the chosen variant (see variant.ts). The
// restyle layers draw on these, so borders and states read the way they do in Strata rather than the way OpenCode
// derives them.
export const strata: Layer = (theme, variant) => {
  const t = tokens(theme, variant)

  return `${scope(theme)} {
  --strata-bg: ${t.background};
  --strata-surface: ${t.surface};
  --strata-text: ${t.text};
  --strata-accent: ${t.accent};
  --strata-muted: ${t.muted};
  --strata-highlight: ${t.highlight};
  --strata-border: ${t.border};
  --strata-dim-text: ${t.dimText};
  --strata-danger: ${t.danger};
  --strata-font: "JetBrains Mono", "JetBrainsMono Nerd Font", monospace;
}`
}

// `alpha(@strata_<name>, <amount>)` from Strata's stylesheet.
export const alpha = (name: string, amount: number) =>
  `color-mix(in srgb, var(--strata-${name}) ${Math.round(amount * 100)}%, transparent)`
