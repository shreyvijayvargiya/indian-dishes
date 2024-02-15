import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import dynamic from "next/dynamic";
import {
	Events,
	Element,
	animateScroll as scroll,
	scrollSpy,
} from "react-scroll";
import { useParallax, Parallax } from "react-scroll-parallax";
import { Button } from "@mantine/core";
import { makeStyles } from "@material-ui/core";
import colors from "tailwindcss/colors";

const objs = [
	{
		id: 1,
		name: "i am a Software Developer",
		image: "./intro-images/Rectangle 6.svg",
	},
	{
		id: 2,
		name: "with 4 Years of experience",
		image: "./intro-images/Rectangle 7.svg",
	},
	{
		id: 3,
		name: "in Website development,",
		image: "./intro-images/Rectangle 8.svg",
	},
	{
		id: 4,
		name: "mobile app development &",
		image: "./intro-images/Rectangle 9.svg",
	},
	{
		id: 5,
		name: "backend development",
		image: "./intro-images/Rectangle 10.svg",
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
	const [active, setActive] = useState(null);
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
					scale: 0,
					yPercent: 40,
				},
				{
					opacity: 1,
					scale: 1,
					yPercent: 0,
				}
			);
		});
	}, []);

	useEffect(() => {
		gsap.fromTo(
			".bg-image",
			{
				x: "10px",
				y: "10px",
				skewX: "10deg",
				borderRadius: 50,
				width: "80%",
			},
			{
				x: "-10px",
				y: "-20px",
				repeat: -1,
				width: "100%",
				borderRadius: 20,
				duration: 4,
				skewX: "10deg",
				yoyo: true,
			}
		);
	}, []);

	return (
		<div
			className="scrolling-container relative mx-auto my-20 w-full"
			ref={containerRef}
			style={{ scrollbarWidth: 0, scrollBehavior: "smooth" }}
			onMouseMove={(e) => {
				setMousePosition({ x: e.clientX, y: e.clientY });
			}}
		>
			<div
				className={`flex justify-around items-center gap-10 md:flex-row sm:flex-col xxs:flex-col xs:flex-col sections-container ${styles.container}`}
			>
				{objs.map((item, index) => {
					return (
						<Parallax speed={10}>
							<section
								key={item.id}
								className={`section-${index} sections ${styles.section} relative m-10 `}
							>
								<p
									className={`item-${index} text-white text-2xl opacity-100 text-center font-serif font-bold text-item z-100 relative flex justify-center items-center top-36`}
									style={{ zIndex: 100 }}
								>
									{item.name}
								</p>
								<img
									src={item.image}
									alt={item.name}
									className={`w-full h-full opacity-50 hover:opacity-80 z-80 mx-auto bg-image ${styles.img} `}
								/>
							</section>
						</Parallax>
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
						className="w-4 h-4 object-cover"
					/>
				</div>
			)}
		</div>
	);
};
export default Introduction;

const useStyles = makeStyles((theme) => ({
	container: {
		width: "fit-content",
		width: "95%",
		padding: 10,
		margin: "auto",
	},
	section: {
		width: "100%",
		height: "30vh",
		backgroundAttachment: "fixed",
		margin: "auto",
		cursor: "pointer",
		"&:hover": {
			"& >img": {
				scale: 0.9,
				transition: "all 0.5 ease",
			},
		},
	},
	img: {
		zIndex: 10,
		boxShadow: "0px 0px 40px rgb(250, 250, 250, 0.1)",
		outline: `2px dashed ${colors.trueGray[700]}`,
		rotate: "rotateX(40deg)",
		objectFit: "cover",
	},
}));
