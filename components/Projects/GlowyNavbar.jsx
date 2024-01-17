import React, { useState } from "react";
import dynamic from "next/dynamic";
import { FaBars } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useSpring, animated } from "@react-spring/web";
import colors from "tailwindcss/colors";

const GlowyNavbar = () => {
	const [show, setShow] = useState(true);
	const [visible, setVisible] = useState(true);

	const { width } = useSpring({
		width: show ? "40%" : "3%",
		config: {
			duration: 1000,
			decay: 0.5,
		},
	});

	return (
		<div className="bg-black bg-opacity-90 h-screen w-full ">
			<div
				className="h-auto mx-auto rounded-full bg-black bg-opacity-10 bg-none cursor-pointer"
				style={{
					transition: "width 0.1s ease",
				}}
				onClick={() => {
					setShow(!show);
				}}
			>
				<animated.div
					className="flex justify-around items-center gap-4 fixed bottom-20 left-0 right-0 text-gray-400 hover:text-gray-200 border border-gray-600 p-4 rounded-full"
					style={{
						width: width.to((o) => o),
						display: show ? "flex" : "none",
						margin: "auto",
						transition: "display width 0.1s ease-in-out",
					}}
				>
					<p>Home</p>
					<p>Work Experience</p>
					<p className="border border-gray-500 rounded-full ">
						<IoClose size={24} color={colors.gray[400]} />
					</p>
					<p>Projects</p>
					<p>Contact Me</p>
				</animated.div>
				<animated.div
					style={{
						display: show ? "none" : "block",
						width: width.to((o) => o),
						transition: "visibility 0.5 ease",
						transform: show ? "rotateX(180deg)" : "",
					}}
					className="fixed bottom-20 left-0 right-0 mx-auto flex justify-center items-center"
				>
					<div className="border border-gray-700 rounded-full p-4">
						<FaBars size={24} color={colors.gray[400]} />
					</div>
				</animated.div>
			</div>
		</div>
	);
};
export default GlowyNavbar;
