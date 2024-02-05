import React, { useEffect, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import gsap from "gsap";
import colors from "tailwindcss/colors";
import GridLines from "react-gridlines";
import Om from "./TextEffects/Om";
import InfinitySign from "./TextEffects/Infinity";
import InifiniteLoader from "./TextEffects/InfiniteLoader";
import Introduction from "components/Home/Introduction";

const AnimatedText = () => {
	const [char, setChar] = useState("this is Shrey");
	const colorKeys = Object.keys(colors);
	const [index, setIndex] = useState(0);
	const characterRef = useRef();

	const startColorInterval = () => {
		return setInterval(() => {
			if (index === colorKeys.length - 1) {
				setIndex(0);
			} else {
				setIndex(index + 1);
			}
		}, 2000);
	};

	React.useEffect(() => {
		startShuffle();
		gsap.from(".text-container", { scale: 0.5, yPercent: -200 });
	}, []);

	React.useEffect(() => {
		const intervalId = startColorInterval();
		return () => {
			clearInterval(intervalId);
		};
	}, [index]);

	const startShuffle = () => {
		let str = char.trim(" ").split("");
		let interval = null;
		let chars = "XykmrQkn";
		let originalChars = "Shrey";
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

	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

	const handleMouseMove = (event) => {
		const { clientX, clientY } = event;
		setMousePosition({ x: clientX, y: clientY });
		const centerX = window.innerWidth / 2;
		const centerY = window.innerHeight / 2;
		const rotationX = ((clientY - centerY) / centerY) * 20; // Adjust the factor for the rotation speed
		const rotationY = ((centerX - clientX) / centerX) * 50;
		gsap.to(".character-container", {
			rotationY,
			rotationX,
			scale: 1.2,
			transition: "all 0.2s ease",
			transformOrigin: "center center",
		});
	};

	const styles = useStyles({ colorKeys, index });

	return (
		<div
			className="sm:w-full md:w-1/3 mx-auto relative text-container overflow-hidden flex flex-col justify-center items-center py-20"
			onMouseMove={handleMouseMove}
		>
			<div
				className={`character-container px-20 py-4 text-gray-200 text-left relative border-t-2 w-full border-b-2 border-gray-600 border-dashed`}
			>
				<p
					ref={characterRef}
					style={{
						fontFamily: "phosphate",
						fontStyle: "inline",
						fontSize: "2em",
						background: "transparent",
						textShadow: `0px 0px 30px ${colors[colorKeys[index]][800]}`,
					}}
				>
					this is {char}
				</p>
			</div>
		</div>
	);
};
export default AnimatedText;

const useStyles = makeStyles((theme) => ({
	character: {
		transformStyle: "preserve-3d",
		fontFamily: "phosphate",
		fontStyle: "inline",
		fontSize: "1em",
		background: "transparent",
		textShadow: "10px 10px 10px rgb(20, 250, 250, 0.2)",
		color: (props) => props.colorKeys[props.index],
	},
}));
