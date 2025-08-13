// Test script that demonstrates improved error reporting
import type { Script } from '../script-config.js';

export const errorTestScript: Script = {
	id: 'error-test',
	title: 'Error Reporting Test',
	description: 'Test script that produces output and then encounters an error to verify improved error reporting in Live Output.',
	filename: 'error_test.py',
	content: `# Error Reporting Test Script
print("Starting error test script...")
print("This output should be visible even when an error occurs.")

# Some normal Python operations
import pandas as pd
import numpy as np

print("Successfully imported libraries.")
print("Creating some test data...")

# Create some test data
data = {"numbers": [1, 2, 3, 4, 5], "letters": ["a", "b", "c", "d", "e"]}
df = pd.DataFrame(data)
print("Test DataFrame created:")
print(df)

print("About to cause an intentional error...")

# This will cause a NameError - intentional for testing
print(undefined_variable)  # This variable doesn't exist
`,
	category: 'testing'
};