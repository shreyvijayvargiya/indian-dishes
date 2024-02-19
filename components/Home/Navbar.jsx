import React, { useState, useRef, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import colors from "tailwindcss/colors";
import gsap from "gsap";
import { makeStyles } from "@material-ui/core/styles";
import router from "next/router";

const StickyNavbar = () => {
	const [show, setShow] = useState(false);
	const ref = useRef(null);
	const bar = useRef(null);
	const styles = useStyles({ show });
	const tl = gsap.timeline();

	const toggleNavbar = () => {
		if (show) {
			tl.to(ref.current, { opacity: 0, duration: 0.5, yPercent: "100%" })
				.to(bar.current, { opacity: 1, rotate: "360deg", y: "0%" })
				.to(".button-link", { visibility: "hidden" });
		} else {
			tl.to(bar.current, {
				rotateZ: "0deg",
				opacity: 0,
				y: "-100%",
			})
				.to(ref.current, {
					opacity: 1,
					y: "0%",
				})
				.to(".button-link", { visibility: "visible" });
		}
		setShow(!show);
	};

	useEffect(() => {
		tl.to(ref.current, { opacity: show ? 1 : 0 }).to(bar.current, {
			opacity: show ? 0 : 1,
		});
	}, [show]);

	const bounceTheBar = () => {
		const tl = gsap.timeline();
		tl.fromTo(
			bar.current,
			{ rotate: "180deg", y: "-20%" },
			{ rotate: "0deg", duration: 1, y: "0%" }
		);
	};

	return (
		<div className={`fixed top-4 left-0 right-0 rounded-md px-4`}>
			<div
				className={`flex justify-between items-center px-8 py-3 rounded-md ${styles.navbar}`}
				ref={ref}
				style={{ boxShadow: "0px 0px 30px rgb(255, 255, 255, 0.2)" }}
			>
				<button
					className="button-link hover:text-white hover:translate-y-10 text-yellow-600 hover:bg-blackShade text-sm px-2 rounded-md"
					onClick={() => router.push("/")}
				>
					home
				</button>
				<button
					className="button-link hover:text-gray-200 text-indigo-600 hover:bg-blackShade text-sm px-2 p-1 rounded-full"
					onClick={() => router.push("/work-experience")}
				>
					work experience
				</button>
				<button
					className="button-link hover:text-gray-200 text-orange-600 hover:bg-blackShade text-sm px-2  p-1 rounded-full"
					onClick={() => router.push("/projects")}
				>
					playground
				</button>
				<button
					className="button-link hover:text-gray-200 text-pink-600 hover:bg-blackShade text-sm px-2  z-100 p-1 rounded-full"
					onClick={() => router.push("/tech-stack")}
				>
					stacks
				</button>
				<a
					className="button-link hover:text-gray-200 text-green-600 hover:bg-blackShade text-sm px-2  z-100 p-1 rounded-full"
					href="https//mailto@shreyvijayvagriya26@gmail.com"
					target="_blank"
				>
					say hi
				</a>{" "}
				<div className="border border-gray-500 rounded-full hover:border-gray-300 cursor-pointer">
					<IoClose size={24} color={colors.gray[600]} onClick={toggleNavbar} />
				</div>
			</div>
			<div
				className={`rounded-full flex justify-center items-center bg-none fixed left-0 right-0 top-4`}
				ref={bar}
				>
				<div
					className="border border-gray-700 rounded-full p-2 hover:border-gray-400"
					onClick={toggleNavbar}
					onMouseEnter={bounceTheBar}
				>
					<FaBars
						size={24}
						color={colors.gray[600]}
						className={styles.barIcon}
					/>
				</div>
			</div>
		</div>
	);
};
export default StickyNavbar;

const useStyles = makeStyles((theme) => ({
	navbar: {
		zIndex: 1000,
		[theme.breakpoints.up("lg")]: {
			width: "35% !important",
			margin: "auto",
			background: (props) => !props.show && "none",
		},
		[theme.breakpoints.down("lg")]: {
			width: (props) => (props.show ? "90%" : "auto"),
			margin: "auto",
			display: "flex",
			flexDirection: "row",
			textAlign: "left",
		},
	},
	barIcon: {
		"&:hover": {
			borderColor: colors.gray[400],
		},
	},
}));
