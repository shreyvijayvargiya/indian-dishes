import { makeStyles } from "@material-ui/core";
import gsap from "gsap";
import React, { useEffect, useState, useRef } from "react";
import colors from "tailwindcss/colors";
import { Typewriter } from "react-simple-typewriter";
import AnimatedText from "./AnimatedText";

const loaders = [
	"hello",
	"namaste",
	"frontend",
	"dev",
	"programming",
	"css",
	"github",
	"vercel",
	"firebase",
	"supabase",
	"backend",
];
const TripLoader = ({ setLoading }) => {
	const [active, setActive] = useState(0);
	const colorKeys = Object.keys(colors);
	const phoneRef = useRef();
	const welcomeScreenRef = useRef();
	const animatedTextRef = useRef();

	const tl = gsap.timeline();

	const closeLoader = () => {
		setTimeout(() => {
			setLoading(false);
		}, 4000);
	};

	const interval = () => {
		return setInterval(() => {
			if (active === loaders.length - 1) {
				tl.to(phoneRef.current, {
					scale: 1.5,
				})
					.to(phoneRef.current, { opacity: 0, stagger: 0.5 })
					.fromTo(
						welcomeScreenRef.current,
						{ opacity: 1 },
						{ opacity: 0, stagger: 0.5 }
					)
					.fromTo(
						animatedTextRef.current,
						{ opacity: 0, xPercent: 200, yPercent: 0 },
						{ opacity: 1, xPercent: 0, yPercent: -50 }
					)
					.fromTo(
						animatedTextRef.current,
						{ scale: 2 },
						{
							scale: 0.8,
							duration: 2,
						}
					);
				clearInterval(id);
				closeLoader();
			} else {
				gsap.to(".loader-bg", { height: (active + 1) * 10 + "%" });
				setActive((prev) => prev + 1);
			}
		}, 400);
	};
	const id = interval();

	useEffect(() => {
		gsap.to(welcomeScreenRef.current, { opacity: 0 });
		gsap.to(animatedTextRef.current, {
			opacity: 0,
		});
	}, []);

	useEffect(() => {
		const tl = gsap.timeline();

		tl.to(phoneRef.current, {
			skewX: active * 2 + "deg",
			scale: 1 + active / 20,
			rotateX: active * 4 + "deg",
			transformOrigin: "50% 50%",
		});

		return () => {
			clearInterval(id);
		};
	}, [active]);

	const styles = useStyles();
	return (
		<div
			className="animated-container place-content-center flex flex-col justify-center items-center fixed top-0 left-0 right-0 bottom-0"
			style={{
				color: colors[colorKeys[active]],
				backgroundColor: "rgb(0, 0, 0)",
				zIndex: 100,
			}}
		>
			<div className={styles.phoneMockup} ref={phoneRef}>
				<div
					className="loader-bg"
					style={{
						position: "relative",
						borderRadius: 40,
						height: "100%",
						zIndex: 100,
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						backgroundColor: colors[colorKeys[active]][600],
					}}
				>
					<p className="text-4xl font-mono animated-text z-30">
						{loaders[active]}
					</p>
				</div>
			</div>
			<div className="welcome-screen w-full" ref={welcomeScreenRef}>
				<div className="text-gray-400 font-cool text-8xl text-center welcome-text">
					<Typewriter
						loop={4}
						typeSpeed={100}
						cursor="_"
						words={["Welcome"]}
						onLoopDone={() => {
							gsap.to(".welcome-text", { opacity: 0 });
						}}
					/>
				</div>
			</div>
			<div ref={animatedTextRef} style={{ opacity: 0, width: "100%" }}>
				<AnimatedText />
			</div>
		</div>
	);
};
export default TripLoader;

const useStyles = makeStyles((theme) => ({
	root: {
		"&::before": {},
	},
	phoneMockup: {
		outline: `2px dashed ${colors.gray[500]}`,
		outlineOffset: 4,
		width: "20%",
		height: "70vh",
		borderRadius: 40,
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		margin: "auto",
		boxShadow: "0px 0px 40px rgb(250, 250, 250, 0.5)",
		[theme.breakpoints.down("sm")]: {
			width: "80%",
			height: "80%",
		},
	},
}));
