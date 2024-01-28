import React, { useEffect, useState } from "react";

const AnimatedText = () => {
	const [char, setChar] = useState("Shrey vijayvargiya");

	React.useEffect(() => {
		startShuffle();
	}, []);

	const startShuffle = () => {
		let str = char.trim(" ").split("");
		let interval = null;
		let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		let originalChars = "Shrey Vijayvargiya";
		let index = 0;

		clearInterval(interval);
		interval = setInterval(() => {
			if (index < char.length - 1) {
				str[index] = chars[Math.floor(Math.random() * 26) - 1];
				setChar(str.join(""));
				index = index + 1;
			} else if (index === char.length - 1) {
				clearInterval(interval);
				setChar(originalChars);
			}
		}, 100);
	};

	return (
		<div className="bg-black bg-opacity-95 text-gray-200 flex flex-col justify-center items-center h-screen">
			<div
				className="p-4 md:text-7xl font-medium border-2 border-dashed border-gray-800 bg-gray-900 text-white rounded-md"
				onMouseEnter={startShuffle}
			>
				{char}
			</div>
			<span className="text-center p-2 rounded-md bg-gray-800 text-white my-2 bg-opacity-10 border border-gray-700">
				Hover the card
			</span>
			<div className="fixed bottom-10 w-40 mx-auto text-center p-2 rounded-md bg-gray-800 border border-gray-700">
				<p>
					Made by{" "}
					<a
						href="https://iamshrey.me"
						target="_blank"
						className="underline text-indigo-400"
					>
						Shrey
					</a>
				</p>
			</div>
		</div>
	);
};
export default AnimatedText;
