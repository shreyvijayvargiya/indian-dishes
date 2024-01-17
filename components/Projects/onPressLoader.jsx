import { Button } from "@mantine/core";
import React, { useState } from "react";
import { useSpring, animated } from "@react-spring/web";

const OnPressLoader = () => {
	const [percentWidth, setPercentWidth] = useState(0);

	const handleClick = () => {
		if (percentWidth < 100) {
			setPercentWidth(percentWidth + 10);
			set(percentWidth + 10);
		} else {
			setPercentWidth(5);
			set(0);
		}
	};

	const [props, set] = useSpring(() => ({
		width: "0%",
	}));

	return (
		<div
			className="bg-gray-900 h-screen w-full flex flex-col justify-center items-center outline-none"
			onKeyDown={(e) => {
				if (e.key === " ") {
					handleClick();
				}
			}}
			tabIndex="0"
		>
			<div className="w-4/5 bg-gray-800 rounded-xl h-10">
				{[1, 2, 3, 4, 5].map((item) => {
					return (
						<div
							key={item}
							className="border-l h-full w-1 border-black border-dotted hidden"
						/>
					);
				})}
				{percentWidth > 0 && (
					<animated.div
						style={{ width: percentWidth + "%" }}
						className="h-full bg-indigo-800 border-dashed border-2 border-black rounded-xl"
					/>
				)}
			</div>
			<div className="text-gray-500 bg-gray-800 my-4 border border-gray-700 shadow-xl mx-auto backdrop-filter-xl bg-opacity-10 rounded-md p-2">
				width: {percentWidth}% <br />
				<span> Press Space to toggle width</span>
			</div>
		</div>
	);
};
export default OnPressLoader;
