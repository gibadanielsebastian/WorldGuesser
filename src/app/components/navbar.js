"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, memo } from "react";
import { Kablammo, Itim } from "next/font/google";
import { useRouter } from "next/navigation";

// Optimize font loading with subset preload
const kablammo = Kablammo({
	subsets: ["latin"],
	weight: "400",
	display: "swap", // Add display swap for better performance
	preload: true,
	fallback: ["system-ui", "sans-serif"], // Add fallback
});

const itim = Itim({
	subsets: ["latin"],
	weight: "400",
	display: "swap",
	preload: true,
	fallback: ["system-ui", "sans-serif"],
});

// Mobile menu component separated for better code splitting
const MobileMenu = memo(
	({ isMenuOpen, navItems, pathname, handleNavigation }) => {
		if (!isMenuOpen) return null;

		return (
			<div className="fixed inset-0 bg-[var(--background)] z-40 transform transition-transform duration-300 ease-in-out translate-x-0 md:hidden">
				<div className="flex flex-col items-center justify-center min-h-screen">
					<ul
						className={`flex flex-col items-center gap-8 ${itim.className} text-3xl`}
					>
						{navItems.map((item) => (
							<li key={item.path} className="w-full text-center">
								<button
									type="button"
									className={`relative px-8 py-4 w-full transition-colors ${
										pathname === item.path
											? "text-[var(--main)]"
											: "hover:text-[var(--main)]"
									}`}
									onClick={() => handleNavigation(item.path)}
								>
									{item.label}
									{pathname === item.path && (
										<span className="absolute bottom-0 left-1/4 w-1/2 h-0.5 bg-[var(--main)]"></span>
									)}
								</button>
							</li>
						))}
					</ul>
				</div>
			</div>
		);
	}
);

MobileMenu.displayName = "MobileMenu";

function Navbar() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const pathname = usePathname();
	const router = useRouter();

	// Close menu when route changes or on window resize
	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth >= 768) {
				setIsMenuOpen(false);
			}
		};

		window.addEventListener("resize", handleResize);

		// Close menu when pathname changes
		setIsMenuOpen(false);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, [pathname]);

	// Prevent scrolling when menu is open
	useEffect(() => {
		if (isMenuOpen) {
			document.body.classList.add("overflow-hidden");
		} else {
			document.body.classList.remove("overflow-hidden");
		}

		return () => {
			document.body.classList.remove("overflow-hidden");
		};
	}, [isMenuOpen]);

	const handleNavigation = (path) => {
		setIsMenuOpen(false);
		router.push(path);
	};

	// Memoize navigation items to prevent unnecessary recalculations
	const navItems = [
		{
			path: pathname === "/" ? "/gamemodes" : "/",
			label: pathname === "/" ? "Game Modes" : "Home",
		},
		{ path: "/records", label: "Records" },
	];

	return (
		<nav className="relative z-50">
			<div className="h-16 flex justify-between items-center p-4">
				<Link href="/">
					<h1 className={`font-extrabold ${kablammo.className} ml-8 text-3xl`}>
						World Guesser
					</h1>
				</Link>

				{/* Desktop Menu */}
				<div className="hidden md:flex">
					<ul
						className={`flex items-center ${itim.className} text-2xl gap-8 mr-8`}
					>
						{navItems.map((item) => (
							<li key={item.path}>
								<button
									type="button"
									className={`relative px-4 py-2 transition-colors hover:text-[var(--main)] ${
										pathname === item.path ? "text-[var(--main)]" : ""
									}`}
									onClick={() => handleNavigation(item.path)}
								>
									{item.label}
									{pathname === item.path && (
										<span className="absolute bottom-0 left-0 w-full h-0.5 bg-[var(--main)]"></span>
									)}
								</button>
							</li>
						))}
					</ul>
				</div>

				{/* Mobile Menu Button */}
				<button
					type="button"
					onClick={() => setIsMenuOpen(!isMenuOpen)}
					className="md:hidden z-50 mr-8 p-2 transition-colors hover:text-[var(--main)]"
					aria-expanded={isMenuOpen}
					aria-label="Toggle navigation menu"
				>
					<div className="relative w-8 h-6">
						<span
							className={`absolute h-1 w-full bg-current rounded-lg transform transition-all duration-300 ${
								isMenuOpen ? "rotate-45 top-3" : "top-0"
							}`}
						></span>
						<span
							className={`absolute h-1 w-full bg-current rounded-lg transform transition-all duration-300 ${
								isMenuOpen ? "opacity-0" : "top-2.5 opacity-100"
							}`}
						></span>
						<span
							className={`absolute h-1 w-full bg-current rounded-lg transform transition-all duration-300 ${
								isMenuOpen ? "-rotate-45 top-3" : "top-5"
							}`}
						></span>
					</div>
				</button>
			</div>

			{/* Mobile Menu Overlay - Only rendered when open */}
			<MobileMenu
				isMenuOpen={isMenuOpen}
				navItems={navItems}
				pathname={pathname}
				handleNavigation={handleNavigation}
			/>
		</nav>
	);
}

export default memo(Navbar);
