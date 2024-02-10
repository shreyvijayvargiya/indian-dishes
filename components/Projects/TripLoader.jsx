import { makeStyles } from "@material-ui/core";
import gsap from "gsap";
import React, { useEffect, useState, useRef } from "react";
import colors from "tailwindcss/colors";
import { Typewriter } from "react-simple-typewriter";

const loaders = [
	"namaste",
	"hello",
	"bonjour",
	"I am shrey",
	"a software developer",
	"with 4 ",
	"years of experience.",
	"I develop",
	"website and",
	"mobile apps",
];
const TripLoader = ({ setLoading }) => {
	const [active, setActive] = useState(0);
	const colorKeys = Object.keys(colors);
	const phoneRef = useRef();
	const welcomeScreenRef = useRef();

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
					.fromTo(welcomeScreenRef.current, { opacity: 0 }, { opacity: 1 })
					.fromTo(
						".animated-container",
						{ backgroundColor: "rgb(0, 0, 0, 1)", opacity: 1 },
						{
							skewX: "2deg",
							opacity: 0,
							backgroundColor: "rgb(0, 0, 0, 0.2)",
							duration: 2,
							delay: 1,
						}
					);
				clearInterval(id);
				closeLoader();
			} else {
				gsap.to(".loader-bg", {
					height: (active + 2) * 10 + "%",
					textAlign: "center",
				});
				setActive((prev) => prev + 1);
			}
		}, 1000);
	};

	const id = interval();

	useEffect(() => {
		gsap.set(welcomeScreenRef.current, { opacity: 0 });
	}, []);

	useEffect(() => {
		const tl = gsap.timeline();

		tl.to(phoneRef.current, {
			skewX: active + "px",
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
				color: colors[colorKeys[active + 1]],
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
						backgroundColor: colors[colorKeys[active + 1]][600],
					}}
				>
					<p className="text-4xl font-sans animated-text z-30">
						{loaders[active]}
					</p>
				</div>
			</div>
			<div className="welcome-screen w-full none" ref={welcomeScreenRef}>
				<div className="text-gray-400 font-cool text-8xl text-center">
					<Typewriter loop={1} typeSpeed={100} cursor="." words={["Welcome"]} />
				</div>
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
