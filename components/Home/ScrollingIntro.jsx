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
import { useParallax, Parallax } from "react-scroll-parallax";
import AnimatedText from "components/Projects/AnimatedText";
import { Button } from "@mantine/core";
import { makeStyles } from "@material-ui/core";

gsap.registerPlugin(ScrollTrigger);
const objs = [
	{
		id: 1,
		name: "i am a Software Developer",
		image: "./intro-images/developer.svg",
	},
	{
		id: 2,
		name: "with 4 Years of experience",
		image: "./intro-images/wavy-buddies.svg",
	},
	{
		id: 3,
		name: "in Website development,",
		image: "./intro-images/happy-bunch-desk.svg",
	},
	{
		id: 4,
		name: "Mobile app development",
		image: "./intro-images/bro.svg",
	},
	{
		id: 5,
		name: "& Backend development",
		image: "./intro-images/work-space.jpeg",
	},
];

const ScrollingIntro = () => {
	const containerRef = useRef();

	const [mousePosition, setMousePosition] = useState({
		x: 0,
		y: 0,
	});
	const [scrollPosition, setScrollPosition] = useState(0);
	const styles = useStyles();

	const handleScroll = () => {
		const scrollY = window.scrollY; // Scroll position in pixels
		const scrollPercent =
			(scrollY / (document.documentElement.scrollHeight - window.innerHeight)) *
			100;

		setScrollPosition(scrollPercent);
	};

	useEffect(() => {
		// window.addEventListener("scroll", handleScroll);

		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: ".sections-container",
				start: "top 50px", // Trigger animation when the top of the element is 100px from the top of the viewport
				end: "+=200", // Trigger animation when the top of the element is 200 pixels from its natural position
				scrub: true, // Smoothly animates the property changes during scroll
			},
		});
		tl.fromTo(
			".sections-container",
			{ xPercent: -200, opacity: 1 },
			{
				xPercent: 0,
				opacity: 1,
				duration: 2,
				yoyo: true,
			}
		);
		objs.forEach((item, index) => {
			tl.fromTo(
				`.section-${index}`,
				{
					opacity: 0,
					yPercent: -80 + index * 10,
				},
				{
					opacity: 1,
					yPercent: 0,
					stagger: 0.5,
					yoyo: true,
				}
			);
		});
		gsap.from(".mouse-container", { opacity: 0 });
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	const [active, setActive] = useState(null);
	return (
		<div
			className="scrolling-container relative mx-auto h-full overflow-x-hidden"
			style={{
				scrollBehavior: "smooth",
			}}
			ref={containerRef}
			onMouseMoveCapture={(e) => {
				setMousePosition({ x: e.clientX, y: e.clientY });
			}}
		>
			<div className="w-full px-40 flex justify-around items-center gap-4 sections-container bg-black p-20 bg-opacity-20 border-dotted border-t border-gray-600 h-screen relative">
				<div className="text-7xl text-center absolute top-0 bottom-0 left-0 right-0 place-content-center text-gray-400">
					who am I
				</div>
				{objs.map((item, index = 0) => {
					return (
						<section
							key={item.id}
							onMouseOver={() => setActive(item)}
							onMouseOut={() => setActive(null)}
							className={`section-${index} px-10 text-gray-200 my-10 border border-gray-700 rounded-xl bg-black bg-opacity-20 ${styles.section}`}
						>
							<p
								className={`item-${index} h-96 hover:text-white text-xl text-center place-content-center flex flex-col justify-center font-bold`}
								style={{ fontFamily: "Leckerli One" }}
							>
								{item.name}
							</p>
							<img
								src={item?.image}
								className="w-full h-full object-contain rounded-xl absolute top-0 left-0 right-0 bottom-0"
							/>
						</section>
					);
				})}
			</div>
			{mousePosition.x && mousePosition.y && active && (
				<div
					className="box-2 p-2"
					id="box-2"
					style={{
						position: "fixed",
						top: mousePosition.y,
						left: mousePosition.x,
						transition: "all 0.5s ease-in-out",
					}}
				>
					<img
						src={"./intro-images/football-cursor.svg"}
						className="w-10 h-10"
					/>
				</div>
			)}
		</div>
	);
};
export default ScrollingIntro;

const useStyles = makeStyles((theme) => ({
	section: {
		width: "300px",
		height: "300px",
		boxShadow: "0px 0px 50px rgb(250, 250, 250, 0.2)",
		"&>img": {
			scale: 0,
			zIndex: 9,
			borderRadius: 40,
			animation: "$bounce 1s infinite",
		},
		"&>p": {
			zIndex: 10,
		},
		"&:hover": {
			width: "500px",
			height: "500px",
			transition: "all 1s ease",
			"&>img": {
				scale: 0.9,
				transition: "all 1s ease",
			},
			"&>p": {
				opacity: 0.1,
				transition: "all 1s ease",
			},
		},
	},
	"@keyframes bounce": {
		"0%, 20%, 50%, 80%, 100%": {
			transform: "translateY(0)",
		},
		"40%": {
			transform: "translateY(-30px)",
		},
		"60%": {
			transform: "translateY(-15px)",
		},
	},
}));
