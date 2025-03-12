"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useMemo, useCallback } from "react";
import { Itim } from "next/font/google";
import { useSettings } from "../../contexts/SettingsContext";

const itim = Itim({
	subsets: ["latin"],
	weight: "400",
});

export default function FindTheCountry() {
	const { difficulty, soundEnabled } = useSettings();

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

	// All possible countries organized by difficulty
	const allCountriesData = useMemo(
		() => [
			// Easy countries - most recognizable shapes
			{ code: "US", name: "United States", difficulty: "easy" },
			{ code: "CN", name: "China", difficulty: "easy" },
			{ code: "IN", name: "India", difficulty: "easy" },
			{ code: "BR", name: "Brazil", difficulty: "easy" },
			{ code: "RU", name: "Russia", difficulty: "easy" },
			{ code: "JP", name: "Japan", difficulty: "easy" },
			{ code: "DE", name: "Germany", difficulty: "easy" },
			{ code: "GB", name: "United Kingdom", difficulty: "easy" },
			{ code: "FR", name: "France", difficulty: "easy" },
			{ code: "IT", name: "Italy", difficulty: "easy" },
			{ code: "CA", name: "Canada", difficulty: "easy" },
			{ code: "AU", name: "Australia", difficulty: "easy" },
			{ code: "ES", name: "Spain", difficulty: "easy" },
			{ code: "MX", name: "Mexico", difficulty: "easy" },
			{ code: "KR", name: "South Korea", difficulty: "easy" },
			{ code: "ID", name: "Indonesia", difficulty: "easy" },
			{ code: "TR", name: "Turkey", difficulty: "easy" },
			{ code: "SA", name: "Saudi Arabia", difficulty: "easy" },
			{ code: "ZA", name: "South Africa", difficulty: "easy" },
			{ code: "AR", name: "Argentina", difficulty: "easy" },

			// Medium difficulty countries
			{ code: "PL", name: "Poland", difficulty: "medium" },
			{ code: "UA", name: "Ukraine", difficulty: "medium" },
			{ code: "EG", name: "Egypt", difficulty: "medium" },
			{ code: "VN", name: "Vietnam", difficulty: "medium" },
			{ code: "IR", name: "Iran", difficulty: "medium" },
			{ code: "TH", name: "Thailand", difficulty: "medium" },
			{ code: "PH", name: "Philippines", difficulty: "medium" },
			{ code: "MY", name: "Malaysia", difficulty: "medium" },
			{ code: "CO", name: "Colombia", difficulty: "medium" },
			{ code: "NL", name: "Netherlands", difficulty: "medium" },
			{ code: "BE", name: "Belgium", difficulty: "medium" },
			{ code: "SE", name: "Sweden", difficulty: "medium" },
			{ code: "CH", name: "Switzerland", difficulty: "medium" },
			{ code: "AT", name: "Austria", difficulty: "medium" },
			{ code: "PT", name: "Portugal", difficulty: "medium" },
			{ code: "GR", name: "Greece", difficulty: "medium" },
			{ code: "CZ", name: "Czech Republic", difficulty: "medium" },
			{ code: "NO", name: "Norway", difficulty: "medium" },
			{ code: "FI", name: "Finland", difficulty: "medium" },
			{ code: "DK", name: "Denmark", difficulty: "medium" },

			// Hard difficulty countries - less distinct shapes or smaller countries
			{ code: "BD", name: "Bangladesh", difficulty: "hard" },
			{ code: "NG", name: "Nigeria", difficulty: "hard" },
			{ code: "ET", name: "Ethiopia", difficulty: "hard" },
			{ code: "TZ", name: "Tanzania", difficulty: "hard" },
			{ code: "MM", name: "Myanmar", difficulty: "hard" },
			{ code: "KE", name: "Kenya", difficulty: "hard" },
			{ code: "MA", name: "Morocco", difficulty: "hard" },
			{ code: "UZ", name: "Uzbekistan", difficulty: "hard" },
			{ code: "PE", name: "Peru", difficulty: "hard" },
			{ code: "AO", name: "Angola", difficulty: "hard" },
			{ code: "LK", name: "Sri Lanka", difficulty: "hard" },
			{ code: "CI", name: "Ivory Coast", difficulty: "hard" },
			{ code: "GH", name: "Ghana", difficulty: "hard" },
			{ code: "RO", name: "Romania", difficulty: "hard" },
			{ code: "CL", name: "Chile", difficulty: "hard" },
			{ code: "BW", name: "Botswana", difficulty: "hard" },
			{ code: "TN", name: "Tunisia", difficulty: "hard" },
			{ code: "BO", name: "Bolivia", difficulty: "hard" },
			{ code: "CM", name: "Cameroon", difficulty: "hard" },
			{ code: "RS", name: "Serbia", difficulty: "hard" },
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

		// Shuffle and limit to the count for the current difficulty
		return filtered
			.sort(() => Math.random() - 0.5)
			.slice(0, difficultySettings[difficulty].countriesPerGame);
	}, [allCountriesData, difficulty, difficultySettings]);

	const [isStarted, setIsStarted] = useState(false);
	const [isOn, setIsOn] = useState(false);
	const [countdown, setCountdown] = useState(5);

	const [randomCountryIndex, setRandomCountryIndex] = useState(
		Math.floor(Math.random() * countriesData.length)
	);
	const [usedCountries, setUsedCountries] = useState([]);

	const [isCorrect, setIsCorrect] = useState(0);
	const [isWrong, setIsWrong] = useState(0);
	const [timeLeft, setTimeLeft] = useState(
		difficultySettings[difficulty].timeLimit
	);
	const [selectedCountry, setSelectedCountry] = useState(null);
	const [showResult, setShowResult] = useState(false);
	const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);

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

	// Game timer
	useEffect(() => {
		if (isOn && timeLeft > 0) {
			const timer = setInterval(() => {
				setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
			}, 1000);

			return () => clearInterval(timer);
		} else if (timeLeft === 0) {
			// Save the score to localStorage
			const newRecord = {
				id: Date.now(),
				score: isCorrect,
				date: new Date().toISOString().split("T")[0],
				time: difficultySettings[difficulty].timeLimit, // Original time limit
				gameMode: "Find the Country",
				difficulty: difficulty,
			};

			// Get existing records
			const existingRecordsJSON = localStorage.getItem("findTheCountryRecords");
			const existingRecords = existingRecordsJSON
				? JSON.parse(existingRecordsJSON)
				: [];

			// Add new record and sort by score (highest first)
			const updatedRecords = [...existingRecords, newRecord].sort(
				(a, b) => b.score - a.score
			);

			// Keep only top 10 records
			const topRecords = updatedRecords.slice(0, 10);

			// Save back to localStorage
			localStorage.setItem("findTheCountryRecords", JSON.stringify(topRecords));

			// Reset the game
			setIsStarted(false);
			setIsOn(false);
			setTimeLeft(difficultySettings[difficulty].timeLimit);
			setIsCorrect(0);
			setIsWrong(0);
			setUsedCountries([]);
			setSelectedCountry(null);
			setShowResult(false);
		}
	}, [isOn, timeLeft, isCorrect, difficulty, difficultySettings]);

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

	const handleCountryClick = (code) => {
		setSelectedCountry(code);
		const currentCountry = countriesData[randomCountryIndex];

		if (code === currentCountry.code) {
			setIsAnswerCorrect(true);
			setIsCorrect((prev) => prev + 1);
			setTimeLeft((prev) => prev + difficultySettings[difficulty].bonusTime); // Bonus time based on difficulty
			playSound("correct");
		} else {
			setIsAnswerCorrect(false);
			setIsWrong((prev) => prev + 1);
			// Apply time penalty based on difficulty
			if (difficultySettings[difficulty].penalty > 0) {
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
			setRandomCountryIndex(getRandomCountry());
		}, 1500);
	};

	return (
		<div className="flex flex-col justify-center items-center min-h-[calc(100vh-10rem)] py-8 px-4">
			{!isStarted && (
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
						<p className="text-sm mt-2">
							Change difficulty in{" "}
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
			{isStarted && (
				<div className="card max-w-2xl mx-auto text-center">
					<h1 className={`text-4xl ${itim.className} mb-6`}>
						Find the Country
					</h1>

					{!isOn ? (
						<div className="text-3xl font-bold mb-4">
							Starting in: {countdown}
						</div>
					) : (
						<div className="flex flex-col items-center justify-center gap-y-8">
							<div className="flex justify-between w-full mb-4">
								<div className="text-xl font-semibold">
									Time:{" "}
									<span className={timeLeft < 30 ? "text-[var(--error)]" : ""}>
										{timeLeft}s
									</span>
								</div>
								<div className="text-xl">
									<span className="text-[var(--success)]">✓ {isCorrect}</span> /
									<span className="text-[var(--error)]">✗ {isWrong}</span>
								</div>
							</div>

							<div className="text-3xl font-bold mb-2">
								Find: {countriesData[randomCountryIndex].name}
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

							<div className="border-4 rounded-lg border-[var(--foreground-muted)] overflow-hidden relative">
								<Image
									src="/world-map.svg"
									width={600}
									height={400}
									alt="World Map"
									className="w-full"
									useMap="#worldmap"
								/>

								{/* This would be replaced with a proper clickable map implementation */}
								<div className="absolute inset-0 flex items-center justify-center bg-[var(--foreground-muted)] bg-opacity-50">
									<p className="text-center p-4 bg-[var(--background)] rounded-lg">
										In a full implementation, this would be an interactive map
										where you could click on countries. <br />
										<br />
										For now, let&apos;s simulate with buttons:
									</p>
								</div>
							</div>

							<div className="flex flex-wrap gap-2 justify-center mt-4 max-w-2xl">
								{countriesData.map((country) => (
									<button
										key={country.code}
										onClick={() => handleCountryClick(country.code)}
										className={`py-1 px-3 border rounded-lg transition-colors duration-300 ${
											selectedCountry === country.code
												? showResult && isAnswerCorrect
													? "bg-[var(--success)] text-white border-[var(--success)]"
													: showResult && !isAnswerCorrect
													? "bg-[var(--error)] text-white border-[var(--error)]"
													: "bg-[var(--main)] text-white border-[var(--main)]"
												: "border-[var(--foreground-muted)] hover:border-[var(--main)]"
										}`}
										disabled={showResult}
									>
										{country.name}
									</button>
								))}
							</div>
						</div>
					)}
				</div>
			)}
		</div>
	);
}
