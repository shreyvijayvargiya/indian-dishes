import React, { useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import gsap from "gsap";
import colors from "tailwindcss/colors";
import GridLines from "react-gridlines";

const AnimatedText = () => {
	const [char, setChar] = useState("Shrey");
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
		}, 200);
	};

	React.useEffect(() => {
		gsap.fromTo(
			".text-container",
			{ rotateX: "-2deg", skewX: "2deg" },
			{ rotateX: "0deg", skewX: "0deg", repeat: -1, yoyo: true }
		);
	}, []);

	React.useEffect(() => {
		startShuffle();
		const intervalId = startColorInterval();
		return () => {
			clearInterval(intervalId);
		};
	}, [index]);

	const startShuffle = () => {
		let str = char.trim(" ").split("");
		let interval = null;
		let chars = "ykrQn";
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
		}, 2000);
	};

	const handleMouseMove = (event) => {
		const { clientX, clientY } = event;
		const centerX = window.innerWidth / 2;
		const centerY = window.innerHeight / 2;
		const rotationX = ((clientY - centerY) / centerY) * 20; // Adjust the factor for the rotation speed
		const rotationY = ((centerX - clientX) / centerX) * 50;
		gsap.to(".text-container", {
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
			className="sm:w-full md:w-full mx-auto my-28 relative text-container overflow-hidden border-b-2 border-t-2 border-gray-600 border-dashed bg-black bg-opacity-40"
			onMouseMove={handleMouseMove}
		>
			<GridLines
				lineColor={colors.gray[400]}
				className="h-full fixed w-full opacity-5 z-100"
			/>
			<div
				className={`character-container px-10 text-gray-200 text-center relative w-full `}
			>
				<p
					ref={characterRef}
					style={{
						fontFamily: "phosphate",
						fontStyle: "inline",
						fontSize: "6em",
						color: colors[colorKeys[index]][400],
					}}
				>
					<span className="text-gray-200 text-2xl">this is </span>
					{char}
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
