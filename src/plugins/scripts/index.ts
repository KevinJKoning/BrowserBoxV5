/**
 * Scripts Plugin Definition
 */

import CodeIcon from "@lucide/svelte/icons/code";
import type { PluginDefinition } from "../../core/state/plugin-registry.js";

export default {
  id: "scripts",
  title: "Scripts",
  order: 30,
  icon: CodeIcon,
  sidebar: () => import("./components/SidebarPane.svelte"),
  main: () => import("./components/DetailPane.svelte"),
  capabilities: ["scripts:execution", "pyodide:execution"]
} satisfies PluginDefinition;