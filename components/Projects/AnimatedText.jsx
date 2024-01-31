import React, { useEffect, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import gsap from "gsap";
import colors from "tailwindcss/colors";
import GridLines from "react-gridlines";

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
		}, 3000);
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
		let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		let originalChars = "this is Shrey";
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
		const rotationX = ((clientY - centerY) / centerY) * 60; // Adjust the factor for the rotation speed
		const rotationY = ((centerX - clientX) / centerX) * 60;
		gsap.to(characterRef.current, {
			rotationX,
			rotationY,
			transition: "all 0.5s ease",
			transformOrigin: "center center",
		});
	};

	const styles = useStyles({ colorKeys, index });

	return (
		<div
			className="w-full relative text-container flex flex-col justify-center items-center h-screen"
			onMouseMoveCapture={handleMouseMove}
		>
			<div
				className={` p-4 py-0 text-gray-400 w-auto border-t-2 border-b-2 text-center border-dashed border-gray-700 relative`}
			>
				<GridLines
					lineColor={colors.gray[400]}
					className="h-full absolute w-full transform rotate-5 opacity-5 z-100"
				/>
				<p
					ref={characterRef}
					style={{
						transformStyle: "preserve-3d",
						fontFamily: "phosphate",
						fontStyle: "inline",
						fontSize: "6em",
						background: "transparent",
						textShadow: "10px 10px 10px rgb(20, 250, 250, 0.2)",
						color: (props) => props.colorKeys[props.index],
					}}
				>
					{char}
				</p>
			{mousePosition.x && mousePosition.y && (
				<div
					className="box-2 p-2"
					id="box-2"
					style={{
						position: "fixed",
						top: mousePosition.y - 400,
						left: mousePosition.x - 500,
						transition: "all 0.5s ease-in-out",
					}}
				>
					<img src={"./mouse-1.svg"} className="w-5 h-5" />
				</div>
			)}
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
		fontSize: "8em",
		background: "transparent",
		textShadow: "10px 10px 10px rgb(20, 250, 250, 0.2)",
		color: (props) => props.colorKeys[props.index],
	},
}));
