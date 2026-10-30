import { Plugin } from "@opencode/plugin/gui"
import { declarations } from "./declarations"
import { main } from "./main"
import { setup } from "./window"

export default Plugin.define({ ...declarations, setup, main })
