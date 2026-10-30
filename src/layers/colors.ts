import { toVariant } from "../palette"
import { resolveThemeVariant, themeToCss } from "../resolver/resolve"
import { resolveThemeVariantV2, themeV2ToCss } from "../resolver/v2/resolve"
import { scope, type Layer } from "./layer"

// Resolves the Omarchy palette exactly as the app resolves a built-in theme, and overrides the same variables.
export const colors: Layer = (theme) => {
  const dark = theme.mode === "dark"
  const variant = toVariant(theme.colors)
  const v1 = themeToCss(resolveThemeVariant(variant, dark))
  const v2 = themeV2ToCss(resolveThemeVariantV2(variant, dark))

  return `${scope(theme)} {\n  ${v1}\n  ${v2}\n}`
}
