import { scope, type Layer } from "./layer"
import { alpha } from "./strata"

// A box-shadow that draws nothing, for shadow tokens other rules combine into comma lists.
const NONE = "0 0 0 0 transparent"

// Strata's chrome on OpenCode's tokens: flat surfaces outlined by 1px lines of the theme's `muted` color, accent tints
// for hover, press and selection, no drop shadows, and a thin accent scrollbar (strata/src/style.css).
export const chrome: Layer = (theme) => {
  const s = scope(theme)
  const line = `0 0 0 1px ${alpha("border", 0.6)}`
  const primary = `:is([data-component=button-v2], [data-component=icon-button-v2]):is([data-variant=contrast], [data-variant=submit])`
  // Question-dock custom answers are this same text input, but OpenCode 2.2.7 draws them borderless on the option
  // (question-prompt.css, in @layer components). These rules are unlayered, so they would paint a background and a
  // hover line over that field. Inline renames are [data-component=inline-input] and are not matched here.
  const field = `:is([data-component=text-input-v2], [data-component=textarea-v2], [data-component=select-v2]):not(.question-custom-field)`

  return `${s} {
  /* Lines: structural 0.6, internal dividers 0.28, form controls 0.54, focus accent. */
  --v2-border-border-base: ${alpha("border", 0.6)};
  --v2-border-border-muted: ${alpha("border", 0.28)};
  --v2-border-border-strong: var(--strata-border);
  --v2-border-border-focus: var(--strata-accent);
  --border-weaker-base: ${alpha("border", 0.2)};
  --border-weak-base: ${alpha("border", 0.28)};
  --border-base: ${alpha("border", 0.6)};
  --border-strong-base: var(--strata-border);
  --border-hover: ${alpha("accent", 0.42)};
  --border-weak-hover: ${alpha("accent", 0.42)};
  --border-focus: var(--strata-accent);
  --border-weak-focus: var(--strata-accent);
  --border-selected: var(--strata-accent);
  --border-weak-selected: ${alpha("accent", 0.42)};

  /* States: hover 0.15, pressed and selected 0.22. */
  --v2-overlay-simple-overlay-hover: ${alpha("accent", 0.15)};
  --v2-overlay-simple-overlay-pressed: ${alpha("accent", 0.22)};
  --v2-overlay-simple-tab-hover-scrim: ${alpha("accent", 0.15)};
  --v2-overlay-simple-tab-active-scrim: ${alpha("accent", 0.22)};
  --surface-base-hover: ${alpha("accent", 0.15)};
  --surface-base-active: ${alpha("accent", 0.22)};
  --surface-raised-base-hover: ${alpha("accent", 0.15)};
  --surface-raised-base-active: ${alpha("accent", 0.22)};
  --surface-base-interactive-active: ${alpha("accent", 0.22)};

  /* Surfaces: Strata's dark_background for menus and floating panels. */
  --surface-float-base: var(--strata-surface);
  --surface-float-base-hover: ${alpha("accent", 0.15)};

  /* Icons: drawn in the accent, as Strata's toolbar, sidebar and preview icons are; faint ones in dim text. */
  --v2-icon-icon-base: var(--strata-accent);
  --v2-icon-icon-muted: ${alpha("accent", 0.8)};
  --v2-icon-icon-faint: var(--strata-dim-text);
  --v2-icon-icon-accent: var(--strata-accent);
  --v2-icon-icon-accent-hover: var(--strata-accent);
  --icon-base: var(--strata-accent);
  --icon-hover: var(--strata-accent);
  --icon-active: var(--strata-accent);
  --icon-strong-base: var(--strata-accent);
  --icon-weak-base: ${alpha("accent", 0.8)};
  --icon-weak-hover: var(--strata-accent);

  /* Buttons and fields: a transparent box with a 0.54 line; primary is an accent tint inside an accent line.
     Text inputs, textareas and selects take --v2-elevation-input. */
  --v2-background-bg-button-neutral: transparent;
  --v2-elevation-button-neutral: inset 0 0 0 1px ${alpha("border", 0.54)};
  --v2-elevation-input: inset 0 0 0 1px ${alpha("border", 0.54)};
  --v2-elevation-button-contrast: inset 0 0 0 1px var(--strata-accent);

  /* Elevation: a 1px outline instead of a drop shadow (Strata with Element glow off). */
  --v2-elevation-elements: ${NONE};
  --v2-elevation-raised: ${line};
  --v2-elevation-floating: ${line};
  --v2-elevation-overlay: ${line};
  --shadow-xs: ${NONE};
  --shadow-md: ${line};
  --shadow-lg: ${line};
  --shadow-xxs-border: ${line};
  --shadow-xs-border: ${line};
  --shadow-xs-border-base: ${line};
  --shadow-xs-border-hover: 0 0 0 1px ${alpha("accent", 0.42)};
  --shadow-xs-border-select: 0 0 0 1px var(--strata-accent);
  --shadow-xs-border-focus: 0 0 0 1px var(--strata-accent);
  --shadow-lg-border-base: ${line};
}

${s} ${primary} {
  background-image: none;
  background-color: ${alpha("accent", 0.1)};
  color: var(--strata-accent);
  text-shadow: none;
}
${s} ${primary}:is(:hover, [data-state=hover]):not(:disabled) {
  background-image: none;
  background-color: ${alpha("accent", 0.18)};
}
${s} ${primary}:is(:active, [data-state=pressed]):not(:disabled) {
  background-image: none;
  background-color: ${alpha("accent", 0.28)};
}

/* Fields: flat, a 0.54 line that turns accent on hover, an accent outline on focus. */
${s} ${field} {
  background: var(--v2-background-bg-base);
}
${s} ${field}:hover:not([data-disabled], [data-invalid]):not(:focus-within):not([data-expanded]) {
  background: var(--v2-background-bg-base);
  box-shadow: inset 0 0 0 1px ${alpha("accent", 0.68)};
}
${s} ${field}:is(:focus-within, [data-expanded]):not([data-disabled], [data-invalid]) {
  background: var(--v2-background-bg-base);
  outline-color: var(--strata-accent);
  box-shadow: none;
}
${s} [data-component=icon-button-v2][data-variant=ghost] {
  color: var(--v2-icon-icon-base);
}
${s} [data-component=icon-button-v2][data-variant=ghost-muted]:not([data-expanded]) {
  color: var(--v2-icon-icon-muted);
}
${s} :is([data-component=button-v2], [data-component=icon-button-v2]):is(:focus-visible, [data-state=focus]) {
  outline-width: 1px;
  outline-offset: -1px;
}

/* Scrollbars: a 4px accent slider on a faint trough, always shown. */
${s} ::-webkit-scrollbar { width: 4px; height: 4px; }
${s} ::-webkit-scrollbar-track { background-color: ${alpha("border", 0.25)}; margin: 0; }
${s} :hover::-webkit-scrollbar-track { background-color: ${alpha("border", 0.45)}; }
${s} ::-webkit-scrollbar-thumb,
${s} :hover::-webkit-scrollbar-thumb,
${s} ::-webkit-scrollbar-thumb:hover {
  border: 0;
  background-color: var(--strata-accent);
}
${s} .scroll-view__thumb::after {
  background-color: var(--strata-accent) !important;
  backdrop-filter: none;
}

${s} ::selection {
  background-color: var(--strata-accent);
  color: var(--strata-bg);
}`
}
