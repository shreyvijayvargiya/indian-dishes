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
		<div className="fixed top-5 mx-auto md:w-1/3 sm:w-full xxs:w-full xs:w-full left-0 right-0 rounded-md px-4">
			<div className="flex justify-between items-center px-8 py-3 bg-black bg-opacity-50 border border-gray-700 rounded-full" ref={ref}>
				<button
					className="button-link hover:text-white  text-yellow-600 hover:bg-blackShade text-md px-2 rounded-md"
					onClick={() => router.push("/introduction")}
				>
					home
				</button>
				<button
					className="button-link hover:text-white  text-pink-600 hover:bg-blackShade text-md px-2 rounded-full"
					onClick={() => router.push("/introduction")}
				>
					it's me
				</button>
				<button
					className="button-link hover:text-gray-200 text-indigo-600 hover:bg-blackShade text-md px-2 p-1 rounded-full"
					onClick={() => router.push("/work-experience")}
				>
					work experience
				</button>
				<div className="border border-gray-500 rounded-full hover:border-gray-300 cursor-pointer">
					<IoClose size={24} color={colors.gray[600]} onClick={toggleNavbar} />
				</div>
				<button
					className="button-link hover:text-gray-200 text-orange-600 hover:bg-blackShade text-md px-2  p-1 rounded-full"
					onClick={() => router.push("projects")}
				>
					playground
				</button>
				<button
					className="button-link hover:text-gray-200 text-gray-600 hover:bg-blackShade text-md px-2  z-100 p-1 rounded-full"
					onClick={() => router.push("tech-stack")}
				>
					stacks
				</button>
				<span className="button-link hover:text-gray-200 text-green-600 hover:bg-blackShade text-md px-2  z-100 p-1 rounded-full">
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
					className="border border-gray-500 rounded-full p-2 hover:border-gray-400"
					ref={bar}
					onClick={toggleNavbar}
				>
					<FaBars size={24} color={colors.gray[400]} />
				</div>
			</div>
		</div>
	);
};
export default StickyNavbar;

const useStyles = makeStyles((theme) => ({
	navbar: {
		border: (props) => props.show && `1px solid ${colors.gray[600]}`,
		zIndex: 1000,
		"& :hover": {
			boxShadow: "0px 0px 50px rgb(255, 255, 255, 0.3)",
		},
		[theme.breakpoints.up("sm")]: {
			width: "30% !important",
			margin: "auto",
			background: (props) => !props.show && "none",
		},
		[theme.breakpoints.between("xs", "sm")]: {
			width: (props) => (props.show ? "90%" : "auto"),
			margin: "auto",
		},
	},
}));
