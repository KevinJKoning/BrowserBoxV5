/**
 * Dependency Logic Utilities
 * Dependency graph, ordering, and checking logic
 */

// NOTE: We intentionally use the dynamic plugin stores instead of the static
// config module exports so that runtime-loaded configuration packages are
// reflected in dependency checking. The previous implementation imported
// the static config arrays which are never updated after initial load,
// causing newly loaded package entities to appear to have no dependencies
// (script/schema not found => "allMet: true") and thus incorrectly display
// a Ready status.
import { availableScripts } from "../../plugins/scripts/store.svelte";
import { availableSchemas } from "../../plugins/schema-validation/store.svelte";
import { activeFileRequirements, getUploadStateStrict } from "../../plugins/required-files/store.svelte";
import type { Script } from "@config/script-config.js";
import type { SchemaValidation } from "@config/schema-config.js";
import type { FileRequirement } from "@config/file-config.js";

// Interface for dependency information
export interface DependencyInfo {
  id: string;
  type: 'uploaded' | 'result';
  filename: string;
  title: string;
  description?: string;
  isAvailable: boolean;
}

// Interface for dependency status
export interface DependencyStatus {
  allMet: boolean;
  dependencies: DependencyInfo[];
}

/**
 * Check script dependencies
 */
export function checkScriptDependencies(scriptId: string): DependencyStatus {
  // Find the script in the dynamic store
  const script: Script | undefined = availableScripts.find(s => s.id === scriptId);
  if (!script) {
    // Unknown script; treat as having unmet dependencies to avoid false Ready state
    return { allMet: false, dependencies: [] };
  }
  if (!script.dependencies || script.dependencies.length === 0) {
    return { allMet: true, dependencies: [] };
  }

  const dependencies: DependencyInfo[] = [];

  for (const dependency of script.dependencies) {
    if (dependency.type === 'uploaded') {
      const requirement: FileRequirement | undefined = activeFileRequirements.find(r => r.id === dependency.sourceId);
      if (requirement) {
        const uploadState = getUploadStateStrict(requirement.id);
        dependencies.push({
          id: requirement.id,
          type: 'uploaded',
          filename: requirement.defaultFilename,
            title: requirement.title,
          description: requirement.description,
          isAvailable: uploadState === 'completed'
        });
      } else {
        // Requirement referenced but not present in current config
        dependencies.push({
          id: dependency.sourceId,
          type: 'uploaded',
          filename: dependency.sourceId,
          title: `Missing requirement: ${dependency.sourceId}`,
          isAvailable: false
        });
      }
    } else if (dependency.type === 'result') {
      // Future: integrate results plugin
      dependencies.push({
        id: dependency.sourceId,
        type: 'result',
        filename: dependency.sourceId,
        title: `Result: ${dependency.sourceId}`,
        isAvailable: false
      });
    }
  }

  const allMet = dependencies.every(dep => dep.isAvailable);
  return { allMet, dependencies };
}

/**
 * Check schema validation dependencies
 */
export function checkSchemaDependencies(schemaId: string): DependencyStatus {
  const schema: SchemaValidation | undefined = availableSchemas.find(s => s.id === schemaId);
  if (!schema) {
    return { allMet: false, dependencies: [] };
  }

  // New schema structure uses targetFileId directly
  if (!schema.targetFileId) {
    return { allMet: true, dependencies: [] };
  }

  const dependencies: DependencyInfo[] = [];

  // Check if the target file is available
  const requirement: FileRequirement | undefined = activeFileRequirements.find(r => r.id === schema.targetFileId);
  if (requirement) {
    const uploadState = getUploadStateStrict(requirement.id);
    dependencies.push({
      id: requirement.id,
      type: 'uploaded',
      filename: requirement.defaultFilename,
      title: requirement.title,
      description: requirement.description,
      isAvailable: uploadState === 'completed'
    });
  } else {
    // Target file requirement not found
    dependencies.push({
      id: schema.targetFileId,
      type: 'uploaded',
      filename: schema.targetFileId,
      title: `Missing file requirement: ${schema.targetFileId}`,
      isAvailable: false
    });
  }

  const allMet = dependencies.every(dep => dep.isAvailable);
  return { allMet, dependencies };
}