import { Plugin } from "@opencode/plugin/gui"
import { main } from "./main"
import { setup } from "./window"

export default Plugin.define({ os: ["linux"], setup, main })
