<script lang="ts">
  import SchemaPreview from "./SchemaPreview.svelte";
  import { getSelection } from "@core/state/workspace.svelte";
  import { getSchema, getExecution } from "../store.svelte";

  // Get selected schema
  const selectedSchemaId = $derived(getSelection('schema'));
  const selectedSchema = $derived(selectedSchemaId ? getSchema(selectedSchemaId) : null);
  const selectedExecution = $derived(selectedSchemaId ? getExecution(selectedSchemaId) : null);
</script>

{#if selectedSchema}
  <!-- Schema Preview Mode -->
  <div class="h-full min-h-0 overflow-hidden">
    <SchemaPreview 
      schema={selectedSchema}
      execution={selectedExecution}
    />
  </div>
{:else}
  <!-- No schema selected -->
  <div class="bg-muted/50 flex-1 rounded-xl overflow-auto">
    <div class="p-8">
      <h1 class="text-3xl font-bold mb-4">Schema Validation</h1>
      <p class="text-lg text-muted-foreground mb-6">
        Validate your data using two approaches: fast JavaScript validation for simple files or comprehensive Python validation for complex analysis.
        The sidebar shows available schema validations and their execution status.
      </p>
      <div class="space-y-4">
        <h2 class="text-xl font-semibold">Validation Types:</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border">
            <h3 class="font-medium text-green-900 dark:text-green-100 mb-2">
              JavaScript Validation
            </h3>
            <p class="text-sm text-green-700 dark:text-green-300">
              Fast client-side validation for CSV and JSON files. Checks column types, constraints, and data quality in real-time.
            </p>
          </div>
          <div class="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border">
            <h3 class="font-medium text-blue-900 dark:text-blue-100 mb-2">
              Python Validation
            </h3>
            <p class="text-sm text-blue-700 dark:text-blue-300">
              Advanced validation with statistical analysis, complex business rules, and detailed HTML reports for comprehensive data quality assessment.
            </p>
          </div>
        </div>
        <h2 class="text-xl font-semibold">Features:</h2>
        <ul class="list-disc list-inside space-y-2 text-muted-foreground">
          <li>Two-path validation: JavaScript for speed, Python for depth</li>
          <li>Real-time validation results with detailed error reporting</li>
          <li>Interactive HTML reports for Python validations</li>
          <li>Column-level constraint checking and type validation</li>
          <li>Business rule validation and compliance checking</li>
          <li>Schema search and filtering capabilities</li>
        </ul>
        <div class="mt-6 p-4 bg-amber-50 dark:bg-amber-950/20 rounded-lg border">
          <h3 class="font-medium text-amber-900 dark:text-amber-100 mb-2">
            Getting Started
          </h3>
          <p class="text-sm text-amber-700 dark:text-amber-300">
            Upload your data files first, then select a schema validation from the sidebar. JavaScript validations run instantly, while Python validations generate detailed HTML reports.
          </p>
        </div>
      </div>
    </div>
  </div>
{/if}