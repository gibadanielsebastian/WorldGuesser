export default function Footer() {
	return (
		<footer className="relative flex justify-center items-center h-12 mt-auto ">
			<p className="text-[var(--foreground)] opacity-70">
				&copy; {new Date().getFullYear()} GibySnack{" "}
			</p>
		</footer>
	);
}
