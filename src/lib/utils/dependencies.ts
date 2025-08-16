/**
 * Dependency Logic Utilities
 * Dependency graph, ordering, and checking logic
 */

import { scripts } from "../config/script-config.js";
import { schemaValidations } from "../config/schema-config.js";
import { fileRequirements } from "../config/file-config.js";
import { getUploadStateStrict } from "../../plugins/required-files/store.svelte";

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
  const script = scripts.find(s => s.id === scriptId);
  if (!script || !script.dependencies || script.dependencies.length === 0) {
    return { allMet: true, dependencies: [] };
  }

  const dependencies: DependencyInfo[] = [];
  
  // Process each dependency in the array
  for (const dependency of script.dependencies) {
    if (dependency.type === 'uploaded') {
      const requirement = fileRequirements.find(r => r.id === dependency.sourceId);
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
      }
    } else if (dependency.type === 'result') {
      // TODO: Check results plugin store when available
      dependencies.push({
        id: dependency.sourceId,
        type: 'result',
        filename: dependency.sourceId,
        title: `Result: ${dependency.sourceId}`,
        isAvailable: false // Results plugin not implemented yet
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
  const schema = schemaValidations.find(s => s.id === schemaId);
  if (!schema || !schema.dependencies || schema.dependencies.length === 0) {
    return { allMet: true, dependencies: [] };
  }

  const dependencies: DependencyInfo[] = [];
  
  // Process each dependency in the array
  for (const dependency of schema.dependencies) {
    if (dependency.type === 'uploaded') {
      const requirement = fileRequirements.find(r => r.id === dependency.sourceId);
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
      }
    }
    // Note: Schema validations currently only support 'uploaded' dependencies
  }

  const allMet = dependencies.every(dep => dep.isAvailable);
  return { allMet, dependencies };
}