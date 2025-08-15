/**
 * Results Plugin Definition
 */

import BarChartIcon from "@lucide/svelte/icons/bar-chart";
import type { PluginDefinition } from "../../core/state/plugin-registry.js";

export default {
  id: "results",
  title: "Results",
  order: 40,
  icon: BarChartIcon,
  sidebar: () => import("./components/SidebarPane.svelte"),
  main: () => import("./components/DetailPane.svelte"),
  capabilities: ["results:management", "results:download", "results:preview"]
} satisfies PluginDefinition;