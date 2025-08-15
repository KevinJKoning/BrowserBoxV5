import './app.css';
import AppShell from './core/app-shell/AppShell.svelte';
import { mount } from 'svelte';

const app = mount(AppShell, {
  target: document.getElementById('app')!
});

export default app;