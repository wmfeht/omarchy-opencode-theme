import { Schema } from "effect"
import { Plugin, Store } from "@opencode/plugin/gui"
import { VARIANTS } from "./variant"

// The variant chosen for each Omarchy theme, by theme name, as Strata remembers it. A theme without an entry uses the
// default.
const Prefs = Schema.Struct({
  variants: Schema.Record(Schema.String, Schema.Literals(VARIANTS)),
})

export const declarations = Plugin.define({
  os: ["linux"],
  i18n: {
    en: {
      "settings.title": "Omarchy",
      "variant.title": "Omarchy variant",
      "variant.description":
        "Lighter keeps {{theme}} as authored, Darker puts the whole window on its darker background, and Contrast also raises text and accents to readable contrast. Remembered per Omarchy theme.",
      "variant.keywords": "theme lighter darker contrast background",
      "variant.lighter": "Lighter",
      "variant.darker": "Darker",
      "variant.contrast": "Contrast",
    },
  },
  stores: {
    prefs: Store.global(Prefs, { variants: {} }),
  },
})
