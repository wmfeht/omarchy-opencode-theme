import { Style, type Plugin } from "@opencode/plugin/gui"
import { Omarchy } from "./contract"
import { restyleIcons } from "./icons"
import { layers } from "./layers"

export const setup: Plugin.Setup = (ctx) => {
  const restoreIcons = restyleIcons()

  const omarchy = ctx.main(Omarchy)

  for (const layer of layers) {
    ctx.add(Style, () => {
      const theme = omarchy.state()

      if (!theme) return undefined

      try {
        return layer(theme)
      } catch (cause) {
        console.warn("[omarchy-opencode-theme] layer failed", cause)

        return undefined
      }
    })
  }

  return restoreIcons
}
