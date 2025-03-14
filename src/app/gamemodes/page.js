import { Itim } from "next/font/google";
import Link from "next/link";
import { memo } from "react";

// Optimize font loading
const itim = Itim({
	subsets: ["latin"],
	weight: "400",
	display: "swap",
});

// Game mode data defined once to avoid recreating on each render
const gameModes = [
	{
		title: "Guess the Flag",
		content:
			"You will be shown a flag and you have to guess the country it belongs to by writing the name in the box. Try to be as fast as possible to get the highest score!",
		link: "/gamemodes/guess-the-flag",
	},
	{
		title: "Name the Country",
		content:
			"A country will be shown and you have to write the name of the country in the box. Try to be as fast as possible to get the highest score!",
		link: "/gamemodes/name-the-country",
	},
	{
		title: "Find the Country",
		content:
			"The name of a country will be displayed and you need to find it on the map. Try to be as fast as possible to get the highest score!",
		link: "/gamemodes/find-the-country",
	},
];

// Individual game card component to optimize rendering
const GameCard = memo(({ title, content, link }) => (
	<div className="flex flex-col h-full">
		<div className="border-2 rounded-lg p-6 flex-grow">
			<h2 className={`${itim.className} text-2xl mb-4 text-[var(--main)]`}>
				{title}
			</h2>
			<p>{content}</p>
		</div>
		<Link
			href={link}
			className={`p-4 mt-4 bg-[var(--main)] text-xl ${itim.className} text-center rounded-lg transition-all duration-300 hover:opacity-90`}
			prefetch={false} // Disable prefetch to reduce initial load
		>
			Play {title}
		</Link>
	</div>
));

GameCard.displayName = "GameCard";

function GameModes() {
	return (
		<div className="flex flex-col justify-center items-center min-h-[calc(100vh-10rem)] py-8 px-4">
			<div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
				{gameModes.map((mode) => (
					<GameCard
						key={mode.title}
						title={mode.title}
						content={mode.content}
						link={mode.link}
					/>
				))}
			</div>
		</div>
	);
}

export default memo(GameModes);
