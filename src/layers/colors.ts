import { toVariant } from "../palette"
import { resolveThemeVariant, themeToCss } from "../resolver/resolve"
import { resolveThemeVariantV2, themeV2ToCss } from "../resolver/v2/resolve"
import { variantColors } from "../variant"
import { scope, type Layer } from "./layer"

// Resolves the Omarchy palette, as the chosen variant draws it, exactly as the app resolves a built-in theme, and
// overrides the same variables.
export const colors: Layer = (theme, omarchyVariant) => {
  const dark = theme.mode === "dark"
  const variant = toVariant(variantColors(theme, omarchyVariant))
  const v1 = themeToCss(resolveThemeVariant(variant, dark))
  const v2 = themeV2ToCss(resolveThemeVariantV2(variant, dark))

  return `${scope(theme)} {\n  ${v1}\n  ${v2}\n}`
}
