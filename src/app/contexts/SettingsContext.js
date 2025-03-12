"use client";

import { createContext, useContext, useState, useEffect } from "react";

const SettingsContext = createContext();

export function useSettings() {
	return useContext(SettingsContext);
}

export function SettingsProvider({ children }) {
	// Theme settings
	const [theme, setTheme] = useState("system");
	const [difficulty, setDifficulty] = useState("medium");
	const [soundEnabled, setSoundEnabled] = useState(true);

	// Load settings from localStorage on initial render
	useEffect(() => {
		if (typeof window !== "undefined") {
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
			}
		}
	}, []);

	// Apply theme when it changes
	useEffect(() => {
		if (typeof window !== "undefined") {
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

			// Save settings to localStorage
			const currentSettings = {
				theme,
				difficulty,
				soundEnabled,
			};
			localStorage.setItem(
				"worldGuesserSettings",
				JSON.stringify(currentSettings)
			);
		}
	}, [theme, difficulty, soundEnabled]);

	const value = {
		theme,
		setTheme,
		difficulty,
		setDifficulty,
		soundEnabled,
		setSoundEnabled,
	};

	return (
		<SettingsContext.Provider value={value}>
			{children}
		</SettingsContext.Provider>
	);
}
