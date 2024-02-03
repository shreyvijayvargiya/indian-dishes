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

const intervals = [
	{ start: 0, end: 2, index: 0 },
	{ start: 2, end: 4, index: 1 },
	{ start: 4, end: 6, index: 2 },
	{ start: 6, end: 8, index: 3 },
	{ start: 8, end: 10, index: 4 },
];

const Introduction = () => {
	const containerRef = useRef();

	const [mousePosition, setMousePosition] = useState({
		x: 0,
		y: 0,
	});
	const [scrollPosition, setScrollPosition] = useState(0);
	const styles = useStyles();

	useEffect(() => {
		const sections = gsap.utils.toArray(".scrolling-container .sections");
		const tl = gsap.timeline();

		sections.forEach((section, index) => {
			tl.fromTo(
				`.section-${index}`,
				{
					opacity: 0,
					yPercent: 40,
				},
				{
					opacity: 1,
					yPercent: 0,
				}
			);
		});
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
			<div className="w-full flex justify-around my-4 items-center flex-col gap-4 sections-container p-10 place-content-center relative">
				{objs.map((item, index) => {
					return (
						<section
							key={item.id}
							onMouseOver={() => setActive(item)}
							onMouseOut={() => setActive(null)}
							className={`section-${index} sections px-10 text-gray-200 my-4 ${styles.section}`}
						>
							<p
								className={`item-${index} py-20 flex flex-col justify-center items-center hover:text-white text-center text-6xl place-content-center font-bold`}
								style={{ fontFamily: "Leckerli One" }}
							>
								{item.name}
							</p>
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
	},
}));
