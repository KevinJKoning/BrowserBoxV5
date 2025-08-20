<script module lang="ts">
  import type { FileRequirement, UploadedFile } from '@config/types.js';
  import { formatFileSize } from '@utils/formatting.ts';
  import { select, clearOtherSelections } from '@core/state/workspace.svelte';
  import { registerSelectionResolver } from '@utils/breadcrumbs.ts';

  // Current active file requirements (can be updated dynamically)
  export const activeFileRequirements = $state<FileRequirement[]>([]);
  // Files now keyed by filename instead of requirement ID
  export const files = $state<Record<string, UploadedFile>>({});
  export const uploadStates = $state<Record<string, 'waiting'|'uploading'|'completed'|'error'>>({});

  export function getUploadedFiles() { return Object.values(files); }
  export function getCompletedUploads() { return getUploadedFiles().filter(f => f.status === 'completed'); }

  function isFileTypeAccepted(fileName: string, requirement: FileRequirement) {
    const lower = fileName.toLowerCase();
    return lower.endsWith(requirement.fileType.toLowerCase());
  }
  function generateUniqueId() { return Date.now().toString(36) + Math.random().toString(36).slice(2); }

  export async function loadFile(filename: string, file: File) {
    const requirement = activeFileRequirements.find(r => r.filename === filename);
    if (!requirement) throw new Error(`File requirement ${filename} not found`);
    if (!isFileTypeAccepted(file.name, requirement)) throw new Error(`File type not accepted. Expected: ${requirement.fileType}`);
    uploadStates[filename] = 'uploading';
    try {
      await new Promise(r => setTimeout(r,100));
      let finalFilename = file.name; let wasRenamed = false;
      if (file.name.toLowerCase() !== requirement.filename.toLowerCase()) { finalFilename = requirement.filename; wasRenamed = true; }
      const uploadedFile: UploadedFile = { id: generateUniqueId(), filename: finalFilename, originalName: file.name, size: formatFileSize(file.size), uploadedAt: new Date().toISOString(), status: 'completed', file, wasRenamed };
      files[filename] = uploadedFile; uploadStates[filename] = 'completed';
    } catch (e) { uploadStates[filename] = 'error'; console.error('File upload failed', e); throw e; }
  }
  export function removeFile(filename: string) { delete files[filename]; uploadStates[filename] = 'waiting'; }
  export function selectFile(filename: string | null) { clearOtherSelections('file'); select('file', filename); }
  export function getFile(filename: string) { return files[filename]; }
  export function getUploadState(filename: string) { return uploadStates[filename] ?? 'waiting'; }
  // Narrowed type helper for external consumers expecting a union
  export function getUploadStateStrict(filename: string): 'waiting'|'uploading'|'completed'|'error' {
    return uploadStates[filename] ?? 'waiting';
  }
  export async function loadFilesFromFolder(fileList: File[]) {
    const result = { total: fileList.length, matched: 0, errors: [] as {file:string;error:string}[]};
    for (const f of fileList) {
      const req = activeFileRequirements.find(r => f.name.toLowerCase() === r.filename.toLowerCase());
      if (req && !files[req.filename]) { try { await loadFile(req.filename, f); result.matched++; } catch (e) { result.errors.push({ file: f.name, error: e instanceof Error ? e.message : 'Unknown error' }); } }
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
      uploadStates[req.filename] = 'waiting';
      
      // Try to re-map existing files by filename
      const matchingFile = Object.values(existingFiles).find(file => 
        file.filename.toLowerCase() === req.filename.toLowerCase() ||
        file.originalName.toLowerCase() === req.filename.toLowerCase()
      );
      
      if (matchingFile && isFileTypeAccepted(matchingFile.originalName, req)) {
        // Re-map the existing file to the new requirement
        files[req.filename] = matchingFile;
        uploadStates[req.filename] = 'completed';
        console.log(`Re-mapped file ${matchingFile.filename} to requirement ${req.filename}`);
      }
    }
  }

  export function getActiveRequirements() {
    return activeFileRequirements;
  }

  // Register breadcrumb resolver for files
  registerSelectionResolver('file', {
    getDisplayName: (filename: string) => {
      const uploadedFile = files[filename];
      if (uploadedFile) {
        return uploadedFile.originalName;
      }
      // If no uploaded file, try to get requirement title
      const requirement = activeFileRequirements.find(r => r.filename === filename);
      return requirement ? requirement.title : null;
    },
    getStatus: (filename: string) => {
      return getUploadStateStrict(filename);
    }
  });
</script>
