import React, { useState, useRef, useLayoutEffect, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import colors from "tailwindcss/colors";
import gsap from "gsap";
import { useMediaQuery, makeStyles } from "@material-ui/core";

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
				{ opacity: 0, scale: 1, y: "0%", duration: 1 }
			);
			tl.fromTo(
				bar.current,
				{ opacity: 0, rotate: "-360deg", y: "-100%" },
				{ opacity: 1, rotate: "0deg", y: "0%" }
			);
			tl.fromTo(".text", { visibility: "visible" }, { visibility: "hidden" });
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
			tl.fromTo(".text", { visibility: "hidden" }, { visibility: "visible" });
		}
		setShow(!show);
	};

	useEffect(() => {
		gsap.to(bar.current, { opacity: 1});
		gsap.to(ref.current, { opacity: 0 })
	}, [])

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
			className={`fixed top-10 mx-auto left-0 right-0 rounded-md px-4`}
		>
			<div
				ref={ref}
				style={{
					boxShadow: show ? "0px 0px 40px rgb(255, 255, 255, 0.3)" : "none",
				}}
				className={`flex justify-between items-center text-gray-400 p-2 bg-black bg-opacity-30 rounded-md ${styles.navbar}`}
			>
				<p className="text hover:text-gray-200">Home</p>
				<p className="text hover:text-gray-200">Work Experience</p>
				<p
					className="border border-gray-500 rounded-full hover:border-gray-300 cursor-pointer"
					onClick={toggleNavbar}
				>
					<IoClose size={24} color={colors.gray[400]} />
				</p>
				<p className="text hover:text-gray-200">Projects</p>
				<p className="text hover:text-gray-200">Contact Me</p>
			</div>
			<div
				className={`cursor-pointer rounded-full flex justify-center items-center bg-none fixed left-0 right-0 top-11 ml-8 ${
					show ? "none" : "block"
				}`}
				onMouseEnter={bounceTheBar}
				onClick={toggleNavbar}
			>
				<div
					className="border border-gray-500 rounded-full p-2 hover:border-gray-400"
					ref={bar}
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
		[theme.breakpoints.between("sm", "xl")]: {
			width: "26% !important",
			margin: "auto",
			background: (props) => !props.show && "none",
		},
		[theme.breakpoints.between("xs", "sm")]: {
			width: (props) => (props.show ? "90%" : "auto"),
			margin: "auto",
		},
	},
}));
