import { Itim } from "next/font/google";
import Link from "next/link";

const itim = Itim({
	subsets: ["latin"],
	weight: "400",
});

export default function GameModes() {
	return (
		<div className="flex flex-col justify-center items-center min-h-[calc(100vh-10rem)] py-8 px-4">
			<div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
				{["Guess the Flag", "Name the Country", "Find the Country"].map(
					(text) => {
						const content = {
							"Guess the Flag":
								"You will be shown a flag and you have to guess the country it belongs to by writing the name in the box. Try to be as fast as possible to get the highest score!",
							"Name the Country":
								"A country will be shown and you have to write the name of the country in the box. Try to be as fast as possible to get the highest score!",
							"Find the Country":
								"The name of a country will be shown and you have to find it on the map. Try to be as fast as possible to get the highest score!",
						}[text];

						const links = {
							"Guess the Flag": "/gamemodes/guess-the-flag",
							"Name the Country": "/gamemodes/name-the-country",
							"Find the Country": "/gamemodes/find-the-country",
						}[text];

						return (
							<div key={text} className="flex flex-col h-full">
								<div className="border-2 rounded-lg p-6 flex-grow">
									<h2
										className={`${itim.className} text-2xl mb-4 text-[var(--main)]`}
									>
										{text}
									</h2>
									<p>{content}</p>
								</div>
								<Link
									href={links}
									className={`p-4 mt-4 bg-[var(--main)] text-xl ${itim.className} text-center rounded-lg transition-all duration-300 hover:opacity-90`}
								>
									Play {text}
								</Link>
							</div>
						);
					}
				)}
			</div>
		</div>
	);
}
