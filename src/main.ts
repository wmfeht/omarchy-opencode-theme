import { watch } from "node:fs"
import { readFile } from "node:fs/promises"
import { homedir } from "node:os"
import { join } from "node:path"
import type { Plugin } from "@opencode/plugin/gui"
import { Omarchy, type OmarchyTheme } from "./contract"

// `omarchy theme set` replaces current/theme/ wholesale (rm + mv), then writes current/theme.name. Watching the theme
// directory or colors.toml would lose the inode on every switch, so main watches current/ for theme.name instead.
const current = join(homedir(), ".local/state/omarchy/current")

// colors.toml is flat `key = "value"` lines; that is all Omarchy writes there.
function parse(text: string) {
  const colors: Record<string, string> = {}

  for (const line of text.split("\n")) {
    const match = line.match(/^\s*([A-Za-z0-9_]+)\s*=\s*"([^"]*)"/)

    if (match) colors[match[1]] = match[2]
  }

  return colors
}

async function read(): Promise<OmarchyTheme | null> {
  const [toml, name] = await Promise.all([
    readFile(join(current, "theme/colors.toml"), "utf8"),
    readFile(join(current, "theme.name"), "utf8").catch(() => "omarchy"),
  ])
  const { mode, ...colors } = parse(toml)

  return { name: name.trim(), mode: mode === "light" ? "light" : "dark", colors }
}

export const main: Plugin.MainSetup = (ctx) => {
  let theme: OmarchyTheme | null = null
  let timer: ReturnType<typeof setTimeout> | undefined

  const provider = ctx.provide(Omarchy, { state: () => theme })

  const reload = () =>
    read()
      .then((next) => {
        theme = next
        provider.changed()
        ctx.log.write("info", "omarchy theme loaded", { name: next?.name })
      })
      .catch((cause) => ctx.log.write("warn", "omarchy theme unreadable", { cause: String(cause) }))

  void reload()

  try {
    const watcher = watch(current, (_event, file) => {
      if (file !== "theme.name") return
      // theme.name lands right after the swap; let the write settle before reading.
      clearTimeout(timer)
      timer = setTimeout(reload, 150)
    })

    ctx.onCleanup(() => {
      clearTimeout(timer)
      watcher.close()
    })
  } catch (cause) {
    ctx.log.write("warn", "cannot watch omarchy theme", { path: current, cause: String(cause) })
  }
}
