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
		<div className="bg-black bg-opacity-5 w-full text-gray-200 flex flex-col justify-center items-center h-screen">
			<div
				className="p-4 md:text-7xl font-medium border-2 border-dashed border-gray-800 text-white rounded-md"
				onMouseEnter={startShuffle}
			>
				{char}
			</div>
		</div>
	);
};
export default AnimatedText;
