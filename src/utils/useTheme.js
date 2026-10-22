import { useSyncExternalStore } from "react";

// The `.dark` class on <html> is the rendered source of truth. index.html sets
// it before first paint, so reading the class gives the right value on mount.
const THEME_STORAGE_KEY = "theme";

const getSnapshot = () =>
	document.documentElement.classList.contains("dark") ? "dark" : "light";

// Dark is the site default when no preference has been stored.
const getServerSnapshot = () => "dark";

const subscribe = (onStoreChange) => {
	const observer = new MutationObserver(() => onStoreChange());

	observer.observe(document.documentElement, {
		attributes: true,
		attributeFilter: ["class"]
	});

	return () => observer.disconnect();
};

const applyTheme = (theme) => {
	const isDark = theme === "dark";

	document.documentElement.classList.toggle("dark", isDark);

	try {
		localStorage.setItem(THEME_STORAGE_KEY, isDark ? "dark" : "light");
	} catch {
		// Storage can be unavailable (e.g. private browsing); the class still
		// applies for the current page.
	}
};

export const setTheme = (theme) =>
	applyTheme(theme === "dark" ? "dark" : "light");

export const toggleTheme = () =>
	applyTheme(getSnapshot() === "dark" ? "light" : "dark");

export const useTheme = () => {
	const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

	return { theme, isDark: theme === "dark", setTheme, toggleTheme };
};
