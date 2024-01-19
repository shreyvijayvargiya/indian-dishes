import React, { useState, useRef, useLayoutEffect } from "react";
import { FaBars } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import colors from "tailwindcss/colors";
import gsap from "gsap";

const GlowyNavbar = () => {
	const [show, setShow] = useState(true);
	const ref = useRef(null);
	const bar = useRef(null);

	const toggleNavbar = () => {
		const tl = gsap.timeline();
		if (show) {
			tl.fromTo(
				ref.current,
				{
					width: "40%",
					scale: 1,
					opacity: 1,
				},
				{ width: "0%", scale: 0, opacity: 0 }
			);
			tl.fromTo(
				bar.current,
				{ opacity: 0, rotate: "-360deg" },
				{ opacity: 1, rotate: "0deg" }
			);
			tl.fromTo(".text", { visibility: "visible" }, { visibility: "hidden" });
		} else {
			tl.fromTo(
				bar.current,
				{ rotateZ: "360deg", opacity: 1 },
				{ rotateZ: "0deg", opacity: 0 }
			);
			tl.fromTo(
				ref.current,
				{
					opacity: 0,
					display: "none",
					width: "0%",
					scale: 0,
				},
				{
					opacity: 1,
					display: "flex",
					width: "40%",
					margin: "auto",
					scale: 1,
				}
			);
			tl.fromTo(".text", { visibility: "hidden" }, { visibility: "visible" });
		}
		setShow(!show);
	};

	useLayoutEffect(() => {
		gsap.fromTo(ref.current, { width: "0%" }, { width: "40%" });
		gsap.fromTo(
			bar.current,
			{
				opacity: 0,
			},
			{ opacity: 0 }
		);
	}, []);
	const bounceTheBar = () => {
		const tl = gsap.timeline();
		tl.fromTo(bar.current, { rotate: "180deg" }, { rotate: "0deg" });
	};

	return (
		<div className="bg-black bg-opacity-95 h-screen w-full flex flex-col justify-center items-center">
			<div
				className="flex justify-around items-center gap-4 w-2/5 mx-auto h-auto text-gray-400 hover:border-gray-500 border border-gray-600 p-4 rounded-full cursor-pointer bg-black bg-opacity-20"
				ref={ref}
				style={{ boxShadow: "0px 0px 100px rgb(255, 255, 255, 0.2)" }}
				onClick={toggleNavbar}
			>
				<p className="text">Home</p>
				<p className="text">Work Experience</p>
				<p className="border border-gray-500 rounded-full hover:border-gray-300">
					<IoClose size={24} color={colors.gray[400]} />
				</p>
				<p className="text">Projects</p>
				<p className="text">Contact Me</p>
			</div>
			<div
				ref={bar}
				className="cursor-pointer rounded-full flex justify-center items-center bg-none fixed top-1/2 left-1/2 right-1/2 bottom-1/2"
				onMouseEnter={bounceTheBar}
				onClick={toggleNavbar}
			>
				<div
					className="border border-gray-500 rounded-full p-3 hover:border-gray-400"
					style={{ boxShadow: "0px 0px 100px rgb(255, 255, 255, 0.1)" }}
				>
					<FaBars size={24} color={colors.gray[400]} />
				</div>
			</div>
		</div>
	);
};
export default GlowyNavbar;
