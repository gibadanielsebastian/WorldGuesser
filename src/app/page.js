import Image from "next/image";
import Link from "next/link";
import { Kablammo, Itim } from "next/font/google";

const itim = Itim({
	subsets: ["latin"],
	weight: "400",
});

export default function Home() {
	return (
		<div className="flex justify-center items-center min-h-[calc(100vh-10rem)] ">
			<div className="flex flex-col items-center gap-8">
				<Image src="/logo.webp" width="256" height="256" alt="logo" priority />

				{["How to play?", "Settings"].map((text) => {
					return (
						<Link href="/" key={text}>
							<button className="group relative overflow-hidden rounded-2xl border-2 border-transparent bg-[#00ADB5] px-6 py-3 font-medium text-[#eeeeee] transition-all duration-300 ease-in-out hover:border-2 hover:border-[#00ADB5] hover:bg-transparent hover:text-[#00adb5]">
								<span className="absolute inset-0 bg-[#00ADB5] transition-transform duration-300 ease-in-out group-hover:translate-x-full"></span>

								<span
									className={`relative flex items-center gap-2 ${itim.className}`}
								>
									{text}
								</span>
							</button>
						</Link>
					);
				})}
			</div>
		</div>
	);
}
