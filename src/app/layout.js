import "./globals.css";
import "./components/navbar.js";
import Navbar from "./components/navbar.js";
import Footer from "./components/footer";

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body>
				<Navbar />
				{children}
				<Footer />
			</body>
		</html>
	);
}
