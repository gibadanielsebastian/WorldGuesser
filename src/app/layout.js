import "./globals.css";
import dynamic from "next/dynamic";
import Footer from "./components/footer";
import { SettingsProvider } from "./contexts/SettingsContext";

// Dynamically import Navbar component with SSR disabled
const Navbar = dynamic(() => import("./components/navbar.js"), {
	ssr: true,
	loading: () => <div className="h-16"></div>, // Simple placeholder with the same height
});

// Separate metadata and viewport exports as required by Next.js
export const metadata = {
	title: "World Guesser - Test Your Geography Knowledge",
	description:
		"Challenge yourself with geography quizzes including Guess the Flag, Name the Country, and Find the Country games.",
};

// Move viewport and themeColor to viewport export
export const viewport = {
	width: "device-width",
	initialScale: 1,
	themeColor: "#00adb5",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body>
				<SettingsProvider>
					<Navbar />
					<main>{children}</main>
					<Footer />
				</SettingsProvider>
			</body>
		</html>
	);
}
