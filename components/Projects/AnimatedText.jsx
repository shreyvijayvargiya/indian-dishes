import React, { useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import gsap from "gsap";
import colors from "tailwindcss/colors";
import { useMediaQuery } from "@material-ui/core";

const AnimatedText = () => {
	const [char, setChar] = useState("Shrey Vijayvargiya");
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
		}, 400);
	};

	React.useEffect(() => {
		gsap.fromTo(
			".text-container",
			{ rotateX: "-2deg", skewX: "2deg" },
			{ rotateX: "0deg", skewX: "0deg", repeat: -1, yoyo: true, ease: "power1" }
		);
	}, []);

	React.useEffect(() => {
		const shuffleIntervalId = startShuffle();
		const intervalId = startColorInterval();
		return () => {
			clearInterval(intervalId);
			clearInterval(shuffleIntervalId);
		};
	}, [index]);

	const startShuffle = () => {
		let str = char.trim(" ").split("");
		let chars = "YRKQN ADBCFGH";
		let originalChars = "Shrey Vijayvargiya";
		let index = 0;

		return setInterval(() => {
			if (index < char.length - 1) {
				str[index] = chars[Math.floor(Math.random() * 5) - 1];
				setChar(str.join(""));
				index = index + 1;
			} else if (index === char.length - 1) {
				setChar(originalChars);
			}
		}, 200);
	};

	const handleMouseMove = (event) => {
		const { clientX, clientY } = event;
		const centerX = window.innerWidth / 2;
		const centerY = window.innerHeight / 2;
		const rotationX = ((clientY - centerY) / centerY) * 20; // Adjust the factor for the rotation speed
		const rotationY = ((centerX - clientX) / centerX) * 50;
		gsap.to([".text-container", ".user-avatar"], {
			rotationY,
			rotationX,
			scale: 1.2,
			transition: "all 0.2s ease",
			transformOrigin: "center center",
		});
	};

	const styles = useStyles({ colorKeys, index });

	const isMobile = useMediaQuery("min-width: 600px");

	return (
		<div className="sm:w-full md:w-full mx-auto " onMouseMove={handleMouseMove}>
			<div className="border-b border-t border-gray-700 border-dashed my-10 relative text-container overflow-hidden">
				<div
					className={`character-container px-10 text-gray-200 text-center relative w-full `}
				>
					<p
						ref={characterRef}
						style={{
							fontFamily: "phosphate",
							fontStyle: "inline",
							fontSize: isMobile ? "2em" : "5em",
							color: colors[colorKeys[index]][400],
						}}
					>
						{char}
					</p>
				</div>
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
