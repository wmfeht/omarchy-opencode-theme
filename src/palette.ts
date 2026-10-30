import type { ColorValue, HexColor, ThemeVariant } from "./resolver/types"

const hex = (value: string | undefined): HexColor | undefined =>
  value && /^#[0-9a-fA-F]{3,8}$/.test(value) ? (value as HexColor) : undefined

// Maps Omarchy's colors.toml onto an OpenCode desktop palette. OpenCode derives every other token (surfaces, borders,
// hover states, diff fills, markdown) from these seeds with its own resolver, so the mapping stays small.
export function toVariant(colors: Record<string, string>): ThemeVariant {
  const pick = (...keys: string[]) => {
    for (const key of keys) {
      const value = hex(colors[key])

      if (value) return value
    }

    throw new Error(`colors.toml has none of: ${keys.join(", ")}`)
  }

  const accent = pick("accent", "blue")
  const cyan = pick("cyan")
  // `info` must read apart from the primary color; many Omarchy themes use cyan as their accent.
  const info = cyan.toLowerCase() === accent.toLowerCase() ? pick("blue") : cyan

  const background = pick("background")

  const overrides: Record<string, ColorValue> = {
    // The resolver darkens the neutral seed for its base; pin it to Omarchy's own background. Surfaces blend against it.
    "background-base": background,
    "syntax-comment": pick("muted", "dark_foreground"),
    "syntax-keyword": pick("magenta"),
    "syntax-string": pick("green"),
    "syntax-primitive": pick("blue"),
    "syntax-property": pick("cyan"),
    "syntax-constant": pick("orange", "yellow"),
    "syntax-type": pick("yellow"),
  }

  return {
    palette: {
      neutral: background,
      ink: pick("foreground"),
      primary: accent,
      accent: pick("magenta"),
      success: pick("green"),
      warning: pick("yellow"),
      error: pick("red"),
      info,
      diffAdd: pick("green"),
      diffDelete: pick("red"),
    },
    overrides,
    // The v2 tokens take their own overrides. Omarchy's dark_background is one step deeper in both modes, as bg-deep is.
    v2Overrides: {
      "v2-background-bg-base": background,
      "v2-background-bg-deep": pick("dark_background", "background"),
    },
  }
}
