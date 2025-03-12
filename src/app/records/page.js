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
	const [records, setRecords] = useState({
		guessTheFlag: [],
		nameTheCountry: [],
		findTheCountry: [],
	});

	useEffect(() => {
		// Load records from localStorage if available
		if (typeof window !== "undefined") {
			const loadedGuessTheFlag = localStorage.getItem("guessTheFlagRecords");
			const loadedNameTheCountry = localStorage.getItem(
				"nameTheCountryRecords"
			);
			const loadedFindTheCountry = localStorage.getItem(
				"findTheCountryRecords"
			);

			setRecords({
				guessTheFlag: loadedGuessTheFlag
					? JSON.parse(loadedGuessTheFlag)
					: generateDemoRecords("Guess the Flag"),
				nameTheCountry: loadedNameTheCountry
					? JSON.parse(loadedNameTheCountry)
					: generateDemoRecords("Name the Country"),
				findTheCountry: loadedFindTheCountry
					? JSON.parse(loadedFindTheCountry)
					: generateDemoRecords("Find the Country"),
			});
		}
	}, []);

	// Generate demo records for display purposes
	const generateDemoRecords = (gameMode) => {
		const difficulties = ["easy", "medium", "hard"];
		const demoRecords = [];
		for (let i = 0; i < 5; i++) {
			demoRecords.push({
				id: i,
				score: Math.floor(Math.random() * 50) + 10,
				date: new Date(
					Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000
				)
					.toISOString()
					.split("T")[0],
				time: Math.floor(Math.random() * 120) + 1,
				gameMode,
				difficulty:
					difficulties[Math.floor(Math.random() * difficulties.length)],
			});
		}
		return demoRecords.sort((a, b) => b.score - a.score);
	};

	// Get records for the active tab and filter by difficulty if needed
	const getActiveRecords = () => {
		const recordMap = {
			guessTheFlag: records.guessTheFlag,
			nameTheCountry: records.nameTheCountry,
			findTheCountry: records.findTheCountry,
		};

		let filteredRecords = recordMap[activeTab] || [];

		// Filter by difficulty if not "all"
		if (activeDifficulty !== "all") {
			filteredRecords = filteredRecords.filter(
				(record) => record.difficulty === activeDifficulty
			);
		}

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
				<div className="flex flex-wrap justify-center mb-6">
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

				{/* Records Table */}
				<div className="overflow-x-auto">
					<table className="w-full border-collapse">
						<thead>
							<tr className="bg-[var(--foreground-muted)]">
								<th className="p-2 text-left">Rank</th>
								<th className="p-2 text-left">Score</th>
								<th className="p-2 text-left">Date</th>
								<th className="p-2 text-left">Time (sec)</th>
								<th className="p-2 text-left">Difficulty</th>
							</tr>
						</thead>
						<tbody>
							{getActiveRecords().length > 0 ? (
								getActiveRecords().map((record, index) => (
									<tr
										key={index}
										className={
											index % 2 === 0
												? "bg-[var(--foreground-muted)] bg-opacity-10"
												: ""
										}
									>
										<td className="p-2">{index + 1}</td>
										<td className="p-2">{record.score}</td>
										<td className="p-2">{record.date}</td>
										<td className="p-2">{record.time}</td>
										<td className="p-2 capitalize">
											{record.difficulty || "medium"}
										</td>
									</tr>
								))
							) : (
								<tr>
									<td colSpan="5" className="p-4 text-center">
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
