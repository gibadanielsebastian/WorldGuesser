import Link from "next/link";
import Image from "next/image";
import { Itim } from "next/font/google";

const itim = Itim({
	subsets: ["latin"],
	weight: "400",
});

export default function HowToPlay() {
	const gameModesGuides = [
		{
			title: "Guess the Flag",
			description:
				"A flag will be shown and you need to type the correct name of the country it belongs to.",
			steps: [
				"A random country flag will be displayed on the screen",
				"Type the name of the country in the input box",
				"If you're correct, you'll get a point and 5 seconds bonus time",
				"If you're stuck, you can view a hint about the country",
				"You can skip the current flag, but you'll lose a point",
			],
			tips: [
				"Common spelling variations are accepted",
				"The game is case-insensitive, so don't worry about capitalization",
				"Focus on common flags first to build your confidence",
				"Save hints for when you really need them",
			],
		},
		{
			title: "Name the Country",
			description:
				"A country shape will be shown and you need to type the correct name of the country.",
			steps: [
				"A random country outline will be displayed on the screen",
				"Type the name of the country in the input box",
				"If you're correct, you'll get a point and 5 seconds bonus time",
				"If you're stuck, you can view a hint about the country",
				"You can skip the current country, but you'll lose a point",
			],
			tips: [
				"Look for distinctive shapes that are easy to recognize",
				"Consider the size of the country to narrow down possibilities",
				"Some countries have very similar shapes, so pay attention to details",
				"The game is case-insensitive, so don't worry about capitalization",
			],
		},
		{
			title: "Find the Country",
			description:
				"A country name will be displayed and you need to find and click on it on the world map.",
			steps: [
				"A random country name will be shown at the top",
				"Find and click on that country on the world map",
				"If you're correct, you'll get a point and 5 seconds bonus time",
				"If you're wrong, the correct country will be highlighted",
				"The game automatically moves to the next country after your answer",
			],
			tips: [
				"Start with continents to narrow down your search",
				"Pay attention to borders and coastlines",
				"Some smaller countries might be harder to spot",
				"Practice remembering the general location of countries by region",
			],
		},
	];

	return (
		<div className="flex flex-col justify-center items-center min-h-[calc(100vh-10rem)] py-8 px-4">
			<div className="card max-w-4xl mx-auto w-full">
				<h1 className={`text-4xl ${itim.className} mb-6 text-center`}>
					How to Play
				</h1>

				<div className="mb-8">
					<h2 className={`text-2xl ${itim.className} mb-4`}>Game Basics</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
						<div className="bg-[var(--foreground-muted)] bg-opacity-10 p-4 rounded-lg flex flex-col items-center text-center">
							<div className="text-3xl mb-2">⏱️</div>
							<h3 className="font-bold mb-2">Time-Based Challenge</h3>
							<p>
								Each game lasts 120 seconds. Answer correctly to earn bonus
								time!
							</p>
						</div>
						<div className="bg-[var(--foreground-muted)] bg-opacity-10 p-4 rounded-lg flex flex-col items-center text-center">
							<div className="text-3xl mb-2">🏆</div>
							<h3 className="font-bold mb-2">Score Points</h3>
							<p>
								Each correct answer earns you one point. Try to beat your high
								score!
							</p>
						</div>
						<div className="bg-[var(--foreground-muted)] bg-opacity-10 p-4 rounded-lg flex flex-col items-center text-center">
							<div className="text-3xl mb-2">💡</div>
							<h3 className="font-bold mb-2">Hints Available</h3>
							<p>Stuck on a challenge? Use the hint feature to get a clue!</p>
						</div>
					</div>
					<p>
						World Guesser offers three exciting game modes to test your
						geography knowledge. Each game starts with a 120-second countdown,
						and you can earn bonus time by answering correctly. Your highest
						scores are saved automatically!
					</p>
				</div>

				{gameModesGuides.map((game, index) => (
					<div key={index} className="mb-8 border-t-2 pt-6">
						<h2 className={`text-2xl ${itim.className} mb-4`}>{game.title}</h2>
						<p className="mb-4">{game.description}</p>

						<div className="mb-4">
							<h3 className="font-bold mb-2">How to Play:</h3>
							<ol className="list-decimal pl-5 space-y-1">
								{game.steps.map((step, i) => (
									<li key={i}>{step}</li>
								))}
							</ol>
						</div>

						<div>
							<h3 className="font-bold mb-2">Tips:</h3>
							<ul className="list-disc pl-5 space-y-1">
								{game.tips.map((tip, i) => (
									<li key={i}>{tip}</li>
								))}
							</ul>
						</div>
					</div>
				))}

				<div className="flex justify-center mt-8">
					<Link href="/gamemodes" className="btn-primary text-xl">
						Start Playing
					</Link>
				</div>
			</div>
		</div>
	);
}
