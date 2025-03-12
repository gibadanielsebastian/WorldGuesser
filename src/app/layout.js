import "./globals.css";
import Navbar from "./components/navbar.js";
import Footer from "./components/footer";
import { SettingsProvider } from "./contexts/SettingsContext";

export default function RootLayout({ children }) {
	return (
		<html lang="en">
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
