<script module lang="ts">
  import type { FileRequirement, UploadedFile } from '@config/types.js';
  import { formatFileSize } from '@utils/formatting.ts';
  import { select, clearOtherSelections } from '@core/state/workspace.svelte';
  import { registerSelectionResolver } from '@utils/breadcrumbs.ts';

  // Current active file requirements (can be updated dynamically)
  export const activeFileRequirements = $state<FileRequirement[]>([]);
  export const files = $state<Record<string, UploadedFile>>({});
  export const uploadStates = $state<Record<string, 'waiting'|'uploading'|'completed'|'error'>>({});

  export function getUploadedFiles() { return Object.values(files); }
  export function getCompletedUploads() { return getUploadedFiles().filter(f => f.status === 'completed'); }

  function isFileTypeAccepted(fileName: string, requirement: FileRequirement) {
    if (!requirement.acceptedTypes?.length) return true;
    const lower = fileName.toLowerCase();
    return requirement.acceptedTypes.some(t => lower.endsWith(t.toLowerCase()));
  }
  function generateUniqueId() { return Date.now().toString(36) + Math.random().toString(36).slice(2); }

  export async function loadFile(requirementId: string, file: File) {
    const requirement = activeFileRequirements.find(r => r.id === requirementId);
    if (!requirement) throw new Error(`File requirement ${requirementId} not found`);
    if (!isFileTypeAccepted(file.name, requirement)) throw new Error(`File type not accepted. Expected: ${requirement.acceptedTypes?.join(', ')}`);
    uploadStates[requirementId] = 'uploading';
    try {
      await new Promise(r => setTimeout(r,100));
      let finalFilename = file.name; let wasRenamed = false;
      if (file.name.toLowerCase() !== requirement.defaultFilename.toLowerCase()) { finalFilename = requirement.defaultFilename; wasRenamed = true; }
      const uploadedFile: UploadedFile = { id: generateUniqueId(), filename: finalFilename, originalName: file.name, size: formatFileSize(file.size), uploadedAt: new Date().toISOString(), status: 'completed', file, wasRenamed };
      files[requirementId] = uploadedFile; uploadStates[requirementId] = 'completed';
    } catch (e) { uploadStates[requirementId] = 'error'; console.error('File upload failed', e); throw e; }
  }
  export function removeFile(requirementId: string) { delete files[requirementId]; uploadStates[requirementId] = 'waiting'; }
  export function selectFile(requirementId: string | null) { clearOtherSelections('file'); select('file', requirementId); }
  export function getFile(id: string) { return files[id]; }
  export function getUploadState(id: string) { return uploadStates[id] ?? 'waiting'; }
  // Narrowed type helper for external consumers expecting a union
  export function getUploadStateStrict(id: string): 'waiting'|'uploading'|'completed'|'error' {
    return uploadStates[id] ?? 'waiting';
  }
  export async function loadFilesFromFolder(fileList: File[]) {
    const result = { total: fileList.length, matched: 0, errors: [] as {file:string;error:string}[]};
    for (const f of fileList) {
      const req = activeFileRequirements.find(r => f.name.toLowerCase() === r.defaultFilename.toLowerCase() || isFileTypeAccepted(f.name, r));
      if (req && !files[req.id]) { try { await loadFile(req.id, f); result.matched++; } catch (e) { result.errors.push({ file: f.name, error: e instanceof Error ? e.message : 'Unknown error' }); } }
    }
    return result;
  }

  // Configuration management functions
  export function clearFiles() {
    // Clear all uploaded files and reset states
    Object.keys(files).forEach(key => delete files[key]);
    Object.keys(uploadStates).forEach(key => delete uploadStates[key]);
    // Clear any file selections
    clearOtherSelections('file');
  }

  export function loadFileRequirements(newRequirements: FileRequirement[]) {
    // Store existing uploaded files to attempt re-mapping
    const existingFiles = { ...files };
    
    // Clear state but preserve file selections
    clearFiles();
    
    // Update active requirements
    activeFileRequirements.length = 0;
    activeFileRequirements.push(...newRequirements);
    
    // Initialize upload states and attempt to re-map existing files
    for (const req of newRequirements) {
      uploadStates[req.id] = 'waiting';
      
      // Try to re-map existing files by filename
      const matchingFile = Object.values(existingFiles).find(file => 
        file.filename.toLowerCase() === req.defaultFilename.toLowerCase() ||
        file.originalName.toLowerCase() === req.defaultFilename.toLowerCase()
      );
      
      if (matchingFile && isFileTypeAccepted(matchingFile.originalName, req)) {
        // Re-map the existing file to the new requirement
        files[req.id] = matchingFile;
        uploadStates[req.id] = 'completed';
        console.log(`Re-mapped file ${matchingFile.filename} to requirement ${req.id}`);
      }
    }
  }

  export function getActiveRequirements() {
    return activeFileRequirements;
  }

  // Register breadcrumb resolver for files
  registerSelectionResolver('file', {
    getDisplayName: (id: string) => {
      const uploadedFile = files[id];
      if (uploadedFile) {
        return uploadedFile.originalName;
      }
      // If no uploaded file, try to get requirement title
      const requirement = activeFileRequirements.find(r => r.id === id);
      return requirement ? requirement.title : null;
    },
    getStatus: (id: string) => {
      return getUploadStateStrict(id);
    }
  });
</script>
