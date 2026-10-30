import { scope, type Layer } from "./layer"

// Square corners everywhere, as Strata draws them at a corner roundness of 0. Most of the app's radii are hard-coded
// (Tailwind `rounded-*` utilities and literal px in component CSS), so the tokens alone leave most corners round;
// the universal rule catches the rest, pills and circles included.
export const shape: Layer = (theme) => {
  const s = scope(theme)

  return `${s} {
  --radius-xs: 0; --radius-sm: 0; --radius-md: 0; --radius-lg: 0; --radius-xl: 0;
  --tabs-compact-pill-radius: 0;
  --avatar-radius: 0;
}
${s} *, ${s} *::before, ${s} *::after, ${s} ::-webkit-scrollbar-thumb {
  border-radius: 0 !important;
}`
}
