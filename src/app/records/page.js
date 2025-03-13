"use client";

import { useState, useEffect } from "react";
import { Itim } from "next/font/google";
import Link from "next/link";

const itim = Itim({
	subsets: ["latin"],
	weight: "400",
});

export default function Records() {
	const [activeTab, setActiveTab] = useState("guessTheFlag");
	const [activeDifficulty, setActiveDifficulty] = useState("all");
	const [activeTimerMode, setActiveTimerMode] = useState("all");
	const [records, setRecords] = useState({
		guessTheFlag: [],
		nameTheCountry: [],
		findTheCountry: [],
	});

	// Load records on component mount
	useEffect(() => {
		// Load records from localStorage if available
		if (typeof window !== "undefined") {
			try {
				// Load each type of record and handle potential parsing errors
				const loadGuessTheFlag = () => {
					const records = localStorage.getItem("guessTheFlagRecords");
					if (records) {
						try {
							// Log for debugging
							const parsed = JSON.parse(records);
							console.log("Loaded Guess the Flag records:", parsed);
							return parsed;
						} catch (error) {
							console.error("Error parsing Guess the Flag records:", error);
							return [];
						}
					}
					return [];
				};

				const loadNameTheCountry = () => {
					const records = localStorage.getItem("nameTheCountryRecords");
					if (records) {
						try {
							// Log for debugging
							const parsed = JSON.parse(records);
							console.log("Loaded Name the Country records:", parsed);
							return parsed;
						} catch (error) {
							console.error("Error parsing Name the Country records:", error);
							return [];
						}
					}
					return [];
				};

				const loadFindTheCountry = () => {
					const records = localStorage.getItem("findTheCountryRecords");
					if (records) {
						try {
							// Log for debugging
							const parsed = JSON.parse(records);
							console.log("Loaded Find the Country records:", parsed);
							return parsed;
						} catch (error) {
							console.error("Error parsing Find the Country records:", error);
							return [];
						}
					}
					return [];
				};

				// Set the records
				setRecords({
					guessTheFlag:
						loadGuessTheFlag() || generateDemoRecords("Guess the Flag"),
					nameTheCountry:
						loadNameTheCountry() || generateDemoRecords("Name the Country"),
					findTheCountry:
						loadFindTheCountry() || generateDemoRecords("Find the Country"),
				});
			} catch (error) {
				console.error("Error loading records:", error);
				// Fallback to demo records
				setRecords({
					guessTheFlag: generateDemoRecords("Guess the Flag"),
					nameTheCountry: generateDemoRecords("Name the Country"),
					findTheCountry: generateDemoRecords("Find the Country"),
				});
			}
		}
	}, []);

	// Generate demo records for display purposes
	const generateDemoRecords = (gameMode) => {
		const difficulties = ["easy", "medium", "hard"];
		const timerModes = ["countdown-bonus", "countdown-fixed", "stopwatch"];
		const demoRecords = [];
		for (let i = 0; i < 5; i++) {
			const selectedTimerMode =
				timerModes[Math.floor(Math.random() * timerModes.length)];
			const score = Math.floor(Math.random() * 50) + 10;
			const time =
				selectedTimerMode === "stopwatch"
					? Math.floor(Math.random() * 300) + 60 // 1-5 minutes for stopwatch
					: Math.floor(Math.random() * 120) + 60; // 1-3 minutes for countdown

			demoRecords.push({
				id: Date.now() + i,
				score: score,
				date: new Date(
					Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000
				)
					.toISOString()
					.split("T")[0],
				time: time,
				gameMode,
				difficulty:
					difficulties[Math.floor(Math.random() * difficulties.length)],
				timerMode: selectedTimerMode,
				value: selectedTimerMode === "stopwatch" ? time : score, // Value for sorting
			});
		}

		// Sort records appropriately
		return demoRecords.sort((a, b) => {
			// First group by timer mode
			if (
				(a.timerMode || "countdown-bonus") !==
				(b.timerMode || "countdown-bonus")
			) {
				return (a.timerMode || "countdown-bonus") === "stopwatch" ? -1 : 1; // Stopwatch records first
			}

			// Then sort within each group
			if ((a.timerMode || "countdown-bonus") === "stopwatch") {
				return a.time - b.time; // For stopwatch, lower time is better
			}
			return b.score - a.score; // For countdown, higher score is better
		});
	};

	// Get records for the active tab and filter by difficulty and timer mode
	const getActiveRecords = () => {
		const recordMap = {
			guessTheFlag: records.guessTheFlag || [],
			nameTheCountry: records.nameTheCountry || [],
			findTheCountry: records.findTheCountry || [],
		};

		let filteredRecords = recordMap[activeTab] || [];
		console.log("Raw active records:", filteredRecords);

		// Filter by difficulty if not "all"
		if (activeDifficulty !== "all") {
			filteredRecords = filteredRecords.filter(
				(record) => record.difficulty === activeDifficulty
			);
		}

		// Filter by timer mode if not "all"
		if (activeTimerMode !== "all") {
			filteredRecords = filteredRecords.filter((record) => {
				// Handle records that might not have timer mode set (backward compatibility)
				const recordTimerMode = record.timerMode || "countdown-bonus";
				return recordTimerMode === activeTimerMode;
			});
		}

		console.log("Filtered active records:", filteredRecords);
		return filteredRecords;
	};

	// Clear records for the active game mode
	const clearRecords = () => {
		if (typeof window !== "undefined") {
			if (activeTab === "guessTheFlag") {
				localStorage.removeItem("guessTheFlagRecords");
				setRecords({ ...records, guessTheFlag: [] });
			} else if (activeTab === "nameTheCountry") {
				localStorage.removeItem("nameTheCountryRecords");
				setRecords({ ...records, nameTheCountry: [] });
			} else if (activeTab === "findTheCountry") {
				localStorage.removeItem("findTheCountryRecords");
				setRecords({ ...records, findTheCountry: [] });
			}
		}
	};

	// Format time display (for stopwatch mode)
	const formatTime = (seconds) => {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
	};

	// Get timer mode display
	const getTimerModeDisplay = (mode) => {
		const timerMode = mode || "countdown-bonus"; // Default to countdown-bonus for backwards compatibility
		return timerMode === "countdown-bonus"
			? "Countdown + Bonus"
			: timerMode === "countdown-fixed"
			? "Fixed Countdown"
			: "Stopwatch";
	};

	return (
		<div className="flex flex-col justify-center items-center min-h-[calc(100vh-10rem)] py-8 px-4">
			<div className="card max-w-4xl w-full mx-auto">
				<h1 className={`text-4xl ${itim.className} mb-6 text-center`}>
					Records
				</h1>

				{/* Game Mode Tabs */}
				<div className="flex flex-wrap justify-center mb-6">
					<button
						className={`px-4 py-2 ${
							activeTab === "guessTheFlag"
								? "bg-[var(--main)] text-[#eeeeee]"
								: "bg-[var(--foreground-muted)] text-[var(--foreground)]"
						} rounded-tl-lg rounded-bl-lg transition-colors duration-300`}
						onClick={() => setActiveTab("guessTheFlag")}
					>
						Guess the Flag
					</button>
					<button
						className={`px-4 py-2 ${
							activeTab === "nameTheCountry"
								? "bg-[var(--main)] text-[#eeeeee]"
								: "bg-[var(--foreground-muted)] text-[var(--foreground)]"
						} transition-colors duration-300`}
						onClick={() => setActiveTab("nameTheCountry")}
					>
						Name the Country
					</button>
					<button
						className={`px-4 py-2 ${
							activeTab === "findTheCountry"
								? "bg-[var(--main)] text-[#eeeeee]"
								: "bg-[var(--foreground-muted)] text-[var(--foreground)]"
						} rounded-tr-lg rounded-br-lg transition-colors duration-300`}
						onClick={() => setActiveTab("findTheCountry")}
					>
						Find the Country
					</button>
				</div>

				{/* Difficulty Filters */}
				<div className="flex flex-wrap justify-center mb-4">
					<button
						className={`px-3 py-1 text-sm ${
							activeDifficulty === "all"
								? "bg-[var(--main)] text-[#eeeeee]"
								: "bg-[var(--foreground-muted)] bg-opacity-50 text-[var(--foreground)]"
						} rounded-l-lg transition-colors duration-300`}
						onClick={() => setActiveDifficulty("all")}
					>
						All Difficulties
					</button>
					<button
						className={`px-3 py-1 text-sm ${
							activeDifficulty === "easy"
								? "bg-[var(--main)] text-[#eeeeee]"
								: "bg-[var(--foreground-muted)] bg-opacity-50 text-[var(--foreground)]"
						} transition-colors duration-300`}
						onClick={() => setActiveDifficulty("easy")}
					>
						Easy
					</button>
					<button
						className={`px-3 py-1 text-sm ${
							activeDifficulty === "medium"
								? "bg-[var(--main)] text-[#eeeeee]"
								: "bg-[var(--foreground-muted)] bg-opacity-50 text-[var(--foreground)]"
						} transition-colors duration-300`}
						onClick={() => setActiveDifficulty("medium")}
					>
						Medium
					</button>
					<button
						className={`px-3 py-1 text-sm ${
							activeDifficulty === "hard"
								? "bg-[var(--main)] text-[#eeeeee]"
								: "bg-[var(--foreground-muted)] bg-opacity-50 text-[var(--foreground)]"
						} rounded-r-lg transition-colors duration-300`}
						onClick={() => setActiveDifficulty("hard")}
					>
						Hard
					</button>
				</div>

				{/* Timer Mode Filters */}
				<div className="flex flex-wrap justify-center mb-6">
					<button
						className={`px-3 py-1 text-sm ${
							activeTimerMode === "all"
								? "bg-[var(--main)] text-[#eeeeee]"
								: "bg-[var(--foreground-muted)] bg-opacity-50 text-[var(--foreground)]"
						} rounded-l-lg transition-colors duration-300`}
						onClick={() => setActiveTimerMode("all")}
					>
						All Timer Modes
					</button>
					<button
						className={`px-3 py-1 text-sm ${
							activeTimerMode === "countdown-bonus"
								? "bg-[var(--main)] text-[#eeeeee]"
								: "bg-[var(--foreground-muted)] bg-opacity-50 text-[var(--foreground)]"
						} transition-colors duration-300`}
						onClick={() => setActiveTimerMode("countdown-bonus")}
					>
						Countdown + Bonus
					</button>
					<button
						className={`px-3 py-1 text-sm ${
							activeTimerMode === "countdown-fixed"
								? "bg-[var(--main)] text-[#eeeeee]"
								: "bg-[var(--foreground-muted)] bg-opacity-50 text-[var(--foreground)]"
						} transition-colors duration-300`}
						onClick={() => setActiveTimerMode("countdown-fixed")}
					>
						Fixed Countdown
					</button>
					<button
						className={`px-3 py-1 text-sm ${
							activeTimerMode === "stopwatch"
								? "bg-[var(--main)] text-[#eeeeee]"
								: "bg-[var(--foreground-muted)] bg-opacity-50 text-[var(--foreground)]"
						} rounded-r-lg transition-colors duration-300`}
						onClick={() => setActiveTimerMode("stopwatch")}
					>
						Stopwatch
					</button>
				</div>

				{/* Records Table */}
				<div className="overflow-x-auto">
					<table className="w-full border-collapse">
						<thead>
							<tr className="bg-[var(--foreground-muted)]">
								<th className="p-2 text-left">Rank</th>
								<th className="p-2 text-left">Score</th>
								<th className="p-2 text-left">Time</th>
								<th className="p-2 text-left">Date</th>
								<th className="p-2 text-left">Difficulty</th>
								<th className="p-2 text-left">Timer Mode</th>
							</tr>
						</thead>
						<tbody>
							{getActiveRecords().length > 0 ? (
								getActiveRecords().map((record, index) => (
									<tr
										key={record.id || index}
										className={
											index % 2 === 0
												? "bg-[var(--foreground-muted)] bg-opacity-10"
												: ""
										}
									>
										<td className="p-2">{index + 1}</td>
										<td className="p-2">{record.score}</td>
										<td className="p-2">
											{(record.timerMode || "countdown-bonus") === "stopwatch"
												? formatTime(record.time)
												: `${record.time}s`}
										</td>
										<td className="p-2">{record.date}</td>
										<td className="p-2 capitalize">
											{record.difficulty || "medium"}
										</td>
										<td className="p-2">
											{getTimerModeDisplay(record.timerMode)}
										</td>
									</tr>
								))
							) : (
								<tr>
									<td colSpan="6" className="p-4 text-center">
										No records found. Play some games to set records!
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>

				{/* Action Buttons */}
				<div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
					<button
						onClick={clearRecords}
						className="py-2 px-4 border-2 border-[var(--error)] text-[var(--error)] rounded-lg hover:bg-[var(--error)] hover:text-[#eeeeee] transition-colors duration-300"
					>
						Clear Records
					</button>
					<Link
						href="/gamemodes"
						className="py-2 px-4 bg-[var(--main)] text-[#eeeeee] rounded-lg hover:bg-[var(--main-hover)] transition-colors duration-300 text-center"
					>
						Play Games
					</Link>
				</div>
			</div>
		</div>
	);
}
