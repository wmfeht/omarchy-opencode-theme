import type { OmarchyTheme } from "../contract"

// A layer turns the current Omarchy theme into one stylesheet. Each layer is its own <style> element, so one that
// throws or returns nothing leaves the others applied.
export type Layer = (theme: OmarchyTheme) => string | undefined

// Applies only while the app shows the same mode as the Omarchy theme, so a light Omarchy palette never lands on the
// app's dark mode or the reverse. `:root:root` outranks the app's own `:root` theme block wherever either loads.
export const scope = (theme: OmarchyTheme) => `:root:root[data-color-scheme="${theme.mode}"]`
