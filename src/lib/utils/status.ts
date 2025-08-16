/**
 * Status Utilities
 * Status helpers, color mapping, and status configurations
 */

import CheckCircleIcon from "@lucide/svelte/icons/check-circle";
import CodeIcon from "@lucide/svelte/icons/code";
import PlayIcon from "@lucide/svelte/icons/play";
import ShieldCheckIcon from "@lucide/svelte/icons/shield-check";
import XCircleIcon from "@lucide/svelte/icons/x-circle";
import AlertTriangleIcon from "@lucide/svelte/icons/alert-triangle";
import ClockIcon from "@lucide/svelte/icons/clock";

export type ValidationStatus = "pass" | "fail" | "warning";

/**
 * Get validation status icon component
 */
export function getValidationStatusIcon(status: ValidationStatus) {
  switch (status) {
    case "pass":
      return CheckCircleIcon;
    case "fail":
      return XCircleIcon;
    case "warning":
      return AlertTriangleIcon;
    default:
      return ClockIcon;
  }
}

/**
 * Get validation status CSS classes
 */
export function getValidationStatusClass(status: ValidationStatus): string {
  switch (status) {
    case "pass":
      return "text-green-600 bg-green-50 border-green-200";
    case "fail":
      return "text-red-600 bg-red-50 border-red-200";
    case "warning":
      return "text-yellow-600 bg-yellow-50 border-yellow-200";
    default:
      return "text-gray-600 bg-gray-50 border-gray-200";
  }
}

/**
 * Script status configuration
 */
export const scriptStatusConfig = {
  waiting: {
    badge: { variant: "secondary" as const, text: "Waiting" },
    icon: ClockIcon,
    iconClass: "text-yellow-600",
    cardClass: "border-yellow-200 bg-yellow-50/50",
    label: "Waiting",
    description: "Missing dependencies",
    class: "text-yellow-600 bg-yellow-50 border-yellow-200",
    bgClass: "bg-yellow-50",
    textClass: "text-yellow-700",
    borderClass: "border-yellow-200"
  },
  ready: {
    badge: { variant: "outline" as const, text: "Ready" },
    icon: CodeIcon,
    iconClass: "text-blue-600",
    cardClass: "border-blue-200 bg-blue-50/50",
    label: "Ready",
    description: "All dependencies met",
    class: "text-blue-600 bg-blue-50 border-blue-200",
    bgClass: "bg-blue-50",
    textClass: "text-blue-700",
    borderClass: "border-blue-200"
  },
  running: {
    badge: { variant: "secondary" as const, text: "Running..." },
    icon: PlayIcon,
    iconClass: "text-orange-600",
    cardClass: "border-orange-200 bg-orange-50/50",
    label: "Running",
    description: "Script is executing",
    class: "text-orange-600 bg-orange-50 border-orange-200",
    bgClass: "bg-orange-50",
    textClass: "text-orange-700",
    borderClass: "border-orange-200"
  },
  completed: {
    badge: { variant: "default" as const, text: "Completed" },
    icon: CheckCircleIcon,
    iconClass: "text-green-600",
    cardClass: "border-green-200 bg-green-50/50",
    label: "Completed",
    description: "Execution finished successfully",
    class: "text-green-600 bg-green-50 border-green-200",
    bgClass: "bg-green-50",
    textClass: "text-green-700",
    borderClass: "border-green-200"
  },
  error: {
    badge: { variant: "destructive" as const, text: "Error" },
    icon: XCircleIcon,
    iconClass: "text-red-600",
    cardClass: "border-red-200 bg-red-50/50",
    label: "Error",
    description: "Execution failed",
    class: "text-red-600 bg-red-50 border-red-200",
    bgClass: "bg-red-50",
    textClass: "text-red-700",
    borderClass: "border-red-200"
  }
};

/**
 * Schema validation status configuration
 */
export const schemaStatusConfig = {
  waiting: {
    badge: { variant: "secondary" as const, text: "Waiting" },
    icon: ClockIcon,
    iconClass: "text-yellow-600",
    cardClass: "border-yellow-200 bg-yellow-50/50",
    label: "Waiting",
    description: "Missing dependencies",
    class: "text-yellow-600 bg-yellow-50 border-yellow-200",
    bgClass: "bg-yellow-50",
    textClass: "text-yellow-700",
    borderClass: "border-yellow-200"
  },
  ready: {
    badge: { variant: "outline" as const, text: "Ready" },
    icon: ShieldCheckIcon,
    iconClass: "text-blue-600",
    cardClass: "border-blue-200 bg-blue-50/50",
    label: "Ready",
    description: "All dependencies met",
    class: "text-blue-600 bg-blue-50 border-blue-200",
    bgClass: "bg-blue-50",
    textClass: "text-blue-700",
    borderClass: "border-blue-200"
  },
  running: {
    badge: { variant: "secondary" as const, text: "Validating..." },
    icon: PlayIcon,
    iconClass: "text-orange-600",
    cardClass: "border-orange-200 bg-orange-50/50",
    label: "Running",
    description: "Validation in progress",
    class: "text-orange-600 bg-orange-50 border-orange-200",
    bgClass: "bg-orange-50",
    textClass: "text-orange-700",
    borderClass: "border-orange-200"
  },
  completed: {
    badge: { variant: "default" as const, text: "Completed" },
    icon: CheckCircleIcon,
    iconClass: "text-green-600",
    cardClass: "border-green-200 bg-green-50/50",
    label: "Completed",
    description: "Validation finished successfully",
    class: "text-green-600 bg-green-50 border-green-200",
    bgClass: "bg-green-50",
    textClass: "text-green-700",
    borderClass: "border-green-200"
  },
  error: {
    badge: { variant: "destructive" as const, text: "Error" },
    icon: XCircleIcon,
    iconClass: "text-red-600",
    cardClass: "border-red-200 bg-red-50/50",
    label: "Error",
    description: "Validation failed",
    class: "text-red-600 bg-red-50 border-red-200",
    bgClass: "bg-red-50",
    textClass: "text-red-700",
    borderClass: "border-red-200"
  }
};

/**
 * Preview status configuration
 */
export const previewStatusConfig = {
  ready: {
    bgClass: "bg-blue-50",
    textClass: "text-blue-700",
    borderClass: "border-blue-200"
  }
};

/**
 * Get script card status based on dependencies and execution state
 */
export function getScriptCardStatus(
  scriptId: string, 
  executionStatus: "ready" | "running" | "completed" | "error",
  dependenciesMet: boolean = true
): "waiting" | "ready" | "running" | "completed" | "error" {
  // If there's an execution status other than ready, use it
  if (executionStatus !== "ready") {
    return executionStatus;
  }
  
  // If dependencies aren't met, status is waiting
  if (!dependenciesMet) {
    return "waiting";
  }
  
  // Otherwise, ready to run
  return "ready";
}

/**
 * Get schema card status based on dependencies and execution state
 */
export function getSchemaCardStatus(
  schemaId: string, 
  executionStatus: "ready" | "running" | "completed" | "error",
  dependenciesMet: boolean = true
): "waiting" | "ready" | "running" | "completed" | "error" {
  // If there's an execution status other than ready, use it
  if (executionStatus !== "ready") {
    return executionStatus;
  }
  
  // If dependencies aren't met, status is waiting
  if (!dependenciesMet) {
    return "waiting";
  }
  
  // Otherwise, ready to run
  return "ready";
}

// Pyodide status types and utilities
export type PyodideInitializationStatus = 
  | "initializing" 
  | "loading-packages" 
  | "ready" 
  | "error";

/**
 * Get user-friendly message for Pyodide initialization status
 */
export function getPyodideInitializationMessage(status: PyodideInitializationStatus): string {
  switch (status) {
    case "initializing":
      return "Initializing Python environment...";
    case "loading-packages":
      return "Loading Python packages...";
    case "ready":
      return "Python environment ready";
    case "error":
      return "Failed to initialize Python environment";
    default:
      return "Unknown status";
  }
}