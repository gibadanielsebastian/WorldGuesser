"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useMemo, useCallback } from "react";
import { Itim } from "next/font/google";

const itim = Itim({
	subsets: ["latin"],
	weight: "400",
});

export default function FindTheCountry() {
	const countriesData = useMemo(
		() => [
			{ code: "US", name: "United States" },
			{ code: "CN", name: "China" },
			{ code: "IN", name: "India" },
			{ code: "BR", name: "Brazil" },
			{ code: "RU", name: "Russia" },
			{ code: "JP", name: "Japan" },
			{ code: "DE", name: "Germany" },
			{ code: "GB", name: "United Kingdom" },
			{ code: "FR", name: "France" },
			{ code: "IT", name: "Italy" },
			{ code: "CA", name: "Canada" },
			{ code: "AU", name: "Australia" },
			{ code: "ES", name: "Spain" },
			{ code: "MX", name: "Mexico" },
			{ code: "KR", name: "South Korea" },
			{ code: "ID", name: "Indonesia" },
			{ code: "TR", name: "Turkey" },
			{ code: "SA", name: "Saudi Arabia" },
			{ code: "ZA", name: "South Africa" },
			{ code: "AR", name: "Argentina" },
		],
		[]
	);

	const [isStarted, setIsStarted] = useState(false);
	const [isOn, setIsOn] = useState(false);
	const [countdown, setCountdown] = useState(5);

	const [randomCountryIndex, setRandomCountryIndex] = useState(
		Math.floor(Math.random() * countriesData.length)
	);
	const [usedCountries, setUsedCountries] = useState([]);

	const [isCorrect, setIsCorrect] = useState(0);
	const [isWrong, setIsWrong] = useState(0);
	const [timeLeft, setTimeLeft] = useState(120);
	const [selectedCountry, setSelectedCountry] = useState(null);
	const [showResult, setShowResult] = useState(false);
	const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);

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
				gameMode: "Find the Country",
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
			setTimeLeft(120);
			setIsCorrect(0);
			setIsWrong(0);
			setUsedCountries([]);
			setSelectedCountry(null);
			setShowResult(false);
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

	const handleCountryClick = (code) => {
		setSelectedCountry(code);
		const currentCountry = countriesData[randomCountryIndex];

		if (code === currentCountry.code) {
			setIsAnswerCorrect(true);
			setIsCorrect((prev) => prev + 1);
			setTimeLeft((prev) => prev + 5); // Bonus time
		} else {
			setIsAnswerCorrect(false);
			setIsWrong((prev) => prev + 1);
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
