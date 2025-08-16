<script lang="ts">
  import SchemaPreview from "./SchemaPreview.svelte";
  import { getSelection } from "../../../core/state/workspace.svelte";
  import { getSchema, getExecution, getValidationResults, startExecution } from "../store.svelte";

  // Get selected schema
  const selectedSchemaId = $derived(getSelection('schema'));
  const selectedSchema = $derived(selectedSchemaId ? getSchema(selectedSchemaId) : null);
  const selectedExecution = $derived(selectedSchemaId ? getExecution(selectedSchemaId) : null);
</script>

{#if selectedSchema}
  <!-- Schema Preview Mode -->
  <div class="h-full min-h-0 overflow-hidden">
    <SchemaPreview 
      schemaId={selectedSchema.id}
      expectations={selectedSchema.expectations}
      filename={selectedSchema.filename}
      status={selectedExecution?.status}
      metrics={selectedExecution?.metrics}
      output={selectedExecution?.output}
      validationResults={selectedExecution?.results}
      error={selectedExecution?.error}
      onValidate={() => {
        if (selectedSchema) {
          startExecution(selectedSchema.id);
        }
      }}
    />
  </div>
{:else}
  <!-- No schema selected -->
  <div class="bg-muted/50 flex-1 rounded-xl overflow-auto">
    <div class="p-8">
      <h1 class="text-3xl font-bold mb-4">Schema Validation</h1>
      <p class="text-lg text-muted-foreground mb-6">
        Validate your data against predefined schemas with comprehensive reporting.
        The sidebar shows available schema validations and their execution status.
      </p>
      <div class="space-y-4">
        <h2 class="text-xl font-semibold">Features:</h2>
        <ul class="list-disc list-inside space-y-2 text-muted-foreground">
          <li>Automated schema validation with Python scripts</li>
          <li>Comprehensive validation reporting and metrics</li>
          <li>Real-time execution status and progress tracking</li>
          <li>Detailed error reporting and debugging information</li>
          <li>Batch validation of multiple schemas</li>
          <li>Schema search and filtering capabilities</li>
        </ul>
        <div class="mt-6 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border">
          <h3 class="font-medium text-blue-900 dark:text-blue-100 mb-2">
            Getting Started
          </h3>
          <p class="text-sm text-blue-700 dark:text-blue-300">
            Click "Validate All" to run all available schema validations, or select individual schemas 
            to run specific validations. Click on any schema to view detailed validation results and metrics.
          </p>
        </div>
      </div>
    </div>
  </div>
{/if}