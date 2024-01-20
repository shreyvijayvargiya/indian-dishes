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
				width: percent >= 50 ? "80%" : percent + "%",
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
			gsap.to(modal.current, { opacity: 1, width: "100%" });
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
				className="fixed md:top-40 sm:top-20 xs:top-20 xxs:top-20 md:h-4/5 sm:h-3/5 xs:h-3/5 xxs:h-3/5 md:left-60 md:right-60 sm:left-10 xs:left-10 xxs:left-10 sm:right-20 mx-auto text-gray-400 hover:text-gray-200 border-dotted border-2 border-gray-600 p-4 rounded-xl cursor-pointer"
				style={{ boxShadow: "0px 0px 50px rgb(255, 255, 255, 0.2)" }}
				ref={ref}
			>
				<div className="modal-content bg-none break-words flex-wrap">
					<p className="paragraph md:text-7xl">Dynamic Modal</p>
					<p className="paragraph">Increase width on scroll</p>
				</div>
			</div>
			<div
				ref={modal}
				className="fixed md:top-10 md:left-10 sm:bottom-10 xxs:bottom-10 xs:bottom-10 sm:text-center xxs:text-center xs:text-center mx-auto cursor-pointer"
			>
				<p className="text-pink-600 font-mono text-center text-7xl underline">
					{scrollPercent >= 50 ? 100 : scrollPercent}%
				</p>
				<p className="text-gray-600 text-sm text-center">modal width </p>
			</div>
		</div>
	);
};
export default DammModal;
