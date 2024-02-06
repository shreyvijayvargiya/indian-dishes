import React, { useState, useRef, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import colors from "tailwindcss/colors";
import gsap from "gsap";
import { makeStyles } from "@material-ui/core/styles";
import router from "next/router";

const StickyNavbar = () => {
	const [show, setShow] = useState(true);
	const ref = useRef(null);
	const bar = useRef(null);
	const styles = useStyles({ show });

	const toggleNavbar = () => {
		const tl = gsap.timeline();
		if (show) {
			tl.fromTo(
				ref.current,
				{
					opacity: 1,
					scale: 0,
					y: "-20%",
				},
				{ opacity: 0, scale: 0, y: "0%", duration: 0.5 }
			);
			tl.fromTo(
				bar.current,
				{ opacity: 0, rotate: "-360deg", y: "-100%" },
				{ opacity: 1, rotate: "0deg", y: "0%" }
			);
			tl.fromTo(
				".button-link",
				{ visibility: "visible" },
				{ visibility: "hidden" }
			);
		} else {
			tl.fromTo(
				bar.current,
				{ rotateZ: "360deg", opacity: 1, y: "0%" },
				{ rotateZ: "0deg", opacity: 0, y: "-100%" }
			);
			tl.fromTo(
				ref.current,
				{
					opacity: 0,
					scale: 0,
					y: "-20%",
				},
				{
					opacity: 1,
					scale: 1,
					y: "0%",
					duration: 1,
				}
			);
			tl.fromTo(
				".button-link",
				{ visibility: "hidden" },
				{ visibility: "visible" }
			);
		}
		setShow(!show);
	};

	useEffect(() => {
		gsap.to(bar.current, { opacity: show ? 0 : 1 });
		gsap.to(ref.current, { opacity: show ? 1 : 0 });
	}, []);

	const bounceTheBar = () => {
		const tl = gsap.timeline();
		tl.fromTo(
			bar.current,
			{ rotate: "180deg", y: "-20%" },
			{ rotate: "0deg", duration: 1, y: "0%" }
		);
	};

	return (
		<div
			className={`fixed top-5 left-0 right-0 rounded-md px-4 ${styles.navbar}`}
		>
			<div
				className="flex justify-between items-center px-8 py-3 border border-gray-700 rounded-md"
				ref={ref}
				style={{ boxShadow: "0px 0px 30px rgb(255, 255, 255, 0.1)" }}
			>
				<button
					className="button-link hover:text-white hover:translate-y-10 text-yellow-600 hover:bg-blackShade text-sm px-2 rounded-md"
					onClick={() => router.push("/introduction")}
				>
					home
				</button>
				<button
					className="button-link hover:text-white  text-pink-600 hover:bg-blackShade text-sm px-2 rounded-full"
					onClick={() => router.push("/introduction")}
				>
					it's me
				</button>
				<button
					className="button-link hover:text-gray-200 text-indigo-600 hover:bg-blackShade text-sm px-2 p-1 rounded-full"
					onClick={() => router.push("/work-experience")}
				>
					work experience
				</button>
				<div className="border border-gray-500 rounded-full hover:border-gray-300 cursor-pointer">
					<IoClose size={24} color={colors.gray[600]} onClick={toggleNavbar} />
				</div>
				<button
					className="button-link hover:text-gray-200 text-orange-600 hover:bg-blackShade text-sm px-2  p-1 rounded-full"
					onClick={() => router.push("projects")}
				>
					playground
				</button>
				<button
					className="button-link hover:text-gray-200 text-gray-600 hover:bg-blackShade text-sm px-2  z-100 p-1 rounded-full"
					onClick={() => router.push("tech-stack")}
				>
					stacks
				</button>
				<span className="button-link hover:text-gray-200 text-green-600 hover:bg-blackShade text-sm px-2  z-100 p-1 rounded-full">
					say hi
				</span>
			</div>
			<div
				className={`cursor-pointer rounded-full flex justify-center items-center bg-none fixed left-0 right-0 top-5 ml-8 ${
					show ? "none" : "block"
				}`}
				onMouseEnter={bounceTheBar}
			>
				<div
					className="border border-gray-700 rounded-full p-2 hover:border-gray-400"
					ref={bar}
					onClick={toggleNavbar}
				>
					<FaBars size={24} color={colors.gray[600]} />
				</div>
			</div>
		</div>
	);
};
export default StickyNavbar;

const useStyles = makeStyles((theme) => ({
	navbar: {
		zIndex: 50,
		[theme.breakpoints.up("sm")]: {
			width: "40% !important",
			margin: "auto",
			background: (props) => !props.show && "none",
		},
		[theme.breakpoints.between("xs", "sm")]: {
			width: (props) => (props.show ? "90%" : "auto"),
			margin: "auto",
		},
	},
}));
