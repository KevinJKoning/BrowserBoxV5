/**
 * Dependency Logic Utilities
 * Dependency graph, ordering, and checking logic
 */

import { scripts } from "../config/script-config.js";
import { schemaValidations } from "../config/schema-config.js";
import { fileRequirements } from "../config/file-config.js";

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
 * Note: This function needs to be updated to use plugin stores instead of legacy stores
 * TODO: Replace with plugin store integration when implementing runtime config loading
 */
export function checkScriptDependencies(scriptId: string): DependencyStatus {
  const script = scripts.find(s => s.id === scriptId);
  if (!script || !script.dependencies) {
    return { allMet: true, dependencies: [] };
  }

  const dependencies: DependencyInfo[] = [];
  
  // Check uploaded file dependencies
  if (script.dependencies.uploaded) {
    for (const uploadedDep of script.dependencies.uploaded) {
      const requirement = fileRequirements.find(r => r.id === uploadedDep);
      if (requirement) {
        dependencies.push({
          id: requirement.id,
          type: 'uploaded',
          filename: requirement.filename,
          title: requirement.title,
          description: requirement.description,
          isAvailable: false // TODO: Check actual plugin store state
        });
      }
    }
  }

  // Check result file dependencies
  if (script.dependencies.results) {
    for (const resultDep of script.dependencies.results) {
      dependencies.push({
        id: resultDep,
        type: 'result',
        filename: resultDep,
        title: `Result: ${resultDep}`,
        isAvailable: false // TODO: Check actual plugin store state
      });
    }
  }

  const allMet = dependencies.every(dep => dep.isAvailable);
  return { allMet, dependencies };
}

/**
 * Check schema validation dependencies
 * Note: This function needs to be updated to use plugin stores instead of legacy stores
 * TODO: Replace with plugin store integration when implementing runtime config loading
 */
export function checkSchemaDependencies(schemaId: string): DependencyStatus {
  const schema = schemaValidations.find(s => s.id === schemaId);
  if (!schema || !schema.dependencies) {
    return { allMet: true, dependencies: [] };
  }

  const dependencies: DependencyInfo[] = [];
  
  // Check uploaded file dependencies
  if (schema.dependencies.uploaded) {
    for (const uploadedDep of schema.dependencies.uploaded) {
      const requirement = fileRequirements.find(r => r.id === uploadedDep);
      if (requirement) {
        dependencies.push({
          id: requirement.id,
          type: 'uploaded',
          filename: requirement.filename,
          title: requirement.title,
          description: requirement.description,
          isAvailable: false // TODO: Check actual plugin store state
        });
      }
    }
  }

  // Check result file dependencies  
  if (schema.dependencies.results) {
    for (const resultDep of schema.dependencies.results) {
      dependencies.push({
        id: resultDep,
        type: 'result',
        filename: resultDep,
        title: `Result: ${resultDep}`,
        isAvailable: false // TODO: Check actual plugin store state
      });
    }
  }

  const allMet = dependencies.every(dep => dep.isAvailable);
  return { allMet, dependencies };
}