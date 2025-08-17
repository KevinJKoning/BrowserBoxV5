<script lang="ts">
  import { Button } from "../../../lib/components/ui/button/index.js";
  import * as Sidebar from "../../../lib/components/ui/sidebar/index.js";
  import SchemaCard from "./SchemaCard.svelte";
  import ShieldCheckIcon from "@lucide/svelte/icons/shield-check";
  import XIcon from "@lucide/svelte/icons/x";
  import { 
    availableSchemas, 
    startExecution, 
    selectSchema, 
    getExecution, 
    getExecutionStatus, 
    isSchemaSelected 
  } from "../store.svelte";

  let searchQuery = $state("");

  // Filter schemas based on search
  const filteredSchemas = $derived.by(() => {
    let schemas = availableSchemas;
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      schemas = schemas.filter(schema => 
        schema.title.toLowerCase().includes(query) ||
        schema.description.toLowerCase().includes(query) ||
        (schema.validationType === 'python' && schema.filename.toLowerCase().includes(query)) ||
        (schema.category && schema.category.toLowerCase().includes(query)) ||
        (schema.tags && schema.tags.some(tag => tag.toLowerCase().includes(query)))
      );
    }
    
    return schemas;
  });

  async function handleValidateAll() {
    const schemasToValidate = filteredSchemas.filter(schema => 
      getExecutionStatus(schema.id) !== "running"
    );
    
    for (const schema of schemasToValidate) {
      try {
        await startExecution(schema.id);
        
        // Wait for completion before starting next
        while (getExecutionStatus(schema.id) === "running") {
          await new Promise(resolve => setTimeout(resolve, 500));
        }
      } catch (error) {
        console.error(`Failed to execute schema validation ${schema.id}:`, error);
      }
    }
  }

  function handleSchemaValidate(schemaId: string) {
    startExecution(schemaId);
  }

  function handleSchemaPreview(schemaId: string) {
    selectSchema(schemaId);
  }
</script>

<Sidebar.Header class="gap-3.5 border-b p-4 min-w-0">
  <div class="flex w-full items-center justify-between min-w-0">
    <div class="text-foreground text-base font-medium truncate">
      Schema Validation
    </div>
    <Button
      size="sm"
      variant="outline"
      class="text-xs h-7"
      onclick={handleValidateAll}
      disabled={filteredSchemas.length === 0 || filteredSchemas.some(schema => getExecutionStatus(schema.id) === "running")}
    >
      <ShieldCheckIcon class="size-3 mr-1" />
      Validate All
    </Button>
  </div>
  <div class="relative min-w-0">
    <Sidebar.Input 
      bind:value={searchQuery} 
      placeholder="Search schemas..." 
      class="pr-8 w-full"
    />
    {#if searchQuery.trim()}
      <button
        onclick={() => searchQuery = ""}
        class="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-sm hover:bg-sidebar-accent transition-colors"
        title="Clear search"
      >
        <XIcon class="size-3 text-muted-foreground" />
      </button>
    {/if}
  </div>
</Sidebar.Header>

<Sidebar.Content class="min-w-0 overflow-y-auto">
  <Sidebar.Group class="px-2 min-w-0">
    {#if searchQuery.trim()}
      <div class="text-xs text-muted-foreground mb-3 px-1">
        Found {filteredSchemas.length} schema{filteredSchemas.length === 1 ? '' : 's'} matching "{searchQuery}"
      </div>
    {/if}
    <Sidebar.GroupContent class="space-y-4 px-2 py-2">
      {#if filteredSchemas.length === 0}
        <div class="text-center py-8 text-muted-foreground">
          <ShieldCheckIcon class="size-8 mx-auto mb-2 opacity-50" />
          <p class="text-sm">
            {#if searchQuery.trim()}
              No schemas match your search
            {:else}
              No schema validations available
            {/if}
          </p>
          {#if searchQuery.trim()}
            <button 
              onclick={() => searchQuery = ""} 
              class="text-xs text-primary hover:underline mt-2"
            >
              Clear search
            </button>
          {/if}
        </div>
      {:else}
        {#each filteredSchemas as schema (schema.id)}
          {@const execution = getExecution(schema.id)}
          <SchemaCard
            id={schema.id}
            title={schema.title}
            description={schema.description}
            filename={schema.validationType === 'python' ? schema.filename : undefined}
            status={getExecutionStatus(schema.id)}
            executionTime={execution?.executionTime}
            lastRun={execution?.lastRun}
            validationSummary={execution?.jsResult?.summary}
            isSelected={isSchemaSelected(schema.id)}
            onValidate={() => handleSchemaValidate(schema.id)}
            onPreview={() => handleSchemaPreview(schema.id)}
          />
        {/each}
      {/if}
    </Sidebar.GroupContent>
  </Sidebar.Group>
</Sidebar.Content>