"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Itim } from "next/font/google";
import { useSettings } from "../contexts/SettingsContext";

const itim = Itim({
	subsets: ["latin"],
	weight: "400",
});

export default function Settings() {
	const {
		theme,
		setTheme,
		difficulty,
		setDifficulty,
		soundEnabled,
		setSoundEnabled,
		timerMode,
		setTimerMode,
	} = useSettings();
	const [isSaved, setIsSaved] = useState(false);

	// Reset saved message after 2 seconds
	useEffect(() => {
		if (isSaved) {
			const timer = setTimeout(() => {
				setIsSaved(false);
			}, 2000);
			return () => clearTimeout(timer);
		}
	}, [isSaved]);

	const handleSave = () => {
		// Settings are automatically saved when they change, but we'll show a confirmation
		setIsSaved(true);
	};

	return (
		<div className="flex flex-col justify-center items-center min-h-[calc(100vh-10rem)] py-8 px-4">
			<div className="card max-w-2xl mx-auto w-full">
				<h1 className={`text-4xl ${itim.className} mb-6 text-center`}>
					Settings
				</h1>

				{isSaved && (
					<div className="bg-[var(--success)] bg-opacity-10 text-[var(--success)] p-4 rounded-lg mb-6 text-center font-medium">
						Settings saved successfully!
					</div>
				)}

				<div className="space-y-8">
					{/* Theme Settings */}
					<div className="setting-group">
						<h2 className={`text-2xl ${itim.className} mb-4`}>Appearance</h2>
						<div className="bg-[var(--foreground-muted)] bg-opacity-10 p-4 rounded-lg">
							<div className="mb-4">
								<label className="block mb-2 font-medium">Theme</label>
								<div className="flex flex-wrap gap-3">
									<button
										onClick={() => setTheme("light")}
										className={`py-2 px-4 rounded-lg transition-colors ${
											theme === "light"
												? "bg-[var(--main)] text-[#eeeeee]"
												: "bg-[var(--foreground-muted)] bg-opacity-30"
										}`}
									>
										Light
									</button>
									<button
										onClick={() => setTheme("dark")}
										className={`py-2 px-4 rounded-lg transition-colors ${
											theme === "dark"
												? "bg-[var(--main)] text-[#eeeeee]"
												: "bg-[var(--foreground-muted)] bg-opacity-30"
										}`}
									>
										Dark
									</button>
									<button
										onClick={() => setTheme("system")}
										className={`py-2 px-4 rounded-lg transition-colors ${
											theme === "system"
												? "bg-[var(--main)] text-[#eeeeee]"
												: "bg-[var(--foreground-muted)] bg-opacity-30"
										}`}
									>
										System
									</button>
								</div>
							</div>
						</div>
					</div>

					{/* Game Settings */}
					<div className="setting-group">
						<h2 className={`text-2xl ${itim.className} mb-4`}>Game Settings</h2>
						<div className="bg-[var(--foreground-muted)] bg-opacity-10 p-4 rounded-lg space-y-6">
							<div>
								<label className="block mb-2 font-medium">Difficulty</label>
								<div className="flex flex-wrap gap-3">
									<button
										onClick={() => setDifficulty("easy")}
										className={`py-2 px-4 rounded-lg transition-colors ${
											difficulty === "easy"
												? "bg-[var(--main)] text-[#eeeeee]"
												: "bg-[var(--foreground-muted)] bg-opacity-30"
										}`}
									>
										Easy
									</button>
									<button
										onClick={() => setDifficulty("medium")}
										className={`py-2 px-4 rounded-lg transition-colors ${
											difficulty === "medium"
												? "bg-[var(--main)] text-[#eeeeee]"
												: "bg-[var(--foreground-muted)] bg-opacity-30"
										}`}
									>
										Medium
									</button>
									<button
										onClick={() => setDifficulty("hard")}
										className={`py-2 px-4 rounded-lg transition-colors ${
											difficulty === "hard"
												? "bg-[var(--main)] text-[#eeeeee]"
												: "bg-[var(--foreground-muted)] bg-opacity-30"
										}`}
									>
										Hard
									</button>
								</div>
								<p className="text-sm mt-2 text-[var(--foreground-muted)] text-opacity-80">
									{difficulty === "easy"
										? "More common countries and easier hints."
										: difficulty === "medium"
										? "Balanced mix of common and uncommon countries."
										: "More challenging countries and tougher time limits."}
								</p>
							</div>

							{/* Timer Mode Settings */}
							<div>
								<label className="block mb-2 font-medium">Timer Mode</label>
								<div className="flex flex-wrap gap-3">
									<button
										onClick={() => setTimerMode("countdown-bonus")}
										className={`py-2 px-4 rounded-lg transition-colors ${
											timerMode === "countdown-bonus"
												? "bg-[var(--main)] text-[#eeeeee]"
												: "bg-[var(--foreground-muted)] bg-opacity-30"
										}`}
									>
										Countdown with Bonus
									</button>
									<button
										onClick={() => setTimerMode("countdown-fixed")}
										className={`py-2 px-4 rounded-lg transition-colors ${
											timerMode === "countdown-fixed"
												? "bg-[var(--main)] text-[#eeeeee]"
												: "bg-[var(--foreground-muted)] bg-opacity-30"
										}`}
									>
										Fixed Countdown
									</button>
									<button
										onClick={() => setTimerMode("stopwatch")}
										className={`py-2 px-4 rounded-lg transition-colors ${
											timerMode === "stopwatch"
												? "bg-[var(--main)] text-[#eeeeee]"
												: "bg-[var(--foreground-muted)] bg-opacity-30"
										}`}
									>
										Stopwatch
									</button>
								</div>
								<p className="text-sm mt-2 text-[var(--foreground-muted)] text-opacity-80">
									{timerMode === "countdown-bonus"
										? "Timer counts down. Each correct answer gives bonus time."
										: timerMode === "countdown-fixed"
										? "Timer counts down. No bonus time for correct answers."
										: "Timer counts up. Press stop when you're done."}
								</p>
							</div>

							<div>
								<label className="block mb-2 font-medium">Sound Effects</label>
								<div className="flex items-center">
									<label className="inline-flex items-center cursor-pointer">
										<input
											type="checkbox"
											className="sr-only peer"
											checked={soundEnabled}
											onChange={() => setSoundEnabled(!soundEnabled)}
										/>
										<div className="relative w-11 h-6 bg-[var(--foreground-muted)] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--main)]"></div>
										<span className="ms-3">
											{soundEnabled ? "Enabled" : "Disabled"}
										</span>
									</label>
								</div>
							</div>
						</div>
					</div>

					{/* Data Management */}
					<div className="setting-group">
						<h2 className={`text-2xl ${itim.className} mb-4`}>
							Data Management
						</h2>
						<div className="bg-[var(--foreground-muted)] bg-opacity-10 p-4 rounded-lg">
							<button
								onClick={() => {
									if (
										window.confirm(
											"Are you sure you want to reset all game records? This cannot be undone."
										)
									) {
										localStorage.removeItem("guessTheFlagRecords");
										localStorage.removeItem("nameTheCountryRecords");
										localStorage.removeItem("findTheCountryRecords");
										setIsSaved(true);
									}
								}}
								className="py-2 px-4 border-2 border-[var(--error)] text-[var(--error)] rounded-lg hover:bg-[var(--error)] hover:text-[#eeeeee] transition-colors duration-300"
							>
								Reset All Game Records
							</button>
							<p className="text-sm mt-2 text-[var(--foreground-muted)] text-opacity-80">
								This will permanently delete all your game scores and records.
							</p>
						</div>
					</div>
				</div>

				<div className="flex gap-4 justify-center mt-8">
					<button onClick={handleSave} className="btn-primary text-xl">
						Save Settings
					</button>
					<Link
						href="/"
						className="py-3 px-6 border-2 border-[var(--main)] text-[var(--main)] rounded-lg hover:bg-[var(--main)] hover:text-[#eeeeee] transition-colors duration-300 text-xl text-center"
					>
						Back to Home
					</Link>
				</div>
			</div>
		</div>
	);
}
