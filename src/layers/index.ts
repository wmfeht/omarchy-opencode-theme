import { chrome } from "./chrome"
import { colors } from "./colors"
import type { Layer } from "./layer"
import { shape } from "./shape"
import { strata } from "./strata"
import { type } from "./type"

// Applied in order. `strata` defines the --strata-* tokens the restyle layers after it draw on.
export const layers: Layer[] = [colors, strata, shape, type, chrome]
