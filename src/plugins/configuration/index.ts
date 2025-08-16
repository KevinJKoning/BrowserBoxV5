/**
 * Configuration Management Plugin Definition
 */

import SettingsIcon from "@lucide/svelte/icons/settings";
import type { PluginDefinition } from "@core/state/plugin-registry";

export default {
  id: "configuration",
  title: "Configuration",
  order: 10, // Show early in the list
  icon: SettingsIcon,
  sidebar: () => import("./components/SidebarPane.svelte"),
  main: () => import("./components/DetailPane.svelte"),
  capabilities: ["config:management", "config:loading", "config:preview"]
} satisfies PluginDefinition;