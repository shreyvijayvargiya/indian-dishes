import React, { useState, useRef, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import colors from "tailwindcss/colors";
import gsap from "gsap";

const DammModal = () => {
	const [show, setShow] = useState(true);
	const ref = useRef(null);
	const modal = useRef(null);
	const containerRef = useRef(null);

	const toggleModal = () => {
		const tl = gsap.timeline();
		if (show) {
			tl.fromTo(
				ref.current,
				{
					width: "60%",
					scale: 1,
					opacity: 1,
				},
				{ width: "0%", scale: 0, opacity: 0 }
			);
			tl.fromTo(
				".modal-content",
				{ visibility: "visible", scale: 1 },
				{ visibility: "hidden", scale: 0 }
			);
		} else {
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
					width: "60%",
					margin: "auto",
					scale: 1,
				}
			);
			tl.fromTo(
				".modal-content",
				{ visibility: "hidden", scale: 0 },
				{ visibility: "visible", scale: 1 }
			);
		}
		setShow(!show);
	};

	const [scrollPercent, setScrollPercent] = useState(0);

	const handleScroll = () => {
		console.log(containerRef.current.getClientHeight);
		const percent = Math.floor((window.scrollY / window.innerHeight) * 100);
		setScrollPercent(percent);
		if (percent < 5) {
			setShow(false);
			gsap.to(ref.current, {
				opacity: 0,
				width: 0,
			});
			gsap.to(".paragraph", {
				opacity: 0,
				width: 0,
			});
		} else if (percent >= 5) {
			gsap.to(ref.current, {
				width: percent + "%",
				opacity: 1,
			});
			gsap.fromTo(
				".paragraph",
				{
					opacity: 0,
					width: "0%",
					scale: 0,
				},
				{
					opacity: 1,
					width: "100%",
					scale: 1,
				}
			);
			setShow(true);
		}
	};

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);

		gsap.fromTo(
			ref.current,
			{ width: "0%", opacity: 0 },
			{ width: "20 %", opacity: 1 }
		);
		gsap.fromTo(
			modal.current,
			{ xPercent: "-100" },
			{ xPercent: "0" },
			{ delay: 1 }
		);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<div
			className="bg-black bg-opacity-95 w-full"
			style={{ height: "150vh" }}
			ref={containerRef}
		>
			<div
				className="fixed top-20 h-4/5 left-60 right-60 mx-auto text-gray-400 hover:text-gray-200 border-dotted border-2 border-gray-600 p-4 rounded-xl cursor-pointer"
				style={{ boxShadow: "0px 0px 50px rgb(255, 255, 255, 0.2)" }}
				ref={ref}
			>
				<div className="modal-content bg-none break-words flex-wrap">
					<p className="paragraph text-7xl">Dynamic Modal</p>
					<p className="paragraph">Increase width on scroll</p>
				</div>
			</div>
			<div
				ref={modal}
				className="fixed bottom-0 left-1/4 right-1/4 translate-x-10 mx-auto cursor-pointer"
			>
				<p className="fixed bottom-10 text-pink-600 font-mono left-0 right-0 text-center text-7xl underline">
					{scrollPercent}
				</p>
			</div>
		</div>
	);
};
export default DammModal;
