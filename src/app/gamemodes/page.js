import { Itim } from "next/font/google";
import Link from "next/link";

const itim = Itim({
	subsets: ["latin"],
	weight: "400",
});

export default function GameModes() {
	return (
		<div className="flex md:h-[calc(100vh-10rem)] justify-center items-center overflow-hidden">
			<div className="flex flex-col mt-32 mb-16 md:mt-0 md:mb-0 md:flex-row md:w-3/4 gap-16 place-items-center">
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
							<div key={text} className="flex flex-col w-3/4 gap-4">
								<div className="border-2 rounded-lg p-4">{content}</div>
								<Link
									href={links}
									className={`p-4 bg-[var(--main)] text-xl ${itim.className} text-center`}
								>
									{text}
								</Link>
							</div>
						);
					}
				)}
			</div>
		</div>
	);
}
