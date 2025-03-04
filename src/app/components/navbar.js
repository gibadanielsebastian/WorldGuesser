"use client";

import Link from "next/link";
import MenuIcon from "/public/menu.svg";
import "/src/app/globals.css";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Kablammo, Itim } from "next/font/google";
import { useRouter } from "next/navigation";

const kablammo = Kablammo({
	subsets: ["latin"],
	weight: "400",
});

const itim = Itim({
	subsets: ["latin"],
	weight: "400",
});

const NavLinks = ({ setIsMenuOpen, isMenuOpen }) => {
	const currentPage = usePathname();
	const router = useRouter();
	return (
		<>
			{currentPage === "/" ? (
				<button
					type="button"
					onClick={() => {
						setIsMenuOpen && setIsMenuOpen(!isMenuOpen);
						router.push("/gamemodes");
					}}
				>
					Game Modes
				</button>
			) : (
				<button
					type="button"
					onClick={() => {
						setIsMenuOpen && setIsMenuOpen(!isMenuOpen);
						router.push("/");
					}}
				>
					Home
				</button>
			)}
			<button
				type="button"
				onClick={() => {
					setIsMenuOpen && setIsMenuOpen(!isMenuOpen);
					router.push("/");
				}}
			>
				Records
			</button>
		</>
	);
};

export default function Navbar() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<nav className="top-0 h-16 flex flex-wrap justify-between items-center p-4">
			<Link href="/">
				<h1 className={`font-extrabold ${kablammo.className} ml-8 text-3xl`}>
					World Guesser
				</h1>
			</Link>
			<ul
				className={`flex justify-evenly items-center ${itim.className} text-2xl gap-8 mr-8`}
			>
				<li className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
					<MenuIcon className="w-8 h-8 text-[var(--foreground)]"></MenuIcon>
				</li>

				<div className="hidden md:flex gap-8">
					<NavLinks />
				</div>
			</ul>
			{isMenuOpen && (
				<div
					className={`flex flex-col items-center basis-full gap-4 ${itim.className} text-2xl mt-4 `}
				>
					<NavLinks setIsMenuOpen={setIsMenuOpen} isMenuOpen={isMenuOpen} />
				</div>
			)}
		</nav>
	);
}
