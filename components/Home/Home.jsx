import { makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import colors from "tailwindcss/colors";
import StickyNavbar from "./Navbar";
import { Typewriter } from "react-simple-typewriter";
import ScrollingIntro from "./ScrollingIntro";
import gsap from "gsap";

const HomeComponent = () => {
	const styles = useStyles();

	const [char, setChar] = useState("Shrey");

	React.useEffect(() => {
		startShuffle();

		gsap.fromTo(".bg-image", { scale: 0.7, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.8 });
	}, []);

	const startShuffle = () => {
		let str = char.trim(" ").split("");
		let interval = null;
		let chars = "ABDEFHIJLMNPQSTUWXY";
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

	return (
		<div
			className="h-full w-full relative"
			style={{ height: "120vh" }}
		>
			<div
				className="bg-image"
				style={{
					backgroundImage: `url(./home-bg.svg)`,
					backgroundBlendMode: "color-burn",
					backgroundPosition: "center",
					backgroundRepeat: "repeat-x",
					width: "100%",
					height: "100vh",
					position: "fixed",
					inset: 0,
					zIndex: -10,
				}}
			/>
			<StickyNavbar />
			<div className="flex flex-col justify-center h-screen w-full items-center">
				<div>
					<span className="text-gray-400 mr-10 text-2xl font-mono">
						this is
					</span>
					<span className={styles.nameText} onMouseOver={startShuffle}>
						{char}
					</span>
				</div>
			</div>
			<ScrollingIntro />
			<br />
			<br />
			<br />
		</div>
	);
};
export default HomeComponent;

const useStyles = makeStyles((theme) => ({
	nameText: {
		fontFamily: "phosphate",
		fontSize: "12rem",
		color: colors.gray[200],
		[theme.breakpoints.between("xs", "sm")]: {
			fontSize: "4rem",
		},
	},
	navbar: {
		[theme.breakpoints.between("sm", "xl")]: {
			width: "30%",
		},
		[theme.breakpoints.between("xs", "sm")]: {
			width: "90%",
			margin: "auto",
		},
	},
}));
