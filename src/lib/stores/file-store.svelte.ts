/**
 * Modern Svelte 5 Runes-based File Store
 * Single source of truth with reactive state management
 */

import { fileRequirements, type FileRequirement, type UploadedFile } from '../config/file-config.js';
import { formatFileSize } from '../utils.js';

// Core state using Svelte 5 runes - using objects instead of Maps for reactivity
export const fileManagerState = $state({
	// Primary data store - object instead of Map for reactivity
	files: {} as Record<string, UploadedFile>,
	
	// UI state
	selectedFileId: null as string | null,
	
	// Upload states - object instead of Map for reactivity
	uploadStates: Object.fromEntries(
		fileRequirements.map(req => [req.id, "waiting" as const])
	) as Record<string, "waiting" | "uploading" | "completed" | "error">
});

// Function-based selectors for dynamic access - these work correctly
const getFile = (id: string) => fileManagerState.files[id];
const getUploadState = (id: string) => fileManagerState.uploadStates[id] ?? "waiting";
const isFileSelected = (id: string) => fileManagerState.selectedFileId === id;

// Helper function to validate file type against requirement
const isFileTypeAccepted = (fileName: string, requirement: FileRequirement): boolean => {
	if (!requirement.acceptedTypes || requirement.acceptedTypes.length === 0) {
		return true; // No restrictions
	}
	
	const lowerFileName = fileName.toLowerCase();
	return requirement.acceptedTypes.some(type => lowerFileName.endsWith(type.toLowerCase()));
};

// Helper function to get file extension
const getFileExtension = (fileName: string): string => {
	const lastDot = fileName.lastIndexOf('.');
	return lastDot > 0 ? fileName.substring(lastDot).toLowerCase() : '';
};

// Export only function-based selectors to avoid reactivity warnings
// Complex selectors should be defined in components using $derived.by()
export const fileSelectors = {
	getFile,
	getUploadState,
	isFileSelected,
};

// Actions using proper reactivity
export const fileActions = {
	// Select file for preview
	selectFile(fileId: string | null) {
		const file = fileId ? fileManagerState.files[fileId] : null;
		if (fileId && !file) {
			console.warn(`Attempted to select non-existent file: ${fileId}`);
			return;
		}
		fileManagerState.selectedFileId = fileId;
	},
	
	// Start upload process
	startUpload(fileId: string) {
		if (!fileRequirements.find(req => req.id === fileId)) {
			console.error(`Invalid file ID: ${fileId}`);
			return;
		}
		fileManagerState.uploadStates[fileId] = "uploading";
	},
	
	// Complete upload with automatic state synchronization
	completeUpload(fileId: string, fileData: Omit<UploadedFile, 'id' | 'status'>) {
		const uploadedFile: UploadedFile = {
			...fileData,
			id: fileId,
			status: "completed"
		};
		
		// Update primary data using reactive object assignment
		fileManagerState.files[fileId] = uploadedFile;
		fileManagerState.uploadStates[fileId] = "completed";
		
		// Don't auto-select - let user manually click to select and preview
	},
	
	// Handle upload error
	errorUpload(fileId: string) {
		fileManagerState.uploadStates[fileId] = "error";
		
		// Clear selection if the failed file was selected
		if (fileManagerState.selectedFileId === fileId) {
			fileManagerState.selectedFileId = null;
		}
	},
	
	// Remove file
	removeFile(fileId: string) {
		delete fileManagerState.files[fileId];
		fileManagerState.uploadStates[fileId] = "waiting";
		
		// Clear selection if removed file was selected
		if (fileManagerState.selectedFileId === fileId) {
			fileManagerState.selectedFileId = null;
		}
	},
	
	// Load file for local preview (no server upload needed)
	async loadFile(fileId: string, file: File): Promise<void> {
		fileActions.startUpload(fileId);
		
		try {
			// Get the file requirement for validation
			const requirement = fileRequirements.find(req => req.id === fileId);
			if (!requirement) {
				throw new Error(`Invalid file ID: ${fileId}`);
			}
			
			// Validate file type against accepted types
			if (!isFileTypeAccepted(file.name, requirement)) {
				const acceptedTypes = requirement.acceptedTypes || [];
				throw new Error(`File type not supported. Please select one of: ${acceptedTypes.join(', ')}`);
			}
			
			// Get the expected filename for this file requirement
			const expectedFilename = requirement.defaultFilename || file.name;
			
			// Check if file needs to be renamed
			const wasRenamed = file.name !== expectedFilename;
			
			// Complete the file loading immediately
			fileActions.completeUpload(fileId, {
				filename: expectedFilename, // Use expected filename for scripts
				originalName: file.name,    // Keep original for display
				size: formatFileSize(file.size),
				uploadedAt: new Date().toLocaleString(),
				file: file,
				wasRenamed: wasRenamed
			});
		} catch (error) {
			fileActions.errorUpload(fileId);
			throw error;
		}
	},

	// Load multiple files from a folder
	async loadFilesFromFolder(files: File[]): Promise<{ matched: number; total: number; errors: string[] }> {
		const errors: string[] = [];
		let matchedCount = 0;
		
		// Create a map of expected filenames to file requirements
		const filenameToRequirement = new Map<string, string>();
		fileRequirements.forEach(req => {
			filenameToRequirement.set(req.defaultFilename.toLowerCase(), req.id);
		});
		
		// Filter to only supported data files (csv, parquet, gpkg)
		const supportedExtensions = ['.csv', '.parquet', '.gpkg'];
		const dataFiles = files.filter(file => {
			const extension = getFileExtension(file.name);
			return supportedExtensions.includes(extension);
		});
		
		// Try to match each data file to a requirement
		for (const file of dataFiles) {
			const lowerFilename = file.name.toLowerCase();
			const requirementId = filenameToRequirement.get(lowerFilename);
			
			if (requirementId) {
				try {
					await fileActions.loadFile(requirementId, file);
					matchedCount++;
				} catch (error) {
					errors.push(`Failed to load ${file.name}: ${error}`);
				}
			} else {
				// Try to match by file type to any requirement that accepts this type
				const extension = getFileExtension(file.name);
				const compatibleRequirement = fileRequirements.find(req => 
					req.acceptedTypes?.some(type => type.toLowerCase() === extension)
				);
				
				if (compatibleRequirement) {
					try {
						await fileActions.loadFile(compatibleRequirement.id, file);
						matchedCount++;
					} catch (error) {
						errors.push(`Failed to load ${file.name}: ${error}`);
					}
				}
			}
		}
		
		return {
			matched: matchedCount,
			total: dataFiles.length,
			errors
		};
	}
};


// Export for backward compatibility during migration
export const legacyFileStore = {
	startUpload: fileActions.startUpload,
	completeUpload: fileActions.completeUpload,
	errorUpload: fileActions.errorUpload,
	removeFile: fileActions.removeFile,
	loadFile: fileActions.loadFile,
	loadFilesFromFolder: fileActions.loadFilesFromFolder
};
