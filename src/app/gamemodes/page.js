import { Itim } from "next/font/google";

const itim = Itim({
	subsets: ["latin"],
	weight: "400",
});

export default function GameModes() {
	return (
		<div className="flex min-h-[calc(100vh-12rem)] justify-center items-center overflow-hidden">
			<div className="flex flex-col md:flex-row md:w-3/4 gap-16 place-items-center">
				{["Guess the Flag", "Name the County", "Find the Country"].map(
					(text) => {
						const content = {
							"Guess the Flag":
								"You will be shown a flag and you have to guess the country it belongs to by writing the name in the box. Try to be as fast as possible to get the highest score!",
							"Name the County":
								"A country will be shown and you have to write the name of the country in the box. Try to be as fast as possible to get the highest score!",
							"Find the Country":
								"The name of a country will be shown and you have to find it on the map. Try to be as fast as possible to get the highest score!",
						}[text];

						return (
							<div key={text} className="flex flex-col w-3/4 gap-4">
								<div className="border-2 rounded-lg p-4">{content}</div>
								<button
									className={`p-4 bg-[var(--main)] text-xl ${itim.className}`}
								>
									{text}
								</button>
							</div>
						);
					}
				)}
			</div>
		</div>
	);
}
