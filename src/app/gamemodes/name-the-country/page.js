"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useMemo, useCallback } from "react";
import { Itim } from "next/font/google";

const itim = Itim({
	subsets: ["latin"],
	weight: "400",
});

export default function NameTheCountry() {
	const countriesData = useMemo(
		() => [
			{
				code: "US",
				name: "United States",
				hint: "Second largest country in North America",
			},
			{ code: "CN", name: "China", hint: "Most populous country in the world" },
			{
				code: "IN",
				name: "India",
				hint: "Second most populous country in the world",
			},
			{ code: "BR", name: "Brazil", hint: "Largest country in South America" },
			{ code: "RU", name: "Russia", hint: "Largest country by land area" },
			{ code: "JP", name: "Japan", hint: "Island nation in East Asia" },
			{ code: "DE", name: "Germany", hint: "Central European country" },
			{
				code: "GB",
				name: "United Kingdom",
				hint: "Island nation in Northwestern Europe",
			},
			{
				code: "FR",
				name: "France",
				hint: "Western European country known for the Eiffel Tower",
			},
			{
				code: "IT",
				name: "Italy",
				hint: "Southern European country shaped like a boot",
			},
			{
				code: "CA",
				name: "Canada",
				hint: "Second largest country by land area",
			},
			{
				code: "AU",
				name: "Australia",
				hint: "Country that is also a continent",
			},
			{ code: "ES", name: "Spain", hint: "Southwestern European country" },
			{
				code: "MX",
				name: "Mexico",
				hint: "North American country south of the US",
			},
			{ code: "KR", name: "South Korea", hint: "East Asian country" },
			{ code: "ID", name: "Indonesia", hint: "Southeast Asian archipelago" },
			{ code: "TR", name: "Turkey", hint: "Transcontinental country" },
			{ code: "SA", name: "Saudi Arabia", hint: "Middle Eastern country" },
			{
				code: "ZA",
				name: "South Africa",
				hint: "Southernmost country in Africa",
			},
			{
				code: "AR",
				name: "Argentina",
				hint: "South American country known for tango",
			},
		],
		[]
	);

	const [isStarted, setIsStarted] = useState(false);
	const [isOn, setIsOn] = useState(false);
	const [countdown, setCountdown] = useState(5);

	const [inputValue, setInputValue] = useState("");
	const [randomCountryIndex, setRandomCountryIndex] = useState(
		Math.floor(Math.random() * countriesData.length)
	);
	const [usedCountries, setUsedCountries] = useState([]);
	const [showHint, setShowHint] = useState(false);

	const [isCorrect, setIsCorrect] = useState(0);
	const [isWrong, setIsWrong] = useState(0);
	const [timeLeft, setTimeLeft] = useState(120);

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
				time: 120, // Original time limit
				gameMode: "Name the Country",
			};

			// Get existing records
			const existingRecordsJSON = localStorage.getItem("nameTheCountryRecords");
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
			localStorage.setItem("nameTheCountryRecords", JSON.stringify(topRecords));

			// Reset the game
			setIsStarted(false);
			setIsOn(false);
			setTimeLeft(120);
			setIsCorrect(0);
			setIsWrong(0);
			setInputValue("");
			setUsedCountries([]);
			setShowHint(false);
		}
	}, [isOn, timeLeft, isCorrect]);

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
			setTimeLeft((prev) => prev + 5); // Bonus time
			setInputValue("");
			setUsedCountries((prev) => [...prev, randomCountryIndex]);
			setRandomCountryIndex(getRandomCountry());
			setShowHint(false);
		}
	};

	const handleSkip = () => {
		setIsWrong((prev) => prev + 1);
		setInputValue("");
		setUsedCountries((prev) => [...prev, randomCountryIndex]);
		setRandomCountryIndex(getRandomCountry());
		setShowHint(false);
	};

	return (
		<div className="flex flex-col justify-center items-center min-h-[calc(100vh-10rem)] py-8 px-4">
			{!isStarted && (
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
								<div className="text-lg italic">
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
