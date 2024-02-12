import { useEffect, useLayoutEffect, useState } from "react";
import { Button } from "@mantine/core";
import gsap from "gsap";
import colors from "tailwindcss/colors";
import { makeStyles } from "@material-ui/core";
import _ from "lodash";
import { Typewriter } from "react-simple-typewriter";
import GridLines from "react-gridlines";
import GithubCalenderContribution from "components/Projects/GithubCalender";
import useSound from "use-sound";

const TechStack = ({ showAnimationButtons = false }) => {
	const stacks = [
		"! DSA",
		"% express.js",
		"+ vercel",
		"- next.js",
		"* supabase",
		"! astro",
		"& tailwind-css",
		"# animations",
		"[npm]",
		"@ api",
		"( github )",
	];
	const images = [
		"javascript",
		"nodejs",
		"reactjs",
		"react-native",
		"html",
		"css",
		"firebase",
	];

	const [active, setActive] = useState(0);
	let innerWidth;

	useEffect(() => {
		innerWidth = window?.innerWidth;
		const tl = gsap.timeline();
		images.map((item, index) => {
			tl.fromTo(
				`.icon-container-${item}`,
				{ y: "-" + index + "10px", scale: 0.2 },
				{ y: "0px", scale: 1 },
				{ delay: 0.2 * index, duration: 3, ease: "power2.out" }
			);
		});
	}, []);

	const [play] = useSound("./sound-clips/piano-sound.mp3", { volume: 0.2 });

	useEffect(() => {
		gsap.from(".stack-container", { scale: 0.8 });
		gsap.fromTo(
			".wave",
			{
				x: "0%",
			},
			{
				x: "-5%",
				duration: 10,
				repeat: -1,
				ease: "linear",
				yoyo: true,
			}
		);
		gsap.fromTo(
			".wave-shadow",
			{
				x: "0%",
			},
			{
				x: "-4%",
				duration: 10,
				repeat: -1,
				ease: "linear",
				yoyo: true,
			}
		);
	}, [active]);

	useEffect(() => {
		gsap.fromTo(
			".github-calender",
			{ width: "0%", visibility: "hidden", height: "0%" },
			{
				repeat: -1,
				duration: 4,
				yoyo: true,
				height: "100%",
				visibility: "visible",
				width: "200px",
				borderColor: colors.gray[600],
			}
		);
		gsap.fromTo(
			".github-contribution-text",
			{ yPercent: 50, xPercent: 10 },
			{ yPercent: -20, repeat: -1, yoyo: true, duration: 4 }
		);
		bounceTheBar();
	}, []);

	const animateIcons = () => {
		images.map((item, index) => {
			const tl = gsap.timeline();
			tl.fromTo(
				`.icon-container-${item}`,
				{ y: "-" + index + "10px", scale: 0.2, opacity: 0.1 },
				{ y: "0px", scale: 1, opacity: 1, stagger: 1 },
				{ delay: 1 * index, duration: 4, ease: "power2.out", stagger: 1 }
			);
		});
	};

	const animateIconsLeft = () => {
		images.map((item, index) => {
			const tl = gsap.timeline();
			tl.fromTo(
				`.icon-container-${item}`,
				{ x: "-" + index + "10px", scale: 0.2, opacity: 0.1 },
				{ x: "0px", scale: 1, opacity: 1, stagger: 1 },
				{ delay: index, duration: 4, ease: "power2.out", stagger: 1 }
			);
		});
	};

	const bounceTheBar = () => {
		const tl = gsap.timeline();
		tl.fromTo(
			".stack-container",
			{ x: "-10px", skewX: "-5deg", scale: 1 },
			{
				x: "10px",
				skewX: "5deg",
				scale: 1.2,
				repeat: -1,
				duration: 1,
				yoyo: true,
			}
		).fromTo(
			".moving-container",
			{
				xPercent: 0,
			},
			{
				xPercent: -2,
				duration: 10,
				repeat: -1,
				yoyo: true,
			}
		);
	};
	const styles = useStyles();

	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
	return (
		<div
			className="bg-black bg-opacity-95 h-screen w-full flex flex-col justify-center items-center relative"
			onMouseMove={(e) => setMousePosition({ x: e.clientX, y: e.clientY })}
		>
			<GridLines
				lineColor={colors.gray[400]}
				className="h-full absolute w-full transform rotate-5 opacity-5 z-100"
			/>

			<div>
				<div
					className={`stack-container flex md:flex-row justify-evenly my-10 items-center p-4 rounded-2xl bg-black bg-opacity-5 border-2 border-dashed border-gray-500 ${styles.stackContainer}`}
				>
					{images.map((item, index) => {
						return (
							<div
								key={item}
								className={`p-2 cursor-pointer py-4`}
								onMouseEnter={() => {
									setActive(index);
									play();
									gsap.fromTo(
										`.icon-container-${item}`,
										{
											scale: 0.8,
											y: "0px",
											rotateX: "0deg",
										},
										{
											scale: 1.1,
											y: "-20px",
											rotateX: "0deg",
										}
									);
								}}
								onMouseLeave={() => {
									setActive(false);
									gsap.fromTo(
										`.icon-container-${item}`,
										{ scale: 1.1, y: "-30px", rotateX: "360deg" },
										{ scale: 1, y: "0px", rotateX: "0deg" }
									);
								}}
							>
								<img
									className={`border border-gray-500 hover:border-gray-500 md:w-20 md:h-20 sm:h-10 sm:w-10 xxs:h-8 xxs:w-8 xs:w-8 xs:h-8 object-contain bg-blend-darken rounded-2xl icon-container-${item}
								image-item-${index}`}
									src={`./logos/${item}.svg`}
								/>
								{active === index && (
									<div className="mx-auto text-xs text-center text-gray-500">
										{item}
									</div>
								)}
							</div>
						);
					})}
				</div>
				<div className="flex justify-center items-center gap-1 text-4xl text-blue-400 my-10 absolute bottom-10 left-0 right-0 mx-auto">
					<p className="text-gray-300 text-xl">{"{"}</p>

					<div className="tech-stack-text text-xl">
						<Typewriter loop={100} cursor="_" words={["my tech stack"]} />
					</div>
					<p className="text-gray-300 text-xl">{"}"}</p>
				</div>
			</div>
			<div className="absolute left-10 bottom-10 flex justify-center items-center gap-1 md:block sm:hidden xxs:hidden xs:hidden">
				<div className="github-calender relative w-full h-full bg-black bg-opacity-30 rounded-xl z-50 ">
					<GithubCalenderContribution />
					<span className="text-gray-400 text-xs w-full">
						Github contributions
					</span>
				</div>
				<p className="text-gray-600 absolute top-0 left-0 bottom-0 right-0 bg-black bg-opacity-90 border border-dashed border-gray-900 p-2 rounded-xl flex justify-center items-center github-contribution-text text-xs z-0" />
			</div>
			<div className="moving-container text-indigo-400 flex justify-around items-center w-full gap-10 group-hover:bg-black md:flex-row overflow-hidden">
				{stacks.map((item) => (
					<div
						key={item}
						className="text-x w-full text-brown-400 py-2 text-center hover:bg-gray-900 cursor-pointer hover:text-white border-dotted border-2 border-gray-700 rounded-xl"
					>
						{item}
					</div>
				))}
			</div>
			{showAnimationButtons && (
				<div className="flex justify-evenly items-center gap-4">
					<Button onClick={animateIcons} color="dark" variant="filled">
						Top Animation
					</Button>
					<br />
					<Button onClick={animateIconsLeft} color="dark" variant="filled">
						Left Animation
					</Button>
				</div>
			)}
		</div>
	);
};
export default TechStack;

const useStyles = makeStyles((theme) => ({
	stackContainer: {
		width: "100%",
		boxShadow: "0px 0px 50px rgb(255, 255, 255, 0.2)",
		transition: "all 0.5s ease",
		"&:hover": {
			scale: 1.2,
			boxShadow: "0px 0px 60px rgb(255, 255, 255, 0.3)",
		},
	},
	stackText: {
		fontFamily: "phosphate",
		fontSize: "14em",
		zIndex: -10,
		opacity: 0.1,
		textTransform: "rotate(-5deg)",
		[theme.breakpoints.down("sm")]: {
			fontSize: "4em",
		},
	},
	circleClipper: {
		"&::before": {
			content: "",
			position: "absolute",
			top: "50%",
			left: "50%",
			width: "100%",
			height: "100%",
			background: "linear-gradient(180deg, transparent 50%, black 50%)",
			borderRadius: "50%",
			transform: "translate(-50%, -50%)",
			zIndex: 1,
		},
	},
}));
