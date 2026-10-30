// "rgb(25, 21, 21)", as the element's inline style reports a color, as "#191515", as a canvas reports its fillStyle.
const hex = (rgb: string) => {
  const channels = rgb.match(/\d+/g)

  if (!channels || channels.length !== 3) return undefined

  return `#${channels.map((value) => Number(value).toString(16).padStart(2, "0")).join("")}`
}

// The terminal (ghostty-web) paints its background into its canvas, in the color the app resolves from its own built-in
// theme, so CSS cannot reach it; it shows black under most themes. ghostty-web clears each row before filling it with
// that color and never paints cells on the default background, so skipping that fill leaves the row transparent and
// the pane's CSS background (layers/terminal.ts) shows through, following the Omarchy theme without a repaint. The
// pane's inline style holds the app's terminal background, which tells that fill apart from cells with their own color.
export function clearTerminalBackground() {
  const proto = CanvasRenderingContext2D.prototype
  const fillRect = proto.fillRect

  const patched: typeof fillRect = function (this: CanvasRenderingContext2D, x, y, width, height) {
    const pane = this.canvas.parentElement

    if (pane?.dataset.component === "terminal" && this.fillStyle === hex(pane.style.backgroundColor)) return

    fillRect.call(this, x, y, width, height)
  }

  proto.fillRect = patched

  return () => {
    if (proto.fillRect === patched) proto.fillRect = fillRect
  }
}
