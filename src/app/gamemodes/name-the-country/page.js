"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useMemo, useCallback } from "react";
import { Itim } from "next/font/google";
import { useSettings } from "../../contexts/SettingsContext";

const itim = Itim({
	subsets: ["latin"],
	weight: "400",
});

export default function NameTheCountry() {
	const { difficulty, soundEnabled, timerMode } = useSettings();

	// Base settings for different difficulty levels
	const difficultySettings = useMemo(
		() => ({
			easy: {
				timeLimit: 150,
				bonusTime: 7,
				countriesCount: 20, // Use fewer countries for easy mode
			},
			medium: {
				timeLimit: 120,
				bonusTime: 5,
				countriesCount: 40, // Use more countries for medium mode
			},
			hard: {
				timeLimit: 90,
				bonusTime: 3,
				countriesCount: 60, // Use most countries for hard mode
			},
		}),
		[]
	);

	// All possible countries data
	const allCountriesData = useMemo(
		() => [
			{
				code: "US",
				name: "United States",
				hint: "Second largest country in North America",
				difficulty: "easy",
			},
			{
				code: "CN",
				name: "China",
				hint: "Most populous country in the world",
				difficulty: "easy",
			},
			{
				code: "IN",
				name: "India",
				hint: "Second most populous country in the world",
				difficulty: "easy",
			},
			{
				code: "BR",
				name: "Brazil",
				hint: "Largest country in South America",
				difficulty: "easy",
			},
			{
				code: "RU",
				name: "Russia",
				hint: "Largest country by land area",
				difficulty: "easy",
			},
			{
				code: "JP",
				name: "Japan",
				hint: "Island nation in East Asia",
				difficulty: "easy",
			},
			{
				code: "DE",
				name: "Germany",
				hint: "Central European country",
				difficulty: "easy",
			},
			{
				code: "GB",
				name: "United Kingdom",
				hint: "Island nation in Northwestern Europe",
				difficulty: "easy",
			},
			{
				code: "FR",
				name: "France",
				hint: "Western European country known for the Eiffel Tower",
				difficulty: "easy",
			},
			{
				code: "IT",
				name: "Italy",
				hint: "Southern European country shaped like a boot",
				difficulty: "easy",
			},
			{
				code: "CA",
				name: "Canada",
				hint: "Second largest country by land area",
				difficulty: "easy",
			},
			{
				code: "AU",
				name: "Australia",
				hint: "Country that is also a continent",
				difficulty: "easy",
			},
			{
				code: "ES",
				name: "Spain",
				hint: "Southwestern European country",
				difficulty: "easy",
			},
			{
				code: "MX",
				name: "Mexico",
				hint: "North American country south of the US",
				difficulty: "easy",
			},
			{
				code: "KR",
				name: "South Korea",
				hint: "East Asian country",
				difficulty: "easy",
			},
			{
				code: "ID",
				name: "Indonesia",
				hint: "Southeast Asian archipelago",
				difficulty: "easy",
			},
			{
				code: "TR",
				name: "Turkey",
				hint: "Transcontinental country",
				difficulty: "easy",
			},
			{
				code: "SA",
				name: "Saudi Arabia",
				hint: "Middle Eastern country",
				difficulty: "easy",
			},
			{
				code: "ZA",
				name: "South Africa",
				hint: "Southernmost country in Africa",
				difficulty: "easy",
			},
			{
				code: "AR",
				name: "Argentina",
				hint: "South American country known for tango",
				difficulty: "easy",
			},
			// Medium difficulty countries
			{
				code: "PL",
				name: "Poland",
				hint: "Central European country",
				difficulty: "medium",
			},
			{
				code: "UA",
				name: "Ukraine",
				hint: "Eastern European country",
				difficulty: "medium",
			},
			{
				code: "EG",
				name: "Egypt",
				hint: "North African country with pyramids",
				difficulty: "medium",
			},
			{
				code: "VN",
				name: "Vietnam",
				hint: "Southeast Asian country",
				difficulty: "medium",
			},
			{
				code: "IR",
				name: "Iran",
				hint: "Middle Eastern country",
				difficulty: "medium",
			},
			{
				code: "TH",
				name: "Thailand",
				hint: "Southeast Asian kingdom",
				difficulty: "medium",
			},
			{
				code: "PH",
				name: "Philippines",
				hint: "Island nation in Southeast Asia",
				difficulty: "medium",
			},
			{
				code: "MY",
				name: "Malaysia",
				hint: "Southeast Asian country with two main regions",
				difficulty: "medium",
			},
			{
				code: "CO",
				name: "Colombia",
				hint: "South American country on the Pacific and Caribbean",
				difficulty: "medium",
			},
			{
				code: "NL",
				name: "Netherlands",
				hint: "Western European country with tulips and windmills",
				difficulty: "medium",
			},
			{
				code: "BE",
				name: "Belgium",
				hint: "Western European country known for chocolate",
				difficulty: "medium",
			},
			{
				code: "SE",
				name: "Sweden",
				hint: "Nordic country",
				difficulty: "medium",
			},
			{
				code: "CH",
				name: "Switzerland",
				hint: "Alpine country in Europe",
				difficulty: "medium",
			},
			{
				code: "AT",
				name: "Austria",
				hint: "Central European country",
				difficulty: "medium",
			},
			{
				code: "PT",
				name: "Portugal",
				hint: "Country on the Iberian Peninsula",
				difficulty: "medium",
			},
			{
				code: "GR",
				name: "Greece",
				hint: "Mediterranean country with ancient history",
				difficulty: "medium",
			},
			{
				code: "CZ",
				name: "Czech Republic",
				hint: "Central European country",
				difficulty: "medium",
			},
			{
				code: "ZA",
				name: "South Africa",
				hint: "Country at the southern tip of Africa",
				difficulty: "medium",
			},
			{
				code: "NO",
				name: "Norway",
				hint: "Nordic country with fjords",
				difficulty: "medium",
			},
			{
				code: "FI",
				name: "Finland",
				hint: "Nordic country with many lakes",
				difficulty: "medium",
			},
			// Hard difficulty countries
			{
				code: "BD",
				name: "Bangladesh",
				hint: "South Asian country",
				difficulty: "hard",
			},
			{
				code: "NG",
				name: "Nigeria",
				hint: "West African country",
				difficulty: "hard",
			},
			{
				code: "ET",
				name: "Ethiopia",
				hint: "East African country",
				difficulty: "hard",
			},
			{
				code: "TZ",
				name: "Tanzania",
				hint: "East African country with Kilimanjaro",
				difficulty: "hard",
			},
			{
				code: "MM",
				name: "Myanmar",
				hint: "Southeast Asian country formerly called Burma",
				difficulty: "hard",
			},
			{
				code: "KE",
				name: "Kenya",
				hint: "East African country",
				difficulty: "hard",
			},
			{
				code: "MA",
				name: "Morocco",
				hint: "North African country",
				difficulty: "hard",
			},
			{
				code: "UZ",
				name: "Uzbekistan",
				hint: "Central Asian country",
				difficulty: "hard",
			},
			{
				code: "PE",
				name: "Peru",
				hint: "South American country with Machu Picchu",
				difficulty: "hard",
			},
			{
				code: "AO",
				name: "Angola",
				hint: "Southwestern African country",
				difficulty: "hard",
			},
			{
				code: "LK",
				name: "Sri Lanka",
				hint: "Island nation south of India",
				difficulty: "hard",
			},
			{
				code: "CI",
				name: "Ivory Coast",
				hint: "West African country",
				difficulty: "hard",
			},
			{
				code: "GH",
				name: "Ghana",
				hint: "West African country",
				difficulty: "hard",
			},
			{
				code: "RO",
				name: "Romania",
				hint: "Southeastern European country",
				difficulty: "hard",
			},
			{
				code: "CL",
				name: "Chile",
				hint: "Long, narrow South American country",
				difficulty: "hard",
			},
			{
				code: "BW",
				name: "Botswana",
				hint: "Southern African landlocked country",
				difficulty: "hard",
			},
			{
				code: "TN",
				name: "Tunisia",
				hint: "North African country",
				difficulty: "hard",
			},
			{
				code: "BO",
				name: "Bolivia",
				hint: "South American landlocked country",
				difficulty: "hard",
			},
			{
				code: "CM",
				name: "Cameroon",
				hint: "Central African country",
				difficulty: "hard",
			},
			{
				code: "RS",
				name: "Serbia",
				hint: "Southeastern European country",
				difficulty: "hard",
			},
		],
		[]
	);

	// Filter countries based on current difficulty
	const countriesData = useMemo(() => {
		let filtered = [];

		// For easy, only include easy countries
		if (difficulty === "easy") {
			filtered = allCountriesData.filter(
				(country) => country.difficulty === "easy"
			);
		}
		// For medium, include easy and medium
		else if (difficulty === "medium") {
			filtered = allCountriesData.filter(
				(country) =>
					country.difficulty === "easy" || country.difficulty === "medium"
			);
		}
		// For hard, include all difficulties
		else {
			filtered = allCountriesData;
		}

		// Limit to the count for the current difficulty
		return filtered.slice(0, difficultySettings[difficulty].countriesCount);
	}, [allCountriesData, difficulty, difficultySettings]);

	const [isStarted, setIsStarted] = useState(false);
	const [isOn, setIsOn] = useState(false);
	const [countdown, setCountdown] = useState(5);
	const [gameCompleted, setGameCompleted] = useState(false);

	const [inputValue, setInputValue] = useState("");
	const [randomCountryIndex, setRandomCountryIndex] = useState(
		Math.floor(Math.random() * countriesData.length)
	);
	const [usedCountries, setUsedCountries] = useState([]);
	const [showHint, setShowHint] = useState(false);

	const [isCorrect, setIsCorrect] = useState(0);
	const [isWrong, setIsWrong] = useState(0);
	const [timeLeft, setTimeLeft] = useState(
		difficultySettings[difficulty].timeLimit
	);
	const [timeElapsed, setTimeElapsed] = useState(0);

	// Play sound effect when enabled
	const playSound = useCallback(
		(type) => {
			if (!soundEnabled) return;

			// Create audio elements for sounds
			const correctSound = new Audio("/sounds/correct.mp3");
			const wrongSound = new Audio("/sounds/wrong.mp3");

			if (type === "correct") {
				correctSound.play();
			} else if (type === "wrong") {
				wrongSound.play();
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
		} else if (countdown === 0) {
			setIsOn(true);
			setCountdown(5);
		}
	}, [isStarted, countdown]);

	// Function to handle game completion
	// Function to handle game completion - memoized with useCallback
	const finishGame = useCallback(() => {
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
				if (a.timerMode !== b.timerMode) {
					return a.timerMode === "stopwatch" ? -1 : 1; // Stopwatch records first
				}
				// If both are stopwatch, sort by time (ascending)
				if (a.timerMode === "stopwatch") {
					return a.value - b.value;
				}
				// If both are countdown, sort by score (descending)
				return b.value - a.value;
			});
		} else {
			// For countdown modes, sort by score (descending)
			updatedRecords = [...existingRecords, newRecord].sort((a, b) => {
				// First, check if timer modes are the same
				if (a.timerMode !== b.timerMode) {
					return a.timerMode === "stopwatch" ? -1 : 1; // Stopwatch records first
				}
				// If both are stopwatch, sort by time (ascending)
				if (a.timerMode === "stopwatch") {
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
		setInputValue("");
		setUsedCountries([]);
		setShowHint(false);
		setRandomCountryIndex(Math.floor(Math.random() * countriesData.length));
	};

	const getRandomCountry = useCallback(() => {
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

	const handleChange = (e) => {
		const value = e.target.value;
		setInputValue(value);

		const currentCountry = countriesData[randomCountryIndex];
		const correctAnswer = currentCountry.name.toLowerCase();
		const userAnswer = value.toLowerCase();

		// Check if answer is correct
		if (correctAnswer === userAnswer) {
			setIsCorrect((prev) => prev + 1);

			// Only add bonus time in countdown-bonus mode
			if (timerMode === "countdown-bonus") {
				setTimeLeft((prev) => prev + difficultySettings[difficulty].bonusTime);
			}

			playSound("correct");
			setInputValue("");
			setUsedCountries((prev) => [...prev, randomCountryIndex]);

			// Check if all countries have been used
			if (usedCountries.length + 1 >= countriesData.length) {
				// If in stopwatch mode, finish the game
				if (timerMode === "stopwatch") {
					finishGame();
				}
				// For countdown modes, we'd run out of countries, so finish
				else {
					finishGame();
				}
			} else {
				setRandomCountryIndex(getRandomCountry());
				setShowHint(false);
			}
		}
	};

	const handleSkip = () => {
		setIsWrong((prev) => prev + 1);
		playSound("wrong");
		setInputValue("");
		setUsedCountries((prev) => [...prev, randomCountryIndex]);

		// Check if all countries have been used
		if (usedCountries.length + 1 >= countriesData.length) {
			// If in stopwatch mode, finish the game
			if (timerMode === "stopwatch") {
				finishGame();
			}
			// For countdown modes, we'd run out of countries, so finish
			else {
				finishGame();
			}
		} else {
			setRandomCountryIndex(getRandomCountry());
			setShowHint(false);
		}
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

	return (
		<div className="flex flex-col justify-center items-center min-h-[calc(100vh-10rem)] py-8 px-4">
			{!isStarted && !gameCompleted && (
				<div className="card max-w-lg mx-auto text-center">
					<h1 className={`text-4xl ${itim.className} mb-6`}>
						Name the Country
					</h1>
					<p className="mb-8">
						You will be shown a country outline and you have to guess the
						country by writing its name in the box. <br /> You can request a
						hint if you&apos;re stuck. Try to be as fast as possible to beat
						your highest score!
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
								? `${difficultySettings.easy.countriesCount} common countries, ${difficultySettings.easy.timeLimit}s time limit, +${difficultySettings.easy.bonusTime}s bonus time`
								: difficulty === "medium"
								? `${difficultySettings.medium.countriesCount} countries, ${difficultySettings.medium.timeLimit}s time limit, +${difficultySettings.medium.bonusTime}s bonus time`
								: `${difficultySettings.hard.countriesCount} countries including difficult ones, ${difficultySettings.hard.timeLimit}s time limit, +${difficultySettings.hard.bonusTime}s bonus time`}
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
				<div className="card max-w-lg mx-auto text-center">
					<h1 className={`text-4xl ${itim.className} mb-6`}>
						Name the Country
					</h1>

					{!isOn ? (
						<div className="text-3xl font-bold mb-4">
							Starting in: {countdown}
						</div>
					) : (
						<div className="flex flex-col items-center justify-center gap-y-8">
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

							<div className="border-4 rounded-lg border-[var(--foreground-muted)] overflow-hidden p-4">
								<Image
									src={`/maps/${countriesData[randomCountryIndex].code}.svg`}
									width={300}
									height={200}
									alt="Country outline"
									className="w-full"
								/>
							</div>

							{showHint && (
								<div className="text-lg italic mb-4 bg-[var(--foreground-muted)] bg-opacity-20 p-3 rounded-lg">
									Hint: {countriesData[randomCountryIndex].hint}
								</div>
							)}

							<form
								onSubmit={(e) => e.preventDefault()}
								className="w-full mt-4"
							>
								<input
									className="w-full bg-[var(--background)] px-4 py-3 outline-none text-[var(--foreground)] rounded-lg border-2 transition-colors duration-300 border-solid focus:border-[var(--main)] border-[var(--foreground-muted)]"
									name="text"
									placeholder="Enter country name..."
									type="text"
									value={inputValue}
									onChange={handleChange}
									autoComplete="off"
									autoFocus
								/>
							</form>

							<div className="flex gap-4 justify-center mt-4">
								<button
									onClick={() => setShowHint(true)}
									className="py-2 px-4 border-2 border-[var(--main)] text-[var(--main)] rounded-lg hover:bg-[var(--main)] hover:text-[#eeeeee] transition-colors duration-300"
									disabled={showHint}
								>
									Show Hint
								</button>
								<button
									onClick={handleSkip}
									className="py-2 px-4 border-2 border-[var(--error)] text-[var(--error)] rounded-lg hover:bg-[var(--error)] hover:text-[#eeeeee] transition-colors duration-300"
								>
									Skip
								</button>
							</div>
						</div>
					)}
				</div>
			)}
		</div>
	);
}
