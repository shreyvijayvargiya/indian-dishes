import React, { useState, useRef, useLayoutEffect, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import colors from "tailwindcss/colors";
import gsap from "gsap";
import { useMediaQuery } from "@material-ui/core";

const GlowyNavbar = () => {
	const [show, setShow] = useState(true);
	const ref = useRef(null);
	const bar = useRef(null);

	const isMobile = useMediaQuery("(max-width: 600px)");
	
	const toggleNavbar = () => {
		const tl = gsap.timeline();
		if (show) {
			tl.fromTo(
				ref.current,
				{
					opacity: 1,
					width: isMobile ? "98%" : "50%",
					margin: "auto",
				},
				{ opacity: 0, width: "0%" }
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
				},
				{
					opacity: 1,
					margin: "auto",
					display: "flex",
					margin: "auto",
					width: isMobile ? "98%" : "100%",
				}
			);
			tl.fromTo(".text", { visibility: "hidden" }, { visibility: "visible" });
		}
		setShow(!show);
	};

	useEffect(() => {
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
		<div className="bg-black bg-opacity-95 h-screen w-full flex flex-col justify-center items-center z-100">
			<div className="gap-4 lg:w-2/5 xl:w-2/5 md:w-3/5 sm:w-full xxs:w-full xs:w-full mx-auto h-auto cursor-pointer">
				<div
					ref={ref}
					onClick={toggleNavbar}
					style={{ boxShadow: "0px 0px 100px rgb(255, 255, 255, 0.2)" }}
					className="flex justify-around items-center w-full text-gray-400 hover:border-gray-500 border border-gray-600 p-4 rounded-full "
				>
					<p className="text">Home</p>
					<p className="text">Work Experience</p>
					<p className="border border-gray-500 rounded-full hover:border-gray-300">
						<IoClose size={24} color={colors.gray[400]} />
					</p>
					<p className="text">Projects</p>
					<p className="text">Contact Me</p>
				</div>
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
