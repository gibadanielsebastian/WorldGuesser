import Image from "next/image";
import Link from "next/link";
import { Itim } from "next/font/google";

// Optimize font loading
const itim = Itim({
	subsets: ["latin"],
	weight: "400",
	display: "swap",
});

// Navigation buttons data
const navigationButtons = [
	{ text: "How to play?", href: "/how-to-play" },
	{ text: "Game Modes", href: "/gamemodes" },
	{ text: "Settings", href: "/settings" },
];

export default function Home() {
	return (
		<div className="flex justify-center items-center min-h-[calc(100vh-10rem)]">
			<div className="flex flex-col items-center gap-8">
				<Image
					src="/logo.webp"
					width="256"
					height="256"
					alt="World Guesser logo"
					priority
					quality={90}
					rel="preload"
					fetchPriority="high"
					as="image"
				/>

				<div className="flex flex-col gap-4">
					{navigationButtons.map(({ text, href }) => (
						<Link href={href} key={text} className="w-full">
							<button
								className="w-full group relative overflow-hidden rounded-lg border-2 border-transparent bg-[var(--main)] px-6 py-3 font-medium text-[#eeeeee] transition-all duration-300 ease-in-out hover:border-2 hover:border-[var(--main)] hover:bg-transparent hover:text-[var(--main)]"
								aria-label={text}
							>
								<span className="absolute inset-0 bg-[var(--main)] transition-transform duration-300 ease-in-out group-hover:translate-x-full"></span>

								<span
									className={`relative flex items-center justify-center gap-2 ${itim.className} text-xl`}
								>
									{text}
								</span>
							</button>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
}
