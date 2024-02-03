import gsap from "gsap";
import React, { useEffect, useState } from "react";
import colors from "tailwindcss/colors";

const loaders = [
	"hello",
	"bonjour",
	"namaste",
	"london",
	"tokyo",
	"dev",
	"programming",
	"css",
	"github",
	"vercel",
	"heroku",
	"firebase",
	"supabase",
	"appwrite",
	"dsa",
];
const TripLoader = () => {
	const [active, setActive] = useState(0);
	const colorKeys = Object.keys(colors);

	useEffect(() => {
		const tl = gsap.timeline();
		tl.fromTo(".animated-container", { width: "0%" }, { width: "100%" });
	}, []);

	const interval = () => {
		return setInterval(() => {
			if (active === loaders.length - 1) {
				gsap.to(".animated-container", { width: "0%", opacity: 0 });
			} else {
				setActive((prev) => prev + 1);
			}
		}, 1000);
	};

	useEffect(() => {
		const id = interval();
		gsap.fromTo(
			".animated-text",
			{ opacity: 0, yPercent: -20 },
			{ opacity: 1, yPercent: 20 }
		);
		return () => {
			clearInterval(id);
		};
	}, [active]);

	return (
		<div className="animated-container bg-black h-screen w-full place-content-center flex flex-col justify-center items-center fixed top-0 left-0 right-0 bottom-0 z-50">
			<p
				className="text-4xl font-mono animated-text"
				style={{ color: colors[colorKeys[active]][400], zIndex: 2000 }}
			>
				{loaders[active]}
			</p>
		</div>
	);
};
export default TripLoader;
