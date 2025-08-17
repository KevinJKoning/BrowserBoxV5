<script lang="ts">
  import { Button } from "@ui/button";
  import { Card, CardContent, CardHeader, CardTitle } from "@ui/card";
  import { Badge } from "@ui/badge";
  import { Separator } from "@ui/separator";
  import PlayIcon from "@lucide/svelte/icons/play";
  import LoaderIcon from "@lucide/svelte/icons/loader";
  import CheckCircleIcon from "@lucide/svelte/icons/check-circle";
  import AlertCircleIcon from "@lucide/svelte/icons/alert-circle";
  import CodeIcon from "@lucide/svelte/icons/code";
  import FileTextIcon from "@lucide/svelte/icons/file-text";
  import type { SchemaValidation, SchemaValidationExecution } from "@config/schema-config.js";

  interface Props {
    schema: SchemaValidation;
    execution?: SchemaValidationExecution | null;
    onValidate: () => void;
  }

  let { schema, execution, onValidate }: Props = $props();

  const isRunning = $derived(execution?.status === 'running');
  const isCompleted = $derived(execution?.status === 'completed');
  const hasError = $derived(execution?.status === 'error');

  function getStatusIcon() {
    if (isRunning) return LoaderIcon;
    if (isCompleted) return CheckCircleIcon;
    if (hasError) return AlertCircleIcon;
    return PlayIcon;
  }

  function getStatusColor() {
    if (isRunning) return "default";
    if (isCompleted) return "default";
    if (hasError) return "destructive";
    return "secondary";
  }

  function getStatusText() {
    if (isRunning) return "Running";
    if (isCompleted) return "Completed";
    if (hasError) return "Error";
    return "Ready";
  }
</script>

<div class="h-full min-h-0 overflow-auto">
  <div class="p-6 space-y-6">
    <!-- Header -->
    <div class="flex items-start justify-between">
      <div>
        <h1 class="text-2xl font-bold">{schema.title}</h1>
        <p class="text-muted-foreground mt-1">{schema.description}</p>
        <div class="flex items-center gap-2 mt-2">
          <Badge variant="outline">
            {schema.validationType === 'javascript' ? 'JavaScript' : 'Python'} Validation
          </Badge>
          {#if schema.category}
            <Badge variant="secondary">{schema.category}</Badge>
          {/if}
          <Badge variant={getStatusColor()}>
            {getStatusText()}
          </Badge>
        </div>
      </div>
      <Button onclick={onValidate} disabled={isRunning}>
        {#if isRunning}
          <LoaderIcon class="size-4 mr-2 animate-spin" />
          Running...
        {:else}
          {@const StatusIcon = getStatusIcon()}
          <StatusIcon class="size-4 mr-2" />
          Validate
        {/if}
      </Button>
    </div>

    <Separator />

    <!-- Validation Configuration -->
    <div class="space-y-4">
      <h2 class="text-xl font-semibold">Configuration</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle class="text-base">Target File</CardTitle>
          </CardHeader>
          <CardContent>
            <p class="text-sm text-muted-foreground">File ID: <code>{schema.targetFileId}</code></p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle class="text-base">Validation Type</CardTitle>
          </CardHeader>
          <CardContent>
            <div class="flex items-center gap-2">
              {#if schema.validationType === 'javascript'}
                <CodeIcon class="size-4" />
                <span class="text-sm">JavaScript (Client-side)</span>
              {:else}
                <FileTextIcon class="size-4" />
                <span class="text-sm">Python Script</span>
              {/if}
            </div>
          </CardContent>
        </Card>
      </div>

      <!-- JavaScript Validation Rules -->
      {#if schema.validationType === 'javascript'}
        <Card>
          <CardHeader>
            <CardTitle>Validation Rules</CardTitle>
          </CardHeader>
          <CardContent class="space-y-4">
            {#if schema.validationRules.requiredColumns?.length}
              <div>
                <h4 class="font-medium mb-2">Required Columns</h4>
                <div class="flex flex-wrap gap-1">
                  {#each schema.validationRules.requiredColumns as column}
                    <Badge variant="outline">{column}</Badge>
                  {/each}
                </div>
              </div>
            {/if}

            {#if schema.validationRules.columnTypes && Object.keys(schema.validationRules.columnTypes).length > 0}
              <div>
                <h4 class="font-medium mb-2">Column Types</h4>
                <div class="space-y-1">
                  {#each Object.entries(schema.validationRules.columnTypes) as [column, type]}
                    <div class="flex items-center gap-2 text-sm">
                      <code class="bg-muted px-1 py-0.5 rounded text-xs">{column}</code>
                      <span class="text-muted-foreground">→</span>
                      <Badge variant="secondary">{type}</Badge>
                    </div>
                  {/each}
                </div>
              </div>
            {/if}

            {#if schema.validationRules.constraints && Object.keys(schema.validationRules.constraints).length > 0}
              <div>
                <h4 class="font-medium mb-2">Constraints</h4>
                <div class="space-y-2">
                  {#each Object.entries(schema.validationRules.constraints) as [column, constraint]}
                    <div class="text-sm">
                      <code class="bg-muted px-1 py-0.5 rounded text-xs">{column}</code>
                      <ul class="list-disc list-inside mt-1 ml-4 text-muted-foreground">
                        {#if constraint.notNull}
                          <li>Cannot be null</li>
                        {/if}
                        {#if constraint.min !== undefined}
                          <li>Minimum: {constraint.min}</li>
                        {/if}
                        {#if constraint.max !== undefined}
                          <li>Maximum: {constraint.max}</li>
                        {/if}
                        {#if constraint.pattern}
                          <li>Pattern: <code class="text-xs">{constraint.pattern}</code></li>
                        {/if}
                        {#if constraint.allowedValues?.length}
                          <li>Allowed: {constraint.allowedValues.join(', ')}</li>
                        {/if}
                      </ul>
                    </div>
                  {/each}
                </div>
              </div>
            {/if}

            {#if schema.validationRules.rowCount}
              <div>
                <h4 class="font-medium mb-2">Row Count Constraints</h4>
                <div class="text-sm text-muted-foreground">
                  {#if schema.validationRules.rowCount.min !== undefined}
                    Minimum: {schema.validationRules.rowCount.min} rows<br>
                  {/if}
                  {#if schema.validationRules.rowCount.max !== undefined}
                    Maximum: {schema.validationRules.rowCount.max} rows
                  {/if}
                </div>
              </div>
            {/if}
          </CardContent>
        </Card>
      {:else}
        <!-- Python Validation Info -->
        <Card>
          <CardHeader>
            <CardTitle>Python Script</CardTitle>
          </CardHeader>
          <CardContent>
            <div class="space-y-2 text-sm">
              <p><span class="font-medium">Script:</span> <code>{schema.filename}</code></p>
              <p><span class="font-medium">Output:</span> <code>{schema.outputHtml}</code></p>
              <p class="text-muted-foreground">
                This validation runs a Python script that generates a detailed HTML report with comprehensive analysis.
              </p>
            </div>
          </CardContent>
        </Card>
      {/if}
    </div>

    <!-- Execution Results -->
    {#if execution}
      <Separator />
      <div class="space-y-4">
        <h2 class="text-xl font-semibold">Results</h2>
        
        <!-- Execution Info -->
        <Card>
          <CardHeader>
            <CardTitle class="text-base">Execution Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p class="font-medium">Status</p>
                <Badge variant={getStatusColor()}>{getStatusText()}</Badge>
              </div>
              {#if execution.executionTime}
                <div>
                  <p class="font-medium">Duration</p>
                  <p class="text-muted-foreground">{execution.executionTime}</p>
                </div>
              {/if}
              {#if execution.lastRun}
                <div>
                  <p class="font-medium">Last Run</p>
                  <p class="text-muted-foreground">{new Date(execution.lastRun).toLocaleString()}</p>
                </div>
              {/if}
            </div>
          </CardContent>
        </Card>

        <!-- JavaScript Results -->
        {#if execution.jsResult}
          <Card>
            <CardHeader>
              <CardTitle class="text-base">Validation Results</CardTitle>
            </CardHeader>
            <CardContent class="space-y-4">
              <!-- Summary -->
              <div class="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                <div>
                  <p class="font-medium">Total Rows</p>
                  <p class="text-muted-foreground">{execution.jsResult.summary.totalRows}</p>
                </div>
                <div>
                  <p class="font-medium">Total Columns</p>
                  <p class="text-muted-foreground">{execution.jsResult.summary.totalColumns}</p>
                </div>
                <div>
                  <p class="font-medium">Valid Rows</p>
                  <p class="text-muted-foreground">{execution.jsResult.summary.validRows}</p>
                </div>
                <div>
                  <p class="font-medium">Errors</p>
                  <p class="text-destructive">{execution.jsResult.summary.errorCount}</p>
                </div>
                <div>
                  <p class="font-medium">Warnings</p>
                  <p class="text-amber-600">{execution.jsResult.summary.warningCount}</p>
                </div>
              </div>

              <!-- Errors -->
              {#if execution.jsResult.errors.length > 0}
                <div>
                  <h4 class="font-medium mb-2 text-destructive">Errors ({execution.jsResult.errors.length})</h4>
                  <div class="space-y-2 max-h-48 overflow-y-auto">
                    {#each execution.jsResult.errors as error}
                      <div class="p-2 bg-destructive/10 border border-destructive/20 rounded text-sm">
                        <div class="flex items-start gap-2">
                          <AlertCircleIcon class="size-4 text-destructive mt-0.5 flex-shrink-0" />
                          <div>
                            <p class="font-medium">{error.message}</p>
                            {#if error.column || error.row}
                              <p class="text-muted-foreground text-xs">
                                {#if error.column}Column: {error.column}{/if}
                                {#if error.row} | Row: {error.row}{/if}
                                {#if error.constraint} | Rule: {error.constraint}{/if}
                              </p>
                            {/if}
                          </div>
                        </div>
                      </div>
                    {/each}
                  </div>
                </div>
              {/if}

              <!-- Success Message -->
              {#if execution.jsResult.success}
                <div class="p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded">
                  <div class="flex items-center gap-2">
                    <CheckCircleIcon class="size-5 text-green-600" />
                    <p class="font-medium text-green-800 dark:text-green-200">Validation Passed</p>
                  </div>
                  <p class="text-sm text-green-700 dark:text-green-300 mt-1">
                    All validation rules passed successfully.
                  </p>
                </div>
              {/if}
            </CardContent>
          </Card>
        {/if}

        <!-- Python Results -->
        {#if execution.htmlGenerated && execution.htmlPath}
          <Card>
            <CardHeader>
              <CardTitle class="text-base">HTML Report Generated</CardTitle>
            </CardHeader>
            <CardContent>
              <div class="space-y-4">
                <p class="text-sm text-muted-foreground">
                  Python validation completed successfully. HTML report: <code>{execution.htmlPath}</code>
                </p>
                <div class="p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded">
                  <p class="text-sm text-blue-700 dark:text-blue-300">
                    📄 The detailed validation report has been generated and can be viewed in the Results plugin.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        {/if}

        <!-- Error Display -->
        {#if execution.error}
          <Card>
            <CardHeader>
              <CardTitle class="text-base text-destructive">Execution Error</CardTitle>
            </CardHeader>
            <CardContent>
              <div class="p-3 bg-destructive/10 border border-destructive/20 rounded">
                <pre class="text-sm text-destructive whitespace-pre-wrap">{execution.error}</pre>
              </div>
            </CardContent>
          </Card>
        {/if}
      </div>
    {/if}

    <!-- Tags -->
    {#if schema.tags?.length}
      <Separator />
      <div>
        <h3 class="font-medium mb-2">Tags</h3>
        <div class="flex flex-wrap gap-1">
          {#each schema.tags as tag}
            <Badge variant="outline">{tag}</Badge>
          {/each}
        </div>
      </div>
    {/if}
  </div>
</div>