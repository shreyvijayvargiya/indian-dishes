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
import GridLines from "react-gridlines";
import colors from "tailwindcss/colors";

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

const Introduction = () => {
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
		const tl = gsap.timeline({});
		tl.fromTo(
			".sections-container",
			{ yPercent: 200, opacity: 1 },
			{
				yPercent: 0,
				opacity: 1,
				duration: 1,
			}
		);
		objs.forEach((item, index) => {
			tl.fromTo(
				`.section-${index}`,
				{
					opacity: 0,
					yPercent: 50 + index * 10,
					xPercent: -(index * 10),
				},
				{
					opacity: 1,
					xPercent: 0,
					yPercent: 0,
					stagger: 0.5,
				}
			);
		});
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	const [active, setActive] = useState(null);

	return (
		<div
			className="scrolling-container relative mx-auto overflow-hidden bg-black bg-opacity-10"
			ref={containerRef}
			onMouseMove={(e) => {
				setMousePosition({ x: e.clientX, y: e.clientY });
			}}
		>
			<div className="w-full flex justify-around my-4 items-center flex-col gap-4 sections-container p-10 relative place-content-center">
				{objs.map((item, index = 0) => {
					return (
						<section
							key={item.id}
							onMouseOver={() => setActive(item)}
							onMouseOut={() => setActive(null)}
							className={`section-${index} px-10 text-gray-200 my-4 ${styles.section}`}
						>
							<p
								className={`item-${index} py-20 flex flex-col justify-center items-center hover:text-white text-center text-6xl place-content-center font-bold`}
								style={{ fontFamily: "Leckerli One" }}
							>
								{item.name}
							</p>
							{/* {active?.id === item.id && (
								<img
									src={item?.image}
									className="w-full h-full object-contain rounded-xl absolute top-0 left-0 right-0 bottom-0"
								/>
							)} */}
						</section>
					);
				})}
			</div>
			{mousePosition.x && mousePosition.y && (
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
export default Introduction;

const useStyles = makeStyles((theme) => ({
	section: {
		width: "100%",
		// boxShadow: "0px 0px 30px rgb(250, 250, 250, 0.2)",
		"&>p": {
			zIndex: 10,
		},
		"&:hover": {
			// boxShadow: "0px 0px 30px rgb(250, 250, 250, 0.4)",
			transition: "all 1s ease",
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
