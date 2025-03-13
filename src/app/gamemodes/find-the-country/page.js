"use client";

import Link from "next/link";
import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { Itim } from "next/font/google";
import { useSettings } from "../../contexts/SettingsContext";
import WorldMap from "./WorldMap";

const itim = Itim({
	subsets: ["latin"],
	weight: "400",
});

// Simplified set of countries with ISO-3 codes matching the world-atlas dataset
const countryData = [
	{ code: "USA", name: "United States", difficulty: "easy" },
	{ code: "CHN", name: "China", difficulty: "easy" },
	{ code: "IND", name: "India", difficulty: "easy" },
	{ code: "BRA", name: "Brazil", difficulty: "easy" },
	{ code: "RUS", name: "Russia", difficulty: "easy" },
	{ code: "JPN", name: "Japan", difficulty: "easy" },
	{ code: "DEU", name: "Germany", difficulty: "easy" },
	{ code: "GBR", name: "United Kingdom", difficulty: "easy" },
	{ code: "FRA", name: "France", difficulty: "easy" },
	{ code: "ITA", name: "Italy", difficulty: "easy" },
	{ code: "CAN", name: "Canada", difficulty: "easy" },
	{ code: "AUS", name: "Australia", difficulty: "easy" },
	{ code: "ESP", name: "Spain", difficulty: "easy" },
	{ code: "MEX", name: "Mexico", difficulty: "easy" },
	{ code: "KOR", name: "South Korea", difficulty: "easy" },
	{ code: "IDN", name: "Indonesia", difficulty: "easy" },
	{ code: "TUR", name: "Turkey", difficulty: "easy" },
	{ code: "SAU", name: "Saudi Arabia", difficulty: "easy" },
	{ code: "ZAF", name: "South Africa", difficulty: "easy" },
	{ code: "ARG", name: "Argentina", difficulty: "easy" },
	{ code: "POL", name: "Poland", difficulty: "medium" },
	{ code: "UKR", name: "Ukraine", difficulty: "medium" },
	{ code: "EGY", name: "Egypt", difficulty: "medium" },
	{ code: "VNM", name: "Vietnam", difficulty: "medium" },
	{ code: "IRN", name: "Iran", difficulty: "medium" },
	{ code: "THA", name: "Thailand", difficulty: "medium" },
	{ code: "PHL", name: "Philippines", difficulty: "medium" },
	{ code: "MYS", name: "Malaysia", difficulty: "medium" },
	{ code: "COL", name: "Colombia", difficulty: "medium" },
	{ code: "NLD", name: "Netherlands", difficulty: "medium" },
	{ code: "BEL", name: "Belgium", difficulty: "medium" },
	{ code: "SWE", name: "Sweden", difficulty: "medium" },
	{ code: "CHE", name: "Switzerland", difficulty: "medium" },
	{ code: "AUT", name: "Austria", difficulty: "medium" },
	{ code: "PRT", name: "Portugal", difficulty: "medium" },
	{ code: "GRC", name: "Greece", difficulty: "medium" },
	{ code: "CZE", name: "Czech Republic", difficulty: "medium" },
	{ code: "NOR", name: "Norway", difficulty: "medium" },
	{ code: "FIN", name: "Finland", difficulty: "medium" },
	{ code: "DNK", name: "Denmark", difficulty: "medium" },
	{ code: "BGD", name: "Bangladesh", difficulty: "hard" },
	{ code: "NGA", name: "Nigeria", difficulty: "hard" },
	{ code: "ETH", name: "Ethiopia", difficulty: "hard" },
	{ code: "TZA", name: "Tanzania", difficulty: "hard" },
	{ code: "MMR", name: "Myanmar", difficulty: "hard" },
	{ code: "KEN", name: "Kenya", difficulty: "hard" },
	{ code: "MAR", name: "Morocco", difficulty: "hard" },
	{ code: "UZB", name: "Uzbekistan", difficulty: "hard" },
	{ code: "PER", name: "Peru", difficulty: "hard" },
	{ code: "AGO", name: "Angola", difficulty: "hard" },
	{ code: "LKA", name: "Sri Lanka", difficulty: "hard" },
	{ code: "CIV", name: "Ivory Coast", difficulty: "hard" },
	{ code: "GHA", name: "Ghana", difficulty: "hard" },
	{ code: "ROU", name: "Romania", difficulty: "hard" },
	{ code: "CHL", name: "Chile", difficulty: "hard" },
	{ code: "BWA", name: "Botswana", difficulty: "hard" },
	{ code: "TUN", name: "Tunisia", difficulty: "hard" },
	{ code: "BOL", name: "Bolivia", difficulty: "hard" },
	{ code: "CMR", name: "Cameroon", difficulty: "hard" },
	{ code: "SRB", name: "Serbia", difficulty: "hard" },
];

export default function FindTheCountry() {
	const { difficulty, soundEnabled, timerMode } = useSettings();

	// Base settings for different difficulty levels
	const difficultySettings = useMemo(
		() => ({
			easy: {
				timeLimit: 150,
				bonusTime: 7,
				penalty: 0, // No time penalty for wrong answers in easy mode
				countriesPerGame: 20,
			},
			medium: {
				timeLimit: 120,
				bonusTime: 5,
				penalty: 2, // Lose 2 seconds for wrong answers
				countriesPerGame: 30,
			},
			hard: {
				timeLimit: 90,
				bonusTime: 3,
				penalty: 5, // Lose 5 seconds for wrong answers
				countriesPerGame: 40,
			},
		}),
		[]
	);

	// Filter countries based on current difficulty
	const countriesData = useMemo(() => {
		let filtered = [];

		// For easy, only include easy countries
		if (difficulty === "easy") {
			filtered = countryData.filter((country) => country.difficulty === "easy");
		}
		// For medium, include easy and medium
		else if (difficulty === "medium") {
			filtered = countryData.filter(
				(country) =>
					country.difficulty === "easy" || country.difficulty === "medium"
			);
		}
		// For hard, include all difficulties
		else {
			filtered = countryData;
		}

		// Shuffle and limit to the count for the current difficulty
		return filtered
			.sort(() => Math.random() - 0.5)
			.slice(0, difficultySettings[difficulty].countriesPerGame);
	}, [difficulty, difficultySettings]);

	const [isStarted, setIsStarted] = useState(false);
	const [isOn, setIsOn] = useState(false);
	const [countdown, setCountdown] = useState(5);
	const [gameCompleted, setGameCompleted] = useState(false);

	const [randomCountryIndex, setRandomCountryIndex] = useState(0);
	const [usedCountries, setUsedCountries] = useState([]);

	const [isCorrect, setIsCorrect] = useState(0);
	const [isWrong, setIsWrong] = useState(0);
	const [timeLeft, setTimeLeft] = useState(
		difficultySettings[difficulty].timeLimit
	);
	const [timeElapsed, setTimeElapsed] = useState(0);
	const [selectedCountry, setSelectedCountry] = useState(null);
	const [showResult, setShowResult] = useState(false);
	const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
	const [zoomLevel, setZoomLevel] = useState(1);
	const mapRef = useRef(null);

	// Initialize the random country index after countries data is loaded
	useEffect(() => {
		if (countriesData && countriesData.length > 0) {
			setRandomCountryIndex(Math.floor(Math.random() * countriesData.length));
		}
	}, [countriesData]);

	// Play sound effect when enabled
	const playSound = useCallback(
		(type) => {
			if (!soundEnabled) return;

			try {
				// Create audio elements for sounds
				const correctSound = new Audio("/sounds/correct.mp3");
				const wrongSound = new Audio("/sounds/wrong.mp3");

				if (type === "correct") {
					correctSound.play().catch((err) => console.log("Sound error:", err));
				} else if (type === "wrong") {
					wrongSound.play().catch((err) => console.log("Sound error:", err));
				}
			} catch (error) {
				console.error("Error playing sound:", error);
			}
		},
		[soundEnabled]
	);

	// Start countdown
	useEffect(() => {
		if (isStarted && countdown > 0) {
			const timer = setInterval(() => {
				setCountdown((prevCountdown) => prevCountdown - 1);
			}, 1000);

			return () => clearInterval(timer);
		} else if (isStarted && countdown === 0) {
			setIsOn(true);
		}
	}, [isStarted, countdown]);

	// Function to handle game completion - memoized with useCallback
	const finishGame = useCallback(() => {
		// Set game state to completed
		setGameCompleted(true);
		setIsOn(false);

		// Save the score to localStorage
		const newRecord = {
			id: Date.now(),
			score: isCorrect,
			date: new Date().toISOString().split("T")[0],
			time:
				timerMode === "stopwatch"
					? timeElapsed
					: difficultySettings[difficulty].timeLimit,
			gameMode: "Find the Country",
			difficulty: difficulty,
			timerMode: timerMode, // Save the timer mode with the record
			// For stopwatch mode, lower time is better; for countdown modes, higher score is better
			value: timerMode === "stopwatch" ? timeElapsed : isCorrect,
		};

		try {
			// Get existing records
			const existingRecordsJSON = localStorage.getItem("findTheCountryRecords");
			const existingRecords = existingRecordsJSON
				? JSON.parse(existingRecordsJSON)
				: [];

			// Add new record and sort differently based on timer mode
			let updatedRecords;
			if (timerMode === "stopwatch") {
				// For stopwatch, sort by value (time) in ascending order (faster times are better)
				updatedRecords = [...existingRecords, newRecord].sort((a, b) => {
					// First, check if timer modes are the same
					if (
						(a.timerMode || "countdown-bonus") !==
						(b.timerMode || "countdown-bonus")
					) {
						return (a.timerMode || "countdown-bonus") === "stopwatch" ? -1 : 1; // Stopwatch records first
					}
					// If both are stopwatch, sort by time (ascending)
					if ((a.timerMode || "countdown-bonus") === "stopwatch") {
						return a.value - b.value;
					}
					// If both are countdown, sort by score (descending)
					return b.value - a.value;
				});
			} else {
				// For countdown modes, sort by score (descending)
				updatedRecords = [...existingRecords, newRecord].sort((a, b) => {
					// First, check if timer modes are the same
					if (
						(a.timerMode || "countdown-bonus") !==
						(b.timerMode || "countdown-bonus")
					) {
						return (a.timerMode || "countdown-bonus") === "stopwatch" ? -1 : 1; // Stopwatch records first
					}
					// If both are stopwatch, sort by time (ascending)
					if ((a.timerMode || "countdown-bonus") === "stopwatch") {
						return a.value - b.value;
					}
					// If both are countdown, sort by score (descending)
					return b.value - a.value;
				});
			}

			// Keep only top 10 records
			const topRecords = updatedRecords.slice(0, 10);

			// Save back to localStorage
			localStorage.setItem("findTheCountryRecords", JSON.stringify(topRecords));
		} catch (error) {
			console.error("Error saving records:", error);
		}
	}, [difficulty, difficultySettings, isCorrect, timeElapsed, timerMode]);

	// Game timer
	useEffect(() => {
		if (!isOn || gameCompleted) return;

		// Different timer logic based on timer mode
		let timer;

		if (timerMode === "stopwatch") {
			// Stopwatch mode: timer counts up
			timer = setInterval(() => {
				setTimeElapsed((prevTime) => prevTime + 1);
			}, 1000);
		} else {
			// Countdown modes (both fixed and bonus): timer counts down
			if (timeLeft > 0) {
				timer = setInterval(() => {
					setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
				}, 1000);
			} else {
				// Game ends when time runs out in countdown modes
				finishGame();
			}
		}

		return () => clearInterval(timer);
	}, [isOn, timeLeft, timerMode, gameCompleted, finishGame]);

	// Handle manual stop for stopwatch mode
	const handleStopGame = () => {
		if (timerMode === "stopwatch" && isOn) {
			finishGame();
		}
	};

	// Reset game function
	const resetGame = () => {
		setIsStarted(false);
		setIsOn(false);
		setGameCompleted(false);
		setTimeLeft(difficultySettings[difficulty].timeLimit);
		setTimeElapsed(0);
		setIsCorrect(0);
		setIsWrong(0);
		setUsedCountries([]);
		setSelectedCountry(null);
		setShowResult(false);
		setZoomLevel(1);
		if (countriesData.length > 0) {
			setRandomCountryIndex(Math.floor(Math.random() * countriesData.length));
		}
	};

	const getRandomCountry = useCallback(() => {
		if (countriesData.length === 0) return 0;

		let newIndex;
		const maxTries = 20; // To prevent infinite loop if all countries are used
		let tries = 0;

		do {
			newIndex = Math.floor(Math.random() * countriesData.length);
			tries++;
		} while (
			usedCountries.includes(newIndex) &&
			usedCountries.length < countriesData.length &&
			tries < maxTries
		);

		return newIndex;
	}, [countriesData, usedCountries]);

	const handleCountryClick = (code) => {
		if (gameCompleted || showResult || !countriesData[randomCountryIndex])
			return;

		setSelectedCountry(code);
		const currentCountry = countriesData[randomCountryIndex];

		if (code === currentCountry.code) {
			setIsAnswerCorrect(true);
			setIsCorrect((prev) => prev + 1);

			// Only add bonus time in countdown-bonus mode
			if (timerMode === "countdown-bonus") {
				setTimeLeft((prev) => prev + difficultySettings[difficulty].bonusTime);
			}

			playSound("correct");
		} else {
			setIsAnswerCorrect(false);
			setIsWrong((prev) => prev + 1);

			// Apply time penalty in countdown modes
			if (
				timerMode !== "stopwatch" &&
				difficultySettings[difficulty].penalty > 0
			) {
				setTimeLeft((prev) =>
					Math.max(1, prev - difficultySettings[difficulty].penalty)
				);
			}

			playSound("wrong");
		}

		setShowResult(true);

		// Set timeout to show the result and move to next country
		setTimeout(() => {
			setSelectedCountry(null);
			setShowResult(false);
			setUsedCountries((prev) => [...prev, randomCountryIndex]);

			// Check if all countries have been used
			if (usedCountries.length + 1 >= countriesData.length) {
				// If in stopwatch mode, finish the game
				if (timerMode === "stopwatch") {
					finishGame();
				}
				// For countdown modes, continue until time runs out
				else if (timeLeft <= 0) {
					finishGame();
				} else {
					// If we still have time but no more countries, finish the game
					finishGame();
				}
			} else {
				setRandomCountryIndex(getRandomCountry());
			}
		}, 1500);
	};

	// Get the appropriate time display based on timer mode
	const getTimeDisplay = () => {
		if (timerMode === "stopwatch") {
			// Format stopwatch time
			const minutes = Math.floor(timeElapsed / 60);
			const seconds = timeElapsed % 60;
			return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
		} else {
			// Return countdown time
			return `${timeLeft}s`;
		}
	};

	const handleZoomIn = () => {
		setZoomLevel((prev) => Math.min(prev + 0.2, 3));
	};

	const handleZoomOut = () => {
		setZoomLevel((prev) => Math.max(prev - 0.2, 0.5));
	};

	const handlePan = (direction) => {
		if (mapRef.current) {
			const { scrollLeft, scrollTop } = mapRef.current;
			const scrollAmount = 100;

			switch (direction) {
				case "up":
					mapRef.current.scrollTo({
						top: scrollTop - scrollAmount,
						behavior: "smooth",
					});
					break;
				case "down":
					mapRef.current.scrollTo({
						top: scrollTop + scrollAmount,
						behavior: "smooth",
					});
					break;
				case "left":
					mapRef.current.scrollTo({
						left: scrollLeft - scrollAmount,
						behavior: "smooth",
					});
					break;
				case "right":
					mapRef.current.scrollTo({
						left: scrollLeft + scrollAmount,
						behavior: "smooth",
					});
					break;
			}
		}
	};

	return (
		<div className="flex flex-col justify-center items-center min-h-[calc(100vh-10rem)] py-8 px-4">
			{!isStarted && !gameCompleted && (
				<div className="card max-w-lg mx-auto text-center">
					<h1 className={`text-4xl ${itim.className} mb-6`}>
						Find the Country
					</h1>
					<p className="mb-8">
						A country name will be shown and you have to find and click it on
						the world map. <br /> Try to be as fast as possible to beat your
						highest score!
					</p>
					<div className="mb-6">
						<p className="text-lg font-medium mb-2">
							Current Difficulty:{" "}
							<span className="text-[var(--main)]">
								{difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
							</span>
						</p>
						<p className="text-sm">
							{difficulty === "easy"
								? `${difficultySettings.easy.countriesPerGame} common countries, ${difficultySettings.easy.timeLimit}s time limit, +${difficultySettings.easy.bonusTime}s bonus time, no penalties`
								: difficulty === "medium"
								? `${difficultySettings.medium.countriesPerGame} countries, ${difficultySettings.medium.timeLimit}s time limit, +${difficultySettings.medium.bonusTime}s bonus time, -${difficultySettings.medium.penalty}s penalty`
								: `${difficultySettings.hard.countriesPerGame} countries including difficult ones, ${difficultySettings.hard.timeLimit}s time limit, +${difficultySettings.hard.bonusTime}s bonus time, -${difficultySettings.hard.penalty}s penalty`}
						</p>
						<p className="text-lg font-medium mt-4 mb-2">
							Timer Mode:{" "}
							<span className="text-[var(--main)]">
								{timerMode === "countdown-bonus"
									? "Countdown with Bonus"
									: timerMode === "countdown-fixed"
									? "Fixed Countdown"
									: "Stopwatch"}
							</span>
						</p>
						<p className="text-sm">
							{timerMode === "countdown-bonus"
								? "Timer counts down. Each correct answer gives bonus time."
								: timerMode === "countdown-fixed"
								? "Timer counts down. No bonus time for correct answers."
								: "Timer counts up. Press stop when you're done."}
						</p>
						<p className="text-sm mt-2">
							Change settings in{" "}
							<Link
								href="/settings"
								className="text-[var(--main)] hover:underline"
							>
								Settings
							</Link>
						</p>
					</div>
					<div className="flex flex-col sm:flex-row justify-center gap-4">
						<button
							onClick={() => setIsStarted(true)}
							className="btn-primary text-xl"
						>
							Start Game
						</button>
						<Link
							href={"/gamemodes"}
							className="py-3 px-6 border-2 border-[var(--main)] text-[var(--main)] rounded-lg hover:bg-[var(--main)] hover:text-[#eeeeee] transition-colors duration-300 text-xl text-center"
						>
							Back to Games
						</Link>
					</div>
				</div>
			)}
			{gameCompleted && (
				<div className="card max-w-lg mx-auto text-center">
					<h1 className={`text-4xl ${itim.className} mb-6`}>Game Over</h1>
					<div className="text-2xl mb-6">
						{timerMode === "stopwatch"
							? `Your time: ${getTimeDisplay()}`
							: `Your score: ${isCorrect}`}
					</div>
					<div className="flex justify-center mb-4">
						<div className="bg-[var(--foreground-muted)] bg-opacity-20 p-4 rounded-lg text-left">
							<p>
								<strong>Correct answers:</strong> {isCorrect}
							</p>
							<p>
								<strong>Wrong answers:</strong> {isWrong}
							</p>
							<p>
								<strong>Timer mode:</strong>{" "}
								{timerMode === "countdown-bonus"
									? "Countdown with Bonus"
									: timerMode === "countdown-fixed"
									? "Fixed Countdown"
									: "Stopwatch"}
							</p>
							<p>
								<strong>Difficulty:</strong> {difficulty}
							</p>
						</div>
					</div>
					<div className="flex flex-col sm:flex-row justify-center gap-4">
						<button onClick={resetGame} className="btn-primary text-xl">
							Play Again
						</button>
						<Link
							href={"/records"}
							className="py-3 px-6 border-2 border-[var(--main)] text-[var(--main)] rounded-lg hover:bg-[var(--main)] hover:text-[#eeeeee] transition-colors duration-300 text-xl text-center"
						>
							View Records
						</Link>
					</div>
				</div>
			)}
			{isStarted && !gameCompleted && (
				<div className="card max-w-2xl mx-auto text-center">
					<h1 className={`text-4xl ${itim.className} mb-6`}>
						Find the Country
					</h1>

					{countdown > 0 && !isOn ? (
						<div className="text-3xl font-bold mb-4">
							Starting in: {countdown}
						</div>
					) : (
						<div className="flex flex-col items-center justify-center gap-y-4">
							<div className="flex justify-between w-full mb-4">
								<div className="text-xl font-semibold">
									{timerMode === "stopwatch" ? "Time: " : "Time Left: "}
									<span
										className={
											timerMode !== "stopwatch" && timeLeft < 30
												? "text-[var(--error)]"
												: ""
										}
									>
										{getTimeDisplay()}
									</span>
								</div>
								<div className="text-xl">
									<span className="text-[var(--success)]">✓ {isCorrect}</span> /
									<span className="text-[var(--error)]">✗ {isWrong}</span>
								</div>
							</div>

							{timerMode === "stopwatch" && (
								<button
									onClick={handleStopGame}
									className="py-2 px-4 bg-[var(--error)] text-white rounded-lg hover:opacity-90 transition-opacity duration-300"
								>
									Stop Game
								</button>
							)}

							<div className="text-3xl font-bold mb-2">
								Find: {countriesData[randomCountryIndex]?.name}
							</div>

							{showResult && (
								<div
									className={`text-xl font-bold mb-2 ${
										isAnswerCorrect
											? "text-[var(--success)]"
											: "text-[var(--error)]"
									}`}
								>
									{isAnswerCorrect ? "Correct!" : "Wrong!"}
								</div>
							)}

							{/* Map Controls */}
							<div className="flex justify-center gap-2 mb-2">
								<button
									onClick={handleZoomIn}
									className="p-2 border rounded-lg hover:bg-[var(--foreground-muted)]"
									title="Zoom In"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									>
										<circle cx="11" cy="11" r="8"></circle>
										<line x1="21" y1="21" x2="16.65" y2="16.65"></line>
										<line x1="11" y1="8" x2="11" y2="14"></line>
										<line x1="8" y1="11" x2="14" y2="11"></line>
									</svg>
								</button>
								<button
									onClick={handleZoomOut}
									className="p-2 border rounded-lg hover:bg-[var(--foreground-muted)]"
									title="Zoom Out"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									>
										<circle cx="11" cy="11" r="8"></circle>
										<line x1="21" y1="21" x2="16.65" y2="16.65"></line>
										<line x1="8" y1="11" x2="14" y2="11"></line>
									</svg>
								</button>
								<div className="flex flex-col">
									<button
										onClick={() => handlePan("up")}
										className="p-2 border rounded-t-lg hover:bg-[var(--foreground-muted)]"
										title="Pan Up"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="24"
											height="24"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										>
											<polyline points="18 15 12 9 6 15"></polyline>
										</svg>
									</button>
									<div className="flex">
										<button
											onClick={() => handlePan("left")}
											className="p-2 border border-t-0 rounded-bl-lg hover:bg-[var(--foreground-muted)]"
											title="Pan Left"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="24"
												height="24"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
												strokeLinejoin="round"
											>
												<polyline points="15 18 9 12 15 6"></polyline>
											</svg>
										</button>
										<button
											onClick={() => handlePan("right")}
											className="p-2 border border-t-0 border-l-0 rounded-br-lg hover:bg-[var(--foreground-muted)]"
											title="Pan Right"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="24"
												height="24"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
												strokeLinejoin="round"
											>
												<polyline points="9 18 15 12 9 6"></polyline>
											</svg>
										</button>
									</div>
									<button
										onClick={() => handlePan("down")}
										className="p-2 border border-t-0 rounded-b-lg hover:bg-[var(--foreground-muted)]"
										title="Pan Down"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="24"
											height="24"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										>
											<polyline points="6 9 12 15 18 9"></polyline>
										</svg>
									</button>
								</div>
							</div>

							{/* Interactive Map */}
							<div
								ref={mapRef}
								className="border-4 rounded-lg border-[var(--foreground-muted)] overflow-auto relative"
								style={{
									maxHeight: "500px",
									maxWidth: "100%",
									width: "800px",
									height: "500px",
								}}
							>
								<div
									style={{
										transform: `scale(${zoomLevel})`,
										transformOrigin: "top left",
										width: "fit-content",
									}}
								>
									<WorldMap
										onCountryClick={handleCountryClick}
										selectedCountry={selectedCountry}
										targetCountry={countriesData[randomCountryIndex]?.code}
										showResult={showResult}
										isAnswerCorrect={isAnswerCorrect}
									/>
								</div>
								<div className="text-xs text-center mt-1 italic">
									Use the controls above to zoom and pan. Click on the country
									you want to select.
								</div>
							</div>
						</div>
					)}
				</div>
			)}
		</div>
	);
}
