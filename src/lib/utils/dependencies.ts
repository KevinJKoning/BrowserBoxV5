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
import { getAllResults } from "../../plugins/results/store.svelte";
import type { Script, SchemaValidation, FileRequirement } from "@config/types.js";

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
 * Check script dependencies based on embedded file requirements
 */
export function checkScriptDependencies(scriptId: string): DependencyStatus {
  // Find the script in the dynamic store
  const script: Script | undefined = availableScripts.find(s => s.id === scriptId);
  if (!script) {
    // Unknown script; treat as having unmet dependencies to avoid false Ready state
    return { allMet: false, dependencies: [] };
  }
  if (!script.fileRequirements || script.fileRequirements.length === 0) {
    return { allMet: true, dependencies: [] };
  }

  const dependencies: DependencyInfo[] = [];

  for (const fileReq of script.fileRequirements) {
    if (fileReq.source === 'uploaded' || !fileReq.source) {
      // Handle uploaded files (default behavior)
      const uploadState = getUploadStateStrict(fileReq.filename);
      dependencies.push({
        id: fileReq.filename,
        type: 'uploaded',
        filename: fileReq.filename,
        title: fileReq.title,
        description: fileReq.description,
        isAvailable: uploadState === 'completed'
      });
    } else if (fileReq.source === 'script') {
      // Handle script-generated files
      // Check if the result file actually exists in the Results store
      const allResults = getAllResults();
      const resultFile = allResults.find(result => result.filename === fileReq.filename);
      const producingScript = availableScripts.find(s => s.id === fileReq.producedBy);
      
      dependencies.push({
        id: fileReq.filename,
        type: 'result',
        filename: fileReq.filename,
        title: fileReq.title,
        description: fileReq.description,
        isAvailable: resultFile !== undefined && producingScript !== undefined
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
  const requirement: FileRequirement | undefined = activeFileRequirements.find(r => r.filename === schema.targetFileId);
  if (requirement) {
    const uploadState = getUploadStateStrict(requirement.filename);
    dependencies.push({
      id: requirement.filename,
      type: 'uploaded',
      filename: requirement.filename,
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