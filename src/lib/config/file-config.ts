// File upload configuration
export interface FileRequirement {
	id: string;
	title: string;
	description: string;
	defaultFilename: string;
	required: boolean;
	acceptedTypes?: string[];
	maxSize?: number; // in MB
}

export interface UploadedFile {
	id: string;
	filename: string;
	originalName: string;
	size: string;
	uploadedAt: string;
	status: "waiting" | "uploading" | "completed" | "error";
	file?: File; // Store the actual File object for preview
	wasRenamed?: boolean; // Flag to show if file was renamed to match expected name
}

// Sample configuration for required files
export const fileRequirements: FileRequirement[] = [
	{
		id: "random_data",
		title: "Random Data File",
		description: "Upload the random_data.parquet file for Python script testing and data analysis.",
		defaultFilename: "random_data.parquet",
		required: true,
		acceptedTypes: [".parquet"],
		maxSize: 10,
	},
	{
		id: "identity",
		title: "Sample Dataset",
		description: "Sample dataset for testing and preview. Supports parquet format for optimal performance.",
		defaultFilename: "sample_data.parquet",
		required: true,
		acceptedTypes: [".pdf", ".jpg", ".jpeg", ".png", ".parquet"],
		maxSize: 5,
	},
	{
		id: "financial",
		title: "Financial Data",
		description: "Financial datasets in parquet format for analysis and visualization.",
		defaultFilename: "financial_data.parquet",
		required: true,
		acceptedTypes: [".pdf", ".parquet"],
		maxSize: 8,
	},
	{
		id: "insurance",
		title: "Experimental Data",
		description: "Experimental or research data files. Parquet format recommended for large datasets.",
		defaultFilename: "experiment_data.parquet",
		required: false,
		acceptedTypes: [".pdf", ".parquet"],
		maxSize: 5,
	},
	{
		id: "references",
		title: "Reference Data",
		description: "Reference datasets or documentation files. Multiple formats supported including parquet.",
		defaultFilename: "reference_data.parquet",
		required: false,
		acceptedTypes: [".pdf", ".doc", ".docx", ".parquet"],
		maxSize: 7,
	},
];
