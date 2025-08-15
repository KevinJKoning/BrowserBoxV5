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
		description: "Upload data file for Python script testing and data analysis. Supports CSV, Parquet, and GeoPackage formats.",
		defaultFilename: "random_data.parquet",
		required: true,
		acceptedTypes: [".parquet", ".csv", ".gpkg"],
		maxSize: 10,
	},
	{
		id: "identity",
		title: "Sample Dataset",
		description: "Sample dataset for testing and preview. Supports CSV, Parquet, and GeoPackage formats, plus documents and images.",
		defaultFilename: "sample_data.csv",
		required: true,
		acceptedTypes: [".pdf", ".jpg", ".jpeg", ".png", ".parquet", ".csv", ".gpkg"],
		maxSize: 5,
	},
	{
		id: "financial",
		title: "Financial Data",
		description: "Financial datasets for analysis and visualization. Supports CSV, Parquet formats, plus documents.",
		defaultFilename: "financial_data.parquet",
		required: true,
		acceptedTypes: [".pdf", ".parquet", ".csv"],
		maxSize: 8,
	},
	{
		id: "insurance",
		title: "Experimental Data",
		description: "Experimental or research data files. Supports CSV, Parquet, and GeoPackage formats, plus documents.",
		defaultFilename: "experiment_data.parquet",
		required: false,
		acceptedTypes: [".pdf", ".parquet", ".csv", ".gpkg"],
		maxSize: 5,
	},
	{
		id: "references",
		title: "Reference Data",
		description: "Reference datasets or documentation files. Supports CSV, Parquet, and GeoPackage formats, plus documents.",
		defaultFilename: "reference_data.parquet",
		required: false,
		acceptedTypes: [".pdf", ".doc", ".docx", ".parquet", ".csv", ".gpkg"],
		maxSize: 7,
	},
];
