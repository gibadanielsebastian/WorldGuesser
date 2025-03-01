import "../globals.css";
import "../components/navbar.js";
import Navbar from "../components/navbar.js";

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className="pt-16">
				<Navbar />
				{children}
			</body>
		</html>
	);
}
