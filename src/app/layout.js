import "./globals.css";
import Navbar from "./components/navbar.js";
import Footer from "./components/footer";
import { SettingsProvider } from "./contexts/SettingsContext";

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<title>World Guesser</title>
			<meta name="description" content="Put your description here."></meta>
			<body>
				<SettingsProvider>
					<Navbar />
					{children}
					<Footer />
				</SettingsProvider>
			</body>
		</html>
	);
}
