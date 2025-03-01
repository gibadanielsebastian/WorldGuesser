"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Kablammo, Itim } from "next/font/google";

const kablammo = Kablammo({
	subsets: ["latin"],
	weight: "400",
});

const itim = Itim({
	subsets: ["latin"],
	weight: "400",
});

export default function Navbar() {
	const currentPage = usePathname();

	return (
		<nav className=" fixed top-0 left-0 w-full h-16 flex justify-between items-center p-4">
			<Link href="/">
				<h1 className={`font-extrabold ${kablammo.className} ml-8 text-4xl`}>
					World Guesser
				</h1>
			</Link>
			<ul
				className={`flex justify-evenly items-center ${itim.className} text-2xl gap-8 mr-8`}
			>
				<li>
					{currentPage === "/" ? (
						<Link href="/gamemodes">Game Modes</Link>
					) : (
						<Link href="/">Menu</Link>
					)}
				</li>
				<li>
					<Link href="/">Records</Link>
				</li>
			</ul>
		</nav>
	);
}
