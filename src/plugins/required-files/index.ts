/**
 * Required Files Plugin Definition
 */

import DatabaseIcon from "@lucide/svelte/icons/database";
import type { PluginDefinition } from "@core/state/plugin-registry";

export default {
  id: "required-files",
  title: "Required Files",
  order: 10,
  icon: DatabaseIcon,
  sidebar: () => import("./components/SidebarPane.svelte"),
  main: () => import("./components/DetailPane.svelte"),
  capabilities: ["file:upload", "file:preview", "file:csv", "file:parquet", "file:geopackage"]
} satisfies PluginDefinition;