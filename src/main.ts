import './app.css';
import AppShell from './core/app-shell/AppShell.svelte';
import { mount } from 'svelte';

// Initialize automation API for Playwright testing (used by e2e/workflow/)
import './core/automation/playwright-api.js';

const app = mount(AppShell, {
  target: document.getElementById('app')!
});

export default app;