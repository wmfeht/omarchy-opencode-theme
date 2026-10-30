import { Schema } from "effect"
import { Ipc } from "@opencode/plugin/gui"

// The parsed colors.toml of the current Omarchy theme: `mode` plus every `key = "#hex"` line.
export const OmarchyTheme = Schema.Struct({
  name: Schema.String,
  mode: Schema.String,
  colors: Schema.Record(Schema.String, Schema.String),
})

export type OmarchyTheme = typeof OmarchyTheme.Type

// Main reads and watches the theme; every window follows its state. `null` while no Omarchy theme is readable.
export const Omarchy = Ipc.define({
  id: "omarchy-opencode-theme.theme",
  state: Schema.NullOr(OmarchyTheme),
  methods: {},
})
