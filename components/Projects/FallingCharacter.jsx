import React, { useState, useRef } from "react";
import gsap from "gsap";
import { getRandomPagePoint } from "ghost-cursor";

const FallingCharacter = () => {
	const [char, setChar] = useState("");
	const [fallenChar, setFallenChar] = useState("");

	const fallenCharRef = useRef(null);
	const ref = useRef(null);

	const fallCharacter = () => {
		gsap
			.timeline({ defaults: { duration: 1, ease: "power2.out" } })
			.clear() // Clear previous animations
			.to(".fallen-character", { y: 100, opacity: 0 }); // Animate previous characters

		for (let i = 0; i < char.length; i++) {
			gsap.fromTo(
				`.fallen-character-${i}`,
				{ y: "0vh", opacity: 1 },
				{ y: "100vh", opacity: 0, duration: 2, ease: "power2.out" }
			);
		}
	};

	return (
		<div className="bg-black bg-opacity-95 h-screen w-full p-10">
			<input
				className="w-10/12 border border-gray-800 mx-auto outline-none border-none bg-black bg-opacity-10 p-2 text-7xl text-gray-400 hover:text-gray-200 rounded-md break-words"
				placeholder="Start writing"
				value={char}
				ref={ref}
				onChange={(e) => {
					setChar(e.target.value);
					fallCharacter();
				}}
			/>
			<div className="text-gray-400">
				{char.split("").map((c, index) => (
					<span
						key={index}
						ref={fallenCharRef}
						className={`fallen-character fallen-character-${index}`}
					>
						{c}
					</span>
				))}
			</div>
		</div>
	);
};
export default FallingCharacter;
