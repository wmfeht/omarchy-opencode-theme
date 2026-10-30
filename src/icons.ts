import {
  Archive, ArrowDownToLine, ArrowLeft, ArrowRight, ArrowUp, ArrowUpRight, AudioLines, Ban, Bell, Blocks, Box, Brain,
  Check, ChevronDown, ChevronLeft, ChevronRight, ChevronsRight, ChevronsUpDown, CircleAlert, CircleCheck,
  CircleQuestionMark, CircleX, CloudUpload, Code, CodeXml, Columns2, Cookie, Copy, CornerDownLeft, Download, Ellipsis,
  Eye, EyeOff, FileDiff, FileInput, FileMusic, FileText, FileVideoCamera, FlaskConical, Folder, FolderGit2,
  FolderPlus, FolderTree, FoldVertical, Fullscreen, GitBranch, GitBranchPlus, GitFork, Glasses, Globe, GlobeLock,
  GraduationCap, Grid2x2Plus, Image, Info, Keyboard, Link, List, ListChecks, Lock, Menu, MessageCircle,
  MessageSquare, MessagesSquare, Minus, Monitor, MousePointer2, OctagonAlert, Palette, PanelBottom, PanelLeft,
  PanelRight, PencilLine, PictureInPicture2, Plug, Plus, Quote, RefreshCw, RotateCcw, RotateCw, Rows2, ScrollText,
  Search, Server, Settings, Share, Shield, SlidersHorizontal, Sparkle, SquareArrowOutUpRight, SquareArrowUpRight,
  SquareCode, SquareDashedMousePointer, SquareMousePointer, SquarePen, SquareTerminal, Terminal, TextAlignEnd,
  TextAlignStart, TextSearch, Trash2, TriangleAlert, Undo2, UnfoldVertical, X, ZoomIn, ZoomOut,
  type IconNode,
} from "lucide"

// A panel region filled in, for the layout toggles whose artwork shows how far a panel is open.
const fill = (x: number, y: number, width: number, height: number, opacity: number): IconNode => [
  ["rect", { x, y, width, height, fill: "currentColor", "fill-opacity": opacity, stroke: "none" }],
]

// OpenCode's icon names, drawn with Lucide: the set Strata's own icons come from. Names left out keep OpenCode's
// artwork: brand marks, filled glyphs (stop, fill-triangle-down) and ones Lucide has no counterpart for.
const lucide: Record<string, IconNode> = {
  "align-right": TextAlignEnd,
  appearance: Palette,
  archive: Archive,
  "arrow-down-to-line": ArrowDownToLine,
  "arrow-left": ArrowLeft,
  "arrow-right": ArrowRight,
  "arrow-undo-down": Undo2,
  "arrow-up": ArrowUp,
  "arrow-up-right": ArrowUpRight,
  branch: GitBranch,
  "branch-out": GitBranchPlus,
  brain: Brain,
  "bubble-5": MessageCircle,
  "bullet-list": List,
  check: Check,
  "check-small": Check,
  checklist: ListChecks,
  "chevron-double-right": ChevronsRight,
  "chevron-down": ChevronDown,
  "chevron-grabber-vertical": ChevronsUpDown,
  "chevron-left": ChevronLeft,
  "chevron-right": ChevronRight,
  "circle-ban-sign": Ban,
  "circle-check": CircleCheck,
  "circle-exclamation": CircleAlert,
  "circle-x": CircleX,
  "circle-xmark": CircleX,
  close: X,
  "close-small": X,
  "cloud-upload": CloudUpload,
  code: SquareCode,
  "code-lines": TextAlignStart,
  "code-slash": CodeXml,
  collapse: FoldVertical,
  comment: MessageSquare,
  console: Terminal,
  copy: Copy,
  cube: Box,
  dash: Minus,
  "dot-grid": Ellipsis,
  download: Download,
  edit: SquarePen,
  "edit-small-2": SquarePen,
  enter: CornerDownLeft,
  expand: UnfoldVertical,
  extensions: Blocks,
  eye: Eye,
  "file-document": FileText,
  "file-tree": FolderTree,
  "file-tree-active": FolderTree,
  filetree: FolderTree,
  flask: FlaskConical,
  folder: Folder,
  "folder-add-left": FolderPlus,
  fork: GitFork,
  glasses: Glasses,
  globe: Globe,
  "graduation-cap": GraduationCap,
  "grid-plus": Grid2x2Plus,
  help: CircleQuestionMark,
  info: Info,
  keyboard: Keyboard,
  "layout-bottom": PanelBottom,
  "layout-bottom-partial": [...PanelBottom, ...fill(3, 15, 18, 6, 0.16)],
  "layout-bottom-full": [...PanelBottom, ...fill(3, 15, 18, 6, 1)],
  "layout-left": PanelLeft,
  "layout-left-partial": [...PanelLeft, ...fill(3, 3, 6, 18, 0.16)],
  "layout-left-full": [...PanelLeft, ...fill(3, 3, 6, 18, 1)],
  "layout-right": PanelRight,
  "layout-right-partial": [...PanelRight, ...fill(15, 3, 6, 18, 0.16)],
  "layout-right-full": [...PanelRight, ...fill(15, 3, 6, 18, 1)],
  link: Link,
  lock: Lock,
  "magnifying-glass": Search,
  "magnifying-glass-menu": TextSearch,
  menu: Menu,
  minus: Minus,
  models: Sparkle,
  monitor: Monitor,
  "new-session": SquarePen,
  "new-session-active": SquarePen,
  notifications: Bell,
  "open-file": FileInput,
  "outline-arrow-left": ArrowLeft,
  "outline-arrow-right": ArrowRight,
  "outline-arrow-to-corner-top-right": SquareArrowUpRight,
  "outline-arrow-up-right": ArrowUpRight,
  "outline-audio": FileMusic,
  "outline-brain": Brain,
  "outline-browser-annotate": SquareDashedMousePointer,
  "outline-chevron-down": ChevronDown,
  "outline-chevron-right": ChevronRight,
  "outline-code-brackets": Code,
  "outline-console": SquareTerminal,
  "outline-cookie": Cookie,
  "outline-copy": Copy,
  "outline-dots": Ellipsis,
  "outline-expand": UnfoldVertical,
  "outline-eye": Eye,
  "outline-eye-slash": EyeOff,
  "outline-globe": Globe,
  "outline-globe-plus": GlobeLock,
  "outline-hexagonal-warning": OctagonAlert,
  "outline-magnifier-minus": ZoomOut,
  "outline-magnifier-plus": ZoomIn,
  "outline-photo": Image,
  "outline-quote": Quote,
  "outline-reset": RotateCcw,
  "outline-rotate-clockwise": RotateCw,
  "outline-share": Share,
  "outline-sliders": SlidersHorizontal,
  "outline-square-arrow": SquareArrowOutUpRight,
  "outline-text": FileText,
  "outline-trash": Trash2,
  "outline-undo": Undo2,
  "outline-video": FileVideoCamera,
  "outline-wave-audio": AudioLines,
  "outline-worktree": FolderGit2,
  "outline-xmark": X,
  "pencil-line": PencilLine,
  photo: Image,
  plus: Plus,
  "plus-small": Plus,
  "post-skill": ScrollText,
  prompt: MessagesSquare,
  providers: Plug,
  refresh: RefreshCw,
  reset: RotateCcw,
  review: FileDiff,
  "review-active": FileDiff,
  "select-element": SquareMousePointer,
  selector: ChevronsUpDown,
  server: Server,
  "settings-gear": Settings,
  share: Share,
  shield: Shield,
  sidebar: PanelLeft,
  "sidebar-active": PanelLeft,
  sliders: SlidersHorizontal,
  "speech-bubble": MessageCircle,
  split: Columns2,
  "square-arrow-top-right": SquareArrowOutUpRight,
  terminal: SquareTerminal,
  "terminal-active": SquareTerminal,
  trash: Trash2,
  unified: Rows2,
  warning: TriangleAlert,
  waveform: AudioLines,
  "window-analytics": PictureInPicture2,
  "window-cursor": MousePointer2,
  workspace: Fullscreen,
  worktree: FolderGit2,
  "xmark-small": X,
}

const markup = (node: IconNode) =>
  node
    .map(([tag, attrs]) => {
      const pairs = Object.entries(attrs).map(([key, value]) => `${key}="${value}"`)

      return `<${tag} ${pairs.join(" ")}/>`
    })
    .join("")

// Lucide's drawing attributes, which its icon nodes leave to the enclosing <svg>.
const body = (node: IconNode) =>
  `<g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${markup(node)}</g>`

const SPRITE = "opencode-v2-icon-sprite"
// Today's artwork and the "New icons" experiment's are both symbols in the sprite: `opencode-v2-icon-<name>` and
// `opencode-v2-icon-new-<name>`.
const NAME = /^opencode-v2-icon-(?:new-)?(.+)$/

// Redraws the app's icon sprite with Lucide artwork and keeps it redrawn: the app inserts the sprite on first use and
// rewrites it on hot reload. Returns a cleanup that puts the original artwork back.
export function restyleIcons(): () => void {
  const originals = new Map<SVGSymbolElement, { viewBox: string | null; html: string }>()
  // The sprite's own mutations are watched apart from <body>'s children, so streaming chat output never rescans it.
  const symbols = new MutationObserver(() => patch())
  let watched: Element | null = null

  const patch = () => {
    const sprite = document.getElementById(SPRITE)

    if (!sprite) return

    if (sprite !== watched) {
      symbols.disconnect()
      symbols.observe(sprite, { childList: true })
      watched = sprite
    }

    for (const symbol of sprite.querySelectorAll<SVGSymbolElement>("symbol[id]")) {
      const node = lucide[NAME.exec(symbol.id)?.[1] ?? ""]

      if (!node || symbol.dataset.lucide) continue

      originals.set(symbol, { viewBox: symbol.getAttribute("viewBox"), html: symbol.innerHTML })
      symbol.setAttribute("viewBox", "0 0 24 24")
      symbol.innerHTML = body(node)
      symbol.dataset.lucide = ""
    }
  }

  // The app inserts the sprite as <body>'s first child the first time an icon renders.
  const inserted = new MutationObserver(() => {
    if (!watched?.isConnected) patch()
  })

  inserted.observe(document.body, { childList: true })
  patch()

  return () => {
    inserted.disconnect()
    symbols.disconnect()

    for (const [symbol, original] of originals) {
      if (original.viewBox === null) symbol.removeAttribute("viewBox")
      else symbol.setAttribute("viewBox", original.viewBox)
      symbol.innerHTML = original.html
      delete symbol.dataset.lucide
    }
  }
}
