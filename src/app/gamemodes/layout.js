import "../globals.css";
import "../components/navbar.js";
import Navbar from "../components/navbar.js";

export default function GameModesLayout({ children }) {
	return (
		<>
			<div className="pt-16">
				<Navbar />
				{children}
			</div>
		</>
	);
}
