import { scope, type Layer } from "./layer"

// The terminal pane on the window background, as the app draws it under a built-in theme. Its canvas leaves the
// default background unpainted (src/terminal.ts), so this is the color behind the text. `!important` outranks the
// pane's inline style, which holds the app theme's color.
export const terminal: Layer = (theme) => `${scope(theme)} [data-component=terminal] {
  background-color: var(--v2-background-bg-base) !important;
}`
