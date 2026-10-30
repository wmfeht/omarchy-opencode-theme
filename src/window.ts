import { Style, type Plugin } from "@opencode/plugin/gui"
import { Omarchy } from "./contract"
import type { declarations } from "./declarations"
import { restyleIcons } from "./icons"
import { layers } from "./layers"
import { settings } from "./settings"
import { clearTerminalBackground } from "./terminal"
import { DEFAULT_VARIANT, type Variant } from "./variant"

export const setup: Plugin.Setup<typeof declarations> = (ctx) => {
  const restoreIcons = restyleIcons()
  const restoreTerminal = clearTerminalBackground()

  const omarchy = ctx.main(Omarchy)
  const prefs = ctx.stores.prefs

  // The variant is remembered per Omarchy theme, so switching themes brings back each one's choice.
  const variant = (): Variant => {
    const name = omarchy.state()?.name

    return (name && prefs.value.variants[name]) || DEFAULT_VARIANT
  }

  const choose = (next: Variant) => {
    const name = omarchy.state()?.name

    if (!name) return

    prefs.update((draft) => {
      if (next === DEFAULT_VARIANT) delete draft.variants[name]
      else draft.variants[name] = next
    })
  }

  settings(ctx, omarchy.state, variant, choose)

  for (const layer of layers) {
    ctx.add(Style, () => {
      const theme = omarchy.state()

      if (!theme) return undefined

      try {
        return layer(theme, variant())
      } catch (cause) {
        console.warn("[omarchy-opencode-theme] layer failed", cause)

        return undefined
      }
    })
  }

  return () => {
    restoreIcons()
    restoreTerminal()
  }
}
