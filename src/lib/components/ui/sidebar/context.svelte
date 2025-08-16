<script module lang="ts">
  import { getContext, setContext } from 'svelte';
  import { SIDEBAR_KEYBOARD_SHORTCUT } from './constants.js';
  type Getter<T> = () => T;
  export type SidebarStateProps = { open: Getter<boolean>; setOpen: (open:boolean)=>void; };
  class SidebarState { readonly props: SidebarStateProps; setOpen: SidebarStateProps['setOpen'];
    constructor(props: SidebarStateProps){ this.setOpen = props.setOpen; this.props = props; }
    get open(){ return this.props.open(); }
    get state(){ return this.open ? 'expanded':'collapsed'; }
    handleShortcutKeydown = (e: KeyboardEvent) => { if (e.key === SIDEBAR_KEYBOARD_SHORTCUT && (e.metaKey || e.ctrlKey)){ e.preventDefault(); this.toggle(); } };
    toggle = () => this.setOpen(!this.open);
  }
  const SYMBOL_KEY = 'scn-sidebar';
  export function setSidebar(props: SidebarStateProps){ return setContext(Symbol.for(SYMBOL_KEY), new SidebarState(props)); }
  export function useSidebar(){ return getContext<SidebarState>(Symbol.for(SYMBOL_KEY)); }
</script>
