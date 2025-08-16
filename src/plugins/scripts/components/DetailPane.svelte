<script lang="ts">
  import ScriptPreview from "./ScriptPreview.svelte";
  import { getSelection } from "../../../core/state/workspace.svelte";
  import { getScript, getExecution, startExecution } from "../store.svelte";

  // Get selected script
  const selectedScriptId = $derived(getSelection('script'));
  const selectedScript = $derived(selectedScriptId ? getScript(selectedScriptId) : null);
  const selectedExecution = $derived(selectedScriptId ? getExecution(selectedScriptId) : null);
</script>

{#if selectedScript}
  <!-- Script Preview Mode -->
  <div class="h-full min-h-0 overflow-hidden">
    <ScriptPreview 
      scriptId={selectedScript.id}
      scriptContent={selectedScript.content}
      filename={selectedScript.filename}
      status={selectedExecution?.status}
      metrics={selectedExecution?.metrics}
      output={selectedExecution?.output}
      error={selectedExecution?.error}
      onRun={() => {
        if (selectedScript) {
          startExecution(selectedScript.id);
        }
      }}
    />
  </div>
{:else}
  <!-- No script selected -->
  <div class="bg-muted/50 flex-1 rounded-xl overflow-auto">
    <div class="p-8">
      <h1 class="text-3xl font-bold mb-4">Python Scripts</h1>
      <p class="text-lg text-muted-foreground mb-6">
        Execute Python scripts with Pyodide for data analysis and processing.
        The sidebar shows available scripts and their execution status.
      </p>
      <div class="space-y-4">
        <h2 class="text-xl font-semibold">Features:</h2>
        <ul class="list-disc list-inside space-y-2 text-muted-foreground">
          <li>Python script execution with full scientific stack</li>
          <li>Real-time execution status and output monitoring</li>
          <li>Automatic file generation and result capture</li>
          <li>Script search and filtering capabilities</li>
          <li>Batch execution of multiple scripts</li>
          <li>Detailed error reporting and debugging</li>
        </ul>
        <div class="mt-6 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border">
          <h3 class="font-medium text-blue-900 dark:text-blue-100 mb-2">
            Getting Started
          </h3>
          <p class="text-sm text-blue-700 dark:text-blue-300">
            Click "Run All" to execute all available scripts in sequence, or select individual scripts 
            to run specific analyses. Click on any script to view its code and execution results.
          </p>
        </div>
      </div>
    </div>
  </div>
{/if}