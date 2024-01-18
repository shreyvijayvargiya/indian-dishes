import React, { useState, useRef } from "react";
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
				{ opacity: 0, y: "-100px", rotate: "-360deg" },
				{ opacity: 1, y: "0px", rotate: "0deg" }
			);
			tl.fromTo(".text", { visibility: "visible" }, { visibility: "hidden" });
		} else {
			tl.fromTo(
				bar.current,
				{ rotateZ: "360deg", opacity: 1, y: "0px" },
				{ rotateZ: "0deg", opacity: 0, y: "-100px" }
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

	const bounceTheBar = () => {
		const tl = gsap.timeline();
		tl.fromTo(bar.current, { rotate: "180deg" }, { rotate: "0deg" });
	};

	return (
		<div className="bg-black h-screen w-full" style={{}}>
			<div
				className="flex justify-around items-center gap-4 fixed bottom-20 left-60 right-60 w-2/5 mx-auto text-gray-400 hover:text-gray-200 border border-gray-600 p-4 rounded-full cursor-pointer"
				ref={ref}
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
				className="fixed bottom-20 left-0 right-0 mx-auto flex justify-center items-center mb-2 cursor-pointer"
				onMouseEnter={bounceTheBar}
				onClick={toggleNavbar}
			>
				<div className="border border-gray-500 rounded-full p-3 hover:border-gray-400 hover:rotate-x-10 hover:scale-105">
					<FaBars
						size={24}
						color={colors.gray[400]}
						className="hover:scale-105"
					/>
				</div>
			</div>
		</div>
	);
};
export default GlowyNavbar;
