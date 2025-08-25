# Simple BrowserBox Automation

**One-click workflow**: Load config → Run scripts → Download results (or get detailed errors)

## Quick Setup

```bash
# 1. Install dependencies (one-time setup)
./e2e/workflow/setup_simple.sh

# 2. Start BrowserBox
npm run dev

# 3. Run automation with your config
python3 e2e/workflow/simple_automation.py temp/demo-config.zip
```

## What It Does

1. **Loads your config zip** into BrowserBox
2. **Runs all scripts** automatically  
3. **Downloads results** when successful
4. **Shows detailed error messages** with stack traces when scripts fail

## Examples

```bash
# Test with demo config
python3 e2e/workflow/simple_automation.py temp/demo-config.zip

# Test with your own config
python3 e2e/workflow/simple_automation.py path/to/your-config.zip
```

## Output

**Success:**
```
🚀 Starting BrowserBox workflow with demo-config.zip
📱 Loading BrowserBox...
⏳ Waiting for app to initialize...
📦 Loading configuration: demo-config.zip
📝 Found 3 scripts
🚀 Executing all scripts...
⏳ Waiting for execution to complete...
📊 Progress: 3 completed, 0 errors, 0 running
📁 Found 5 result files. Downloading...
✅ Results downloaded to: ./browserbox-results-1703123456.zip
🎉 Workflow completed successfully!
   ✅ 3 scripts executed
   📁 5 results downloaded
```

**Failure with Details:**
```
🚀 Starting BrowserBox workflow with my-config.zip
...
⚠️ 1 scripts failed. Collecting error details...
❌ Script 'Data Analysis' failed:
   Error: ImportError: No module named 'invalid_library'
   Details: Traceback (most recent call last):
     File "<string>", line 1, in <module>
   ImportError: No module named 'invalid_library'
⚠️ Workflow completed with errors:
   ✅ 2 scripts succeeded
   ❌ 1 scripts failed
   📁 3 results downloaded
```

## That's It!

No complex configuration, no test frameworks, no async context managers. Just:

**`python3 simple_automation.py your-config.zip`**

→ Get your results or detailed error messages.