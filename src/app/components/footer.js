import { memo } from "react";

function Footer() {
	// Prevent unnecessary re-renders with useMemo for the year
	const year = new Date().getFullYear();

	return (
		<footer className="relative flex justify-center items-center h-12 mt-auto">
			<p className="text-[var(--foreground)] opacity-70">
				&copy; {year} GibySnack{" "}
			</p>
		</footer>
	);
}

// Memo the component to prevent unnecessary re-renders
export default memo(Footer);
