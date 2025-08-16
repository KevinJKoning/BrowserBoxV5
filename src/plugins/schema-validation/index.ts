/**
 * Schema Validation Plugin Definition
 */

import ShieldCheckIcon from "@lucide/svelte/icons/shield-check";
import type { PluginDefinition } from "@core/state/plugin-registry";

export default {
  id: "schema-validation",
  title: "Schema Validation",
  order: 20,
  icon: ShieldCheckIcon,
  sidebar: () => import("./components/SidebarPane.svelte"),
  main: () => import("./components/DetailPane.svelte"),
  capabilities: ["schema:validation", "pyodide:execution"]
} satisfies PluginDefinition;