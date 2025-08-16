import { IsMobile } from "../../../hooks/is-mobile.svelte.js";
import { getContext, setContext } from "svelte";
import { SIDEBAR_KEYBOARD_SHORTCUT } from "./constants.js";

type Getter<T> = () => T;

export type SidebarStateProps = {
	open: Getter<boolean>;
	setOpen: (open: boolean) => void;
};

class SidebarState {
	readonly props: SidebarStateProps;
	openMobile = false;
	setOpen: SidebarStateProps["setOpen"];
	#isMobile: IsMobile;

	constructor(props: SidebarStateProps) {
		this.setOpen = props.setOpen;
		this.#isMobile = new IsMobile();
		this.props = props;
	}

	get isMobile() { return this.#isMobile.current; }
	get open() { return this.props.open(); }
	get state() { return this.open ? "expanded" : "collapsed"; }

	handleShortcutKeydown = (e: KeyboardEvent) => {
		if (e.key === SIDEBAR_KEYBOARD_SHORTCUT && (e.metaKey || e.ctrlKey)) {
			e.preventDefault();
			this.toggle();
		}
	};

	setOpenMobile = (value: boolean) => { this.openMobile = value; };

	toggle = () => {
		return this.#isMobile.current
			? (this.openMobile = !this.openMobile)
			: this.setOpen(!this.open);
	};
}

const SYMBOL_KEY = "scn-sidebar";
export function setSidebar(props: SidebarStateProps): SidebarState {
	return setContext(Symbol.for(SYMBOL_KEY), new SidebarState(props));
}
export function useSidebar(): SidebarState { return getContext(Symbol.for(SYMBOL_KEY)); }
