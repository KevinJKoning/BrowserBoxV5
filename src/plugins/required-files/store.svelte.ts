/**
 * Required Files Plugin Store
 * Manages file upload and selection state using Svelte 5 runes
 */

import { fileRequirements, type FileRequirement, type UploadedFile } from '../../lib/config/file-config.js';
import { formatFileSize } from '../../lib/utils.js';
import { select, clearOtherSelections } from '../../core/state/workspace.svelte.js';

// Plugin state using Svelte 5 runes
export const files = $state<Record<string, UploadedFile>>({});
export const uploadStates = $state<Record<string, "waiting" | "uploading" | "completed" | "error">>(
  Object.fromEntries(fileRequirements.map(req => [req.id, "waiting" as const]))
);

// Derived state
export function getUploadedFiles(): UploadedFile[] {
  return Object.values(files);
}

export function getCompletedUploads(): UploadedFile[] {
  return getUploadedFiles().filter(f => f.status === 'completed');
}

// Helper functions
function isFileTypeAccepted(fileName: string, requirement: FileRequirement): boolean {
  if (!requirement.acceptedTypes || requirement.acceptedTypes.length === 0) {
    return true;
  }
  
  const lowerFileName = fileName.toLowerCase();
  return requirement.acceptedTypes.some(type => lowerFileName.endsWith(type.toLowerCase()));
}

function generateUniqueId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Actions
export async function loadFile(requirementId: string, file: File): Promise<void> {
  const requirement = fileRequirements.find(req => req.id === requirementId);
  if (!requirement) {
    throw new Error(`File requirement ${requirementId} not found`);
  }

  // Validate file type
  if (!isFileTypeAccepted(file.name, requirement)) {
    throw new Error(`File type not accepted. Expected: ${requirement.acceptedTypes?.join(', ')}`);
  }

  // Set uploading state
  uploadStates[requirementId] = "uploading";

  try {
    // Simulate upload processing
    await new Promise(resolve => setTimeout(resolve, 100));

    // Determine filename (rename if needed)
    let finalFilename = file.name;
    let wasRenamed = false;
    
    if (file.name.toLowerCase() !== requirement.defaultFilename.toLowerCase()) {
      finalFilename = requirement.defaultFilename;
      wasRenamed = true;
    }

    const uploadedFile: UploadedFile = {
      id: generateUniqueId(),
      filename: finalFilename,
      originalName: file.name,
      size: formatFileSize(file.size),
      uploadedAt: new Date().toISOString(),
      status: "completed",
      file: file,
      wasRenamed
    };

    files[requirementId] = uploadedFile;
    uploadStates[requirementId] = "completed";
  } catch (error) {
    uploadStates[requirementId] = "error";
    console.error('File upload failed:', error);
    throw error;
  }
}

export function removeFile(requirementId: string): void {
  delete files[requirementId];
  uploadStates[requirementId] = "waiting";
}

export function selectFile(requirementId: string | null): void {
  clearOtherSelections('file');
  select('file', requirementId);
}

export function getFile(requirementId: string): UploadedFile | undefined {
  return files[requirementId];
}

export function getUploadState(requirementId: string): "waiting" | "uploading" | "completed" | "error" {
  return uploadStates[requirementId] ?? "waiting";
}

// Bulk operations
export async function loadFilesFromFolder(fileList: File[]): Promise<{
  total: number;
  matched: number;
  errors: Array<{ file: string; error: string }>;
}> {
  const result = {
    total: fileList.length,
    matched: 0,
    errors: [] as Array<{ file: string; error: string }>
  };

  for (const file of fileList) {
    // Find matching requirement by filename
    const requirement = fileRequirements.find(req => 
      file.name.toLowerCase() === req.defaultFilename.toLowerCase() ||
      isFileTypeAccepted(file.name, req)
    );

    if (requirement && !files[requirement.id]) {
      try {
        await loadFile(requirement.id, file);
        result.matched++;
      } catch (error) {
        result.errors.push({
          file: file.name,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }
  }

  return result;
}