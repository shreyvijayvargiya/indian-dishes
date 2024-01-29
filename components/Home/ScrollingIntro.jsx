import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import dynamic from "next/dynamic";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import {
	Events,
	Element,
	animateScroll as scroll,
	scrollSpy,
} from "react-scroll";

gsap.registerPlugin(ScrollTrigger);

const ScrollingIntro = () => {
	const containerRef = useRef();
	const maskRef = useRef();
	const objs = [
		"i am a Full Stack Developer",
		"4 Years of experience",
		"Website Development",
		"Mobile app development",
		"Web3 Development",
	];
	const defaultText = `I am Full Stack Developer with \n 4 Years of experience \n
    in developing websites, \n mobile apps, blockchain wallets, \n smart contracts and backend services`;
	const [text, setText] = useState(defaultText);

	const [scrollPosition, setScrollPosition] = useState(0);

	useEffect(() => {
		// gsap.to(containerRef.current, {
		// 	x: "100%",
		// 	opacity: 0,
		// });
	}, []);

	const handleScroll = () => {
		const scrollY = window.scrollY; // Scroll position in pixels
		const scrollPercent =
			(scrollY / (document.documentElement.scrollHeight - window.innerHeight)) *
			100;

		if (scrollPercent === 0) {
			gsap.to(containerRef.current, {
				height: "0%",
				opacity: 0,
				width: 0,
			});
		} else if (0 < scrollPercent <= 100) {
			gsap.to(containerRef.current, {
				opacity: scrollPercent / 100,
				width: scrollPercent / 3 + "%",
				height: scrollPercent / 5 + "%",
			});
		}
		setScrollPosition(scrollPercent);
	};

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<div
			className="container h-screen relative mx-auto flex justify-center items-center"
			style={{ scrollBehavior: "smooth" }}
		>
			<div>
				<div
					ref={containerRef}
					className="fixed top-1/2 left-1/3 mx-auto border-b-2 border-dotted border-orange-600 overflow-y-hidden"
				>
					<span className="text-white text-center mx-auto text-4xl">
						{text}
					</span>
				</div>
			</div>
		</div>
	);
};
export default ScrollingIntro;
