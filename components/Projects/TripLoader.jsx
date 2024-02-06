import { makeStyles } from "@material-ui/core";
import gsap from "gsap";
import React, { useEffect, useState, useRef } from "react";
import colors from "tailwindcss/colors";

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

	const tl = gsap.timeline();
	useEffect(() => {
		tl.fromTo(".animated-container", { width: "0%" }, { width: "100%" });
	}, []);

	const interval = () => {
		return setInterval(() => {
			if (active === loaders.length - 1) {
				tl.to(phoneRef.current, {
					scale: 1.5,
				})
					.fromTo(
						".welcome-text",
						{
							yPercent: -50,
							opacity: 0,
						},
						{
							opacity: 1,
							yPercent: 0,
							delay: 1,
						}
					)
					.to(phoneRef.current, { opacity: 0, delay: 1 })
					.to(".welcome-text", { opacity: 1, scale: 1.2, delay: 0.5 })
					.to(".animated-container", {
						scale: 0,
						width: 0,
						opacity: 0,
						delay: 1,
					});
				setLoading(false);
			} else {
				gsap.to(".loader-bg", { height: (active + 1) * 10 + "%" });
				setActive((prev) => prev + 1);
			}
		}, 400);
	};

	useEffect(() => {
		tl.to(".welcome-text", { opacity: 0, visibility: "hidden" });
	}, []);

	useEffect(() => {
		const id = interval();
		const tl = gsap.timeline();

		tl.fromTo(
			".animated-text",
			{ opacity: 0, yPercent: -20 },
			{ opacity: 1, yPercent: 5 * active }
		).to(phoneRef.current, {
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
			<div>
				<p className="welcome-text text-8xl text-gray-400 font-cool">Welcome</p>
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
		width: "15%",
		height: "60vh",
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
