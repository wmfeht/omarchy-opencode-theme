import type { OmarchyTheme } from "./contract"

// Strata's Omarchy variants (strata/src/ui/theme/omarchy.rs). Lighter is the plain mapping. Darker moves the window
// onto dark_background. Contrast is the Darker layout with foregrounds raised to contrast targets.
export const VARIANTS = ["lighter", "darker", "contrast"] as const

export type Variant = (typeof VARIANTS)[number]

export const DEFAULT_VARIANT: Variant = "darker"

export const hex = (value: string | undefined) =>
  value && /^#[0-9a-fA-F]{6}$/.test(value) ? value.toLowerCase() : undefined

// Strata's blend(): a linear per-channel mix of two #rrggbb colors.
export const blend = (a: string, b: string, t: number) => {
  const channel = (color: string, i: number) => parseInt(color.slice(1 + i * 2, 3 + i * 2), 16)
  const mixed = [0, 1, 2].map((i) => Math.round(channel(a, i) + (channel(b, i) - channel(a, i)) * t))

  return `#${mixed.map((value) => value.toString(16).padStart(2, "0")).join("")}`
}

// WCAG relative luminance and contrast ratio.
const luminance = (color: string) => {
  const [r, g, b] = [0, 1, 2].map((i) => {
    const value = parseInt(color.slice(1 + i * 2, 3 + i * 2), 16) / 255

    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4
  })

  return r * 0.2126 + g * 0.7152 + b * 0.0722
}

const contrast = (a: string, b: string) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x)

  return (hi + 0.05) / (lo + 0.05)
}

// Moves `color` toward `pole` in 256 steps until `done` holds; only luminance changes, so the hue is kept.
const toward = (color: string, pole: string, done: (color: string) => boolean) => {
  for (let step = 0; step <= 255; step++) {
    const next = blend(color, pole, step / 255)

    if (done(next)) return next
  }

  return pole
}

const readable = (color: string, backgrounds: string[], pole: string, ratio: number) =>
  toward(color, pole, (next) => backgrounds.every((background) => contrast(next, background) >= ratio))

const poles = (theme: OmarchyTheme) =>
  theme.mode === "light" ? { back: "#ffffff", fore: "#000000" } : { back: "#000000", fore: "#ffffff" }

export interface Tokens {
  background: string
  surface: string
  text: string
  accent: string
  danger: string
  muted: string
  highlight: string
  border: string
  dimText: string
}

// Strata's token set, mapped from colors.toml as Strata maps it (strata/src/ui/theme.rs, tokens_from_quattro), then
// shifted by the variant (omarchy.rs, apply_variant).
export function tokens(theme: OmarchyTheme, variant: Variant): Tokens {
  const c = theme.colors
  const bg = hex(c.background)
  const text = hex(c.foreground)
  const accent = hex(c.accent)

  if (!bg || !text || !accent) throw new Error("colors.toml lacks background, foreground or accent")

  // Some themes set lighter_background equal to background, which would hide hover.
  const lighter = hex(c.lighter_background)
  const t: Tokens = {
    background: bg,
    surface: hex(c.dark_background) ?? bg,
    text,
    accent,
    danger: hex(c.color1) ?? hex(c.red) ?? "#e5484d",
    muted: lighter && lighter !== bg ? lighter : blend(bg, text, 0.1),
    highlight: hex(c.selection) ?? blend(bg, accent, 0.25),
    border: hex(c.muted) ?? blend(bg, text, 0.36),
    dimText: blend(bg, text, 0.62),
  }

  if (variant === "lighter") return t

  t.background = t.surface

  if (variant !== "contrast") return t

  const { back, fore } = poles(theme)

  // A mid-tone surface is darkened or lightened only when even the foreground pole could not reach 7:1 on it.
  for (const key of ["background", "surface", "muted", "highlight"] as const)
    t[key] = toward(t[key], back, (color) => contrast(color, fore) >= 7)

  const surfaces = [t.background, t.surface, t.muted, t.highlight]

  t.text = readable(t.text, surfaces, fore, 7)
  t.dimText = readable(t.dimText, surfaces, fore, 4.5)
  t.accent = readable(t.accent, surfaces, fore, 4.5)
  t.danger = readable(t.danger, surfaces, fore, 4.5)
  t.border = readable(t.border, surfaces, fore, 3)

  return t
}

// The colors.toml keys OpenCode's palette draws text in, besides foreground and accent (see palette.ts).
const FOREGROUNDS = ["blue", "cyan", "magenta", "green", "yellow", "red", "orange", "muted", "dark_foreground"]

// colors.toml as the variant draws it, for OpenCode's resolver: the variant's surfaces, and under Contrast its text and
// accent, with every other foreground raised to 4.5:1 on the window and pane, as Strata raises its syntax colors.
export function variantColors(theme: OmarchyTheme, variant: Variant): Record<string, string> {
  if (variant === "lighter") return theme.colors

  const t = tokens(theme, variant)
  const colors: Record<string, string> = { ...theme.colors, background: t.background, dark_background: t.surface }

  if (variant !== "contrast") return colors

  const { fore } = poles(theme)
  const accent = hex(theme.colors.accent)

  for (const key of FOREGROUNDS) {
    const value = hex(theme.colors[key])

    // A color that is the accent stays the raised accent, so palette.ts still sees them as the same color.
    if (value) colors[key] = value === accent ? t.accent : readable(value, [t.background, t.surface], fore, 4.5)
  }

  return {
    ...colors,
    foreground: t.text,
    accent: t.accent,
    lighter_background: t.muted,
    selection: t.highlight,
  }
}
