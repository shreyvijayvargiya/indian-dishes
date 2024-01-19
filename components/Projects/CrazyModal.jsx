import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";

const DammModal = () => {
	const [show, setShow] = useState(true);
	const ref = useRef(null);
	const modal = useRef(null);
	const containerRef = useRef(null);

	const [scrollPercent, setScrollPercent] = useState(0);

	const handleScroll = () => {
		const percent = Math.floor((window.scrollY / window.innerHeight) * 100);
		setScrollPercent(percent);
		if (percent < 10) {
			setShow(false);
			gsap.to(ref.current, {
				opacity: 0,
				scale: 0,
			});
			gsap.to(modal.current, {
				opacity: 0,
				width: 0,
			});
		} else if (percent >= 5) {
			gsap.to(ref.current, {
				width: percent + "%",
				scale: 1,
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
			gsap.to(modal.current, { opacity: 1, width: "20%" });
			setShow(true);
		}
	};

	const initialGsapAnimation = () => {
		gsap.fromTo(
			ref.current,
			{ width: "0%", opacity: 0 },
			{ width: "20%", opacity: 1 }
		);
		gsap.fromTo(modal.current, { x: "-50px" }, { x: "10px" }, { delay: 1 });
	};

	useEffect(() => {
		initialGsapAnimation();
		window.addEventListener("scroll", handleScroll);
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
			<div ref={modal} className="fixed top-10 left-10 mx-auto cursor-pointer">
				<p className="text-pink-600 font-mono text-center text-7xl underline">
					{scrollPercent}%
				</p>
				<p className="text-gray-600 text-sm text-center">modal width </p>
			</div>
		</div>
	);
};
export default DammModal;
