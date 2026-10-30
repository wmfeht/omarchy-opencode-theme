import { scope, type Layer } from "./layer"

const FAMILY = "Omarchy Strata Mono"

// JetBrains Mono's static faces under one family whose weight ranges split at 600. The app asks for in-between weights
// (440, 530, 670) that a plain static family would round up to Bold; Strata only uses regular and bold (400, 600, 700).
const face = (weight: string, style: string, names: string[]) => `@font-face {
  font-family: "${FAMILY}";
  font-weight: ${weight};
  font-style: ${style};
  src: ${names.map((name) => `local("${name}")`).join(", ")};
}`

const faces = [
  face("1 599", "normal", ["JetBrains Mono Regular", "JetBrainsMono NF Regular", "JetBrainsMonoNF-Regular"]),
  face("600 1000", "normal", ["JetBrains Mono Bold", "JetBrainsMono NF Bold", "JetBrainsMonoNF-Bold"]),
  face("1 599", "italic", ["JetBrains Mono Italic", "JetBrainsMono NF Italic", "JetBrainsMonoNF-Italic"]),
  face("600 1000", "italic", ["JetBrains Mono Bold Italic", "JetBrainsMono NF Bold Italic", "JetBrainsMonoNF-BoldItalic"]),
].join("\n")

// Strata's typography: JetBrains Mono for the whole interface, no tracking. The app writes --font-family-sans and
// --font-family-mono inline on <html> from Settings > Appearance, so these need !important to win over it.
export const type: Layer = (theme) => {
  const s = scope(theme)
  const stack = `"${FAMILY}", var(--strata-font)`

  return `${faces}
${s} {
  --font-family-sans: ${stack} !important;
  --font-family-mono: ${stack} !important;
  --v2-font-family-sans: ${stack};
  --v2-font-family-code: ${stack};
}
${s} * {
  letter-spacing: 0;
}`
}
