import { browser } from "$app/environment";
import { readonly, writable, derived } from "svelte/store";

export type Theme = 'auto' | 'light' | 'dark';

const _preference = writable<Theme>('auto');
const _system = writable<boolean>();
const _isDark = derived([_preference, _system], ([theme, system]) => theme === 'auto' ? system : theme === 'dark');

if (browser) {
	function setAttribute(value: boolean) {
		document.documentElement.dataset.bsTheme = value ? 'dark' : 'light';
	}

	function update(rule: MediaQueryList | MediaQueryListEvent) {
		_system.set(rule.matches);
	}

	const rule = matchMedia('(prefers-color-scheme: dark)');

	_system.set(rule.matches);
	_isDark.subscribe(setAttribute);
	rule.addEventListener('change', update);
}

export namespace theme {
	export const system = readonly(_system);
	export const isDark = readonly(_isDark);
	export const preference = _preference;
}

export default theme;

// import { browser } from "$app/environment";
// import { readonly, writable } from "svelte/store";

// let isDark = false;
// const darkStore = writable<boolean>();

// darkStore.subscribe(v => isDark = v);

// let userPreference: undefined | boolean;
// let system: boolean;

// if (browser) {
// 	function setAttribute(value: boolean) {
// 		document.documentElement.dataset.bsTheme = value ? 'dark' : 'light';
// 	}

// 	function update(rule: MediaQueryList | MediaQueryListEvent) {
// 		system = rule.matches;
// 		if (userPreference === undefined) {
// 			darkStore.set(system);
// 		}
// 	}

// 	const rule = matchMedia('(prefers-color-scheme: dark)');

// 	system = rule.matches;
// 	darkStore.set(system);
// 	darkStore.subscribe(setAttribute);
// 	rule.addEventListener('change', update);
// }

// export namespace theme {
// 	export const isDark = readonly(darkStore);

// 	export function set(value?: boolean) {
// 		debugger;
// 		value ??= !isDark;
// 		userPreference = value;
// 		darkStore.set(value);
// 	}
// }

// export default theme;