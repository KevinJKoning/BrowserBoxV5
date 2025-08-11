/**
 * Modern Svelte 5 Runes-based Results Store
 * Manages script output files and results state
 */

// Result file interface
export interface ResultFile {
	/** Unique identifier for the result file */
	id: string;
	/** Original filename */
	filename: string;
	/** File type/extension */
	fileType: string;
	/** File size in bytes */
	fileSize: number;
	/** File content (for small files) or file handle */
	content?: string | Uint8Array;
	/** Creation timestamp */
	createdAt: string;
	/** Script ID that generated this result */
	scriptId: string;
	/** Optional description/metadata */
	description?: string;
	/** Pyodide filesystem path where the file is stored */
	pyodidePath: string;
}

// Core state using Svelte 5 runes
export const resultsManagerState = $state({
	// All result files - object for reactivity
	resultFiles: {} as Record<string, ResultFile>,
	
	// UI state
	selectedResultId: null as string | null,
	
	// Track which files existed before script execution (to identify new ones)
	preExecutionFiles: new Set<string>(),
	
	// Processing state
	isScanning: false
});

// Export selectors as functions for specific use cases that need parameters
export const resultsSelectors = {
	// Parameterized selectors that can't be reactive  
	getResultFile: (id: string) => resultsManagerState.resultFiles[id],
	getResultsByScript: (scriptId: string) => 
		Object.values(resultsManagerState.resultFiles).filter(file => file.scriptId === scriptId),
	isResultSelected: (id: string) => resultsManagerState.selectedResultId === id,
	getResultsByType: (fileType: string) => 
		Object.values(resultsManagerState.resultFiles).filter(file => 
			file.fileType.toLowerCase() === fileType.toLowerCase()
		),
	
	// Computed selectors that don't need parameters should be accessed directly via state
	// Components should use: Object.values(resultsManagerState.resultFiles) instead of getAllResults()
	// Components should use: resultsManagerState.selectedResultId ? resultsManagerState.resultFiles[resultsManagerState.selectedResultId] : null instead of getSelectedResult()
	// Components should use: Object.keys(resultsManagerState.resultFiles).length instead of getResultsCount()
};

// Actions for managing results
export const resultsActions = {
	/**
	 * Select a result for preview
	 */
	selectResult: (resultId: string | null) => {
		resultsManagerState.selectedResultId = resultId;
	},
	
	/**
	 * Add a new result file
	 */
	addResult: (resultFile: Omit<ResultFile, 'id'>) => {
		const id = `result_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
		const newResult: ResultFile = {
			...resultFile,
			id
		};
		resultsManagerState.resultFiles[id] = newResult;
		return id;
	},
	
	/**
	 * Remove a result file
	 */
	removeResult: (resultId: string) => {
		delete resultsManagerState.resultFiles[resultId];
		if (resultsManagerState.selectedResultId === resultId) {
			resultsManagerState.selectedResultId = null;
		}
	},
	
	/**
	 * Clear all results
	 */
	clearAllResults: () => {
		resultsManagerState.resultFiles = {};
		resultsManagerState.selectedResultId = null;
	},
	
	/**
	 * Clear results for a specific script
	 */
	clearResultsForScript: (scriptId: string) => {
		const toDelete = Object.keys(resultsManagerState.resultFiles).filter(
			id => resultsManagerState.resultFiles[id].scriptId === scriptId
		);
		
		toDelete.forEach(id => {
			delete resultsManagerState.resultFiles[id];
			if (resultsManagerState.selectedResultId === id) {
				resultsManagerState.selectedResultId = null;
			}
		});
	},
	
	/**
	 * Set the baseline of files that existed before script execution
	 * This will be called before running a script to track what's new
	 */
	setPreExecutionBaseline: (filePaths: string[]) => {
		resultsManagerState.preExecutionFiles = new Set(filePaths);
	},
	
	/**
	 * Scan for new files created after script execution
	 * This should be called by the Pyodide integration after script completion
	 */
	scanForNewResults: async (currentFiles: string[], scriptId: string) => {
		resultsManagerState.isScanning = true;
		
		try {
			// Find files that didn't exist before execution
			const newFiles = currentFiles.filter(path => !resultsManagerState.preExecutionFiles.has(path));
			
			// Process each new file (this would be enhanced with actual Pyodide file reading)
			for (const filePath of newFiles) {
				const filename = filePath.split('/').pop() || filePath;
				const fileExtension = filename.split('.').pop()?.toLowerCase() || '';
				
				// Skip common Python/system files we don't want to show as results
				if (shouldSkipFile(filename, fileExtension)) {
					continue;
				}
				
				// Create result entry (file content would be read from Pyodide FS in real implementation)
				resultsActions.addResult({
					filename,
					fileType: fileExtension,
					fileSize: 0, // Would be determined from actual file
					createdAt: new Date().toISOString(),
					scriptId,
					pyodidePath: filePath,
					description: getFileDescription(fileExtension)
				});
			}
		} finally {
			resultsManagerState.isScanning = false;
		}
	}
};

// Helper function to determine if we should skip a file in results
function shouldSkipFile(filename: string, extension: string): boolean {
	// Skip Python cache files, temporary files, etc.
	const skipExtensions = ['pyc', 'pyo', '__pycache__', 'tmp', 'temp'];
	const skipPrefixes = ['__pycache__', '.', 'tmp', 'temp'];
	
	return skipExtensions.includes(extension) || 
		   skipPrefixes.some(prefix => filename.startsWith(prefix));
}

// Helper function to get a description based on file type
function getFileDescription(extension: string): string {
	switch (extension.toLowerCase()) {
		case 'html':
		case 'htm':
			return 'HTML report or visualization';
		case 'parquet':
		case 'pq':
			return 'Parquet data file';
		case 'csv':
			return 'CSV data file';
		case 'json':
			return 'JSON data file';
		case 'png':
		case 'jpg':
		case 'jpeg':
			return 'Image file';
		case 'pdf':
			return 'PDF document';
		default:
			return 'Generated file';
	}
}