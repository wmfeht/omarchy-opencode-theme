import type { Accessor } from "solid-js"
import { SettingsPage, type Context } from "@opencode/plugin/gui"
import type { OmarchyTheme } from "./contract"
import { VARIANTS, type Variant } from "./variant"

const ACTION = "omarchy-variant"

// "tokyo-night" as "Tokyo Night", as Strata titles Omarchy theme names.
const title = (name: string) =>
  name
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ")

// An Omarchy section on Settings > General, with Strata's variant choice for the current theme. Plugins cannot add rows
// to the Appearance page, where the app's own theme settings are. Listed only while an Omarchy theme is readable.
export function settings(
  ctx: Context,
  theme: Accessor<OmarchyTheme | null | undefined>,
  variant: Accessor<Variant>,
  choose: (variant: Variant) => void,
) {
  ctx.add(SettingsPage, (): SettingsPage | undefined => {
    const current = theme()

    if (!current) return undefined

    const description = ctx.t("variant.description", { theme: title(current.name) })

    return {
      id: "omarchy",
      page: "general",
      title: ctx.t("settings.title"),
      entries: [
        { id: ACTION, title: ctx.t("variant.title"), description, keywords: ctx.t("variant.keywords") },
      ],
      // The app's settings markup (SettingsList, SettingsRow), so the section is styled and searched as its own are.
      render: () => (
        <section class="settings-section" aria-label={ctx.t("settings.title")}>
          <h3 class="settings-section-title">{ctx.t("settings.title")}</h3>
          <div data-component="settings-list">
            <div data-component="settings-row">
              <div data-slot="settings-row-copy">
                <div data-slot="settings-row-title">{ctx.t("variant.title")}</div>
                <div data-slot="settings-row-description">{description}</div>
              </div>
              <div data-slot="settings-row-control" data-action={ACTION}>
                <ctx.ui.Menu
                  trigger="button"
                  label={ctx.t(`variant.${variant()}`)}
                  items={VARIANTS.map((option) => ({
                    label: ctx.t(`variant.${option}`),
                    icon: option === variant() ? ("check" as const) : undefined,
                    onSelect: () => choose(option),
                  }))}
                />
              </div>
            </div>
          </div>
        </section>
      ),
    }
  })
}
