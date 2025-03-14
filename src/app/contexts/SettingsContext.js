"use client";

import {
	createContext,
	useContext,
	useState,
	useEffect,
	useMemo,
	useCallback,
	memo,
} from "react";

const SettingsContext = createContext();

export function useSettings() {
	return useContext(SettingsContext);
}

export function SettingsProvider({ children }) {
	// Theme settings
	const [theme, setTheme] = useState("system");
	const [difficulty, setDifficulty] = useState("medium");
	const [soundEnabled, setSoundEnabled] = useState(true);
	const [timerMode, setTimerMode] = useState("countdown-bonus");

	// Load settings from localStorage on initial render - only run once
	useEffect(() => {
		// Use this pattern to prevent issues with server-side rendering
		if (typeof window === "undefined") return;

		try {
			const savedSettings = localStorage.getItem("worldGuesserSettings");
			if (savedSettings) {
				const parsedSettings = JSON.parse(savedSettings);
				setTheme(parsedSettings.theme || "system");
				setDifficulty(parsedSettings.difficulty || "medium");
				setSoundEnabled(
					parsedSettings.soundEnabled !== undefined
						? parsedSettings.soundEnabled
						: true
				);
				setTimerMode(parsedSettings.timerMode || "countdown-bonus");
			}
		} catch (error) {
			console.error("Error loading settings:", error);
			// If there's an error, we'll use the defaults
		}
	}, []);

	// Apply theme when it changes - with debounce to prevent rapid changes
	useEffect(() => {
		if (typeof window === "undefined") return;

		const applyTheme = () => {
			const root = window.document.documentElement;

			// Remove all theme classes
			root.classList.remove("theme-light", "theme-dark");

			if (theme === "system") {
				// Use system preference
				const prefersDark = window.matchMedia(
					"(prefers-color-scheme: dark)"
				).matches;
				root.classList.add(prefersDark ? "theme-dark" : "theme-light");
			} else {
				// Apply selected theme
				root.classList.add(`theme-${theme}`);
			}
		};

		// Apply theme right away
		applyTheme();

		// Save settings to localStorage with minimal writes
		const saveSettings = () => {
			const currentSettings = {
				theme,
				difficulty,
				soundEnabled,
				timerMode,
			};

			// Store settings
			localStorage.setItem(
				"worldGuesserSettings",
				JSON.stringify(currentSettings)
			);
		};

		// Debounce saving to avoid excessive writes
		const timer = setTimeout(saveSettings, 300);

		return () => clearTimeout(timer);
	}, [theme, difficulty, soundEnabled, timerMode]);

	// Memoize the value to prevent unnecessary re-renders
	const value = useMemo(
		() => ({
			theme,
			setTheme,
			difficulty,
			setDifficulty,
			soundEnabled,
			setSoundEnabled,
			timerMode,
			setTimerMode,
		}),
		[theme, difficulty, soundEnabled, timerMode]
	);

	return (
		<SettingsContext.Provider value={value}>
			{children}
		</SettingsContext.Provider>
	);
}

// Apply memo to prevent re-renders when props haven't changed
export default memo(SettingsProvider);
