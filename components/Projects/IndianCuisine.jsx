import { IconButton, makeStyles, useMediaQuery } from "@material-ui/core";
import React, { useEffect, useState, useRef } from "react";
import { useQuery } from "react-query";
import colors from "tailwindcss/colors";
import { supabaseApp } from "utils";
import { animated, useSpring } from "react-spring";
import { color, useScroll } from "framer-motion";
import { motion } from "framer-motion";
import { ImFire } from "react-icons/im";
import {
	FaBowlingBall,
	FaCookieBite,
	FaMapMarker,
	FaMapMarkerAlt,
	FaRegClock,
	FaRegSmile,
	FaUtensilSpoon,
} from "react-icons/fa";
import { IoFastFood, IoGiftSharp, IoGitMerge } from "react-icons/io5";
import { AiFillCloseCircle } from "react-icons/ai";
import GridLines from "react-gridlines";

const IndianCuisineComponent = () => {
	const [position, setPosition] = useState({ x: 0, y: 0 });

	const [active, setActive] = useState(0);
	const styles = useStyles({ position, scrollHeight });
	const ref = useRef(null);

	const fetchData = async () => {
		const result = await supabaseApp.from("Indian-Food").select("*");
		const feed = result.data;
		return feed;
	};
	const { data: dishFeeds, isLoading } = useQuery(["Indian-Food"], fetchData);

	const [activeDish, setActiveDish] = useState(
		dishFeeds?.length > 0 ? dishFeeds[active] : null
	);

	const [scrollHeight, setScrollHeight] = useState(0);

	const [show, setShow] = useState(false);

	const { opacity, scale } = useSpring({
		scale: show ? 1 : 0,
		opacity: show ? 1 : 0,
		config: { tension: 300, friction: 20 },
	});

	let lastScrollPosition = window.scrollY;

	const handleScroll = () => {
		const scrollPosition = window.scrollY;
		const childIndex = Math.floor(scrollPosition / 500);
		setShow(true);
		if (active < 0) {
			setActiveDish(dishFeeds[0]);
			setActive(0);
		}
		if (lastScrollPosition > scrollPosition) {
			setShow(true);
			// scrolling up
			setActive(childIndex - 1);
			if (dishFeeds && childIndex > 0) setActiveDish(dishFeeds[childIndex - 1]);
		} else if (lastScrollPosition < scrollPosition) {
			setActive(childIndex + 1);
			if (dishFeeds) setActiveDish(dishFeeds[childIndex + 1]);
		} else {
			setActive(0);
			if (dishFeeds) setActiveDish(dishFeeds[0]);
		}
		setShow(false);
	};

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	const { scrollY } = useScroll({
		target: ref,
		offset: ["start end", "end end"],
	});

	const scrollYVal = scrollY.get();

	const RenderActiveDish = ({ item }) => {
		const activeDish = item;
		return (
			<div className="my-10 rounded-xl w-full shadow-2xl" ref={ref}>
				{isLoading && !activeDish ? (
					<>Loading the cards</>
				) : (
					<div className={styles.box}>
						<p className="text-4xl font-sans font-semibold p-2 my-2 border-b border-gray-700">
							{activeDish?.name}
						</p>

						<div className="w-full my-4 px-4">
							<div className="p-2">
								<div className="flex justify-start gap-2 items-center">
									<IoFastFood size={20} color={colors.indigo[400]} />
									<p className="font-bold text-md">Ingredients</p>
								</div>
								{activeDish?.ingredients && (
									<ul className="mx-8 my-2 list-decimal">
										{activeDish?.ingredients?.split(",")?.map((item) => (
											<li>{item}</li>
										))}
									</ul>
								)}
							</div>
							<div className="py-4 mt-2">
								<div className="flex justify-start gap-2 items-center my-1">
									<FaRegSmile size={20} color={colors.yellow[400]} />
									<p className="font-bold text-md">Flavour</p>
								</div>
								<div className="flex justify-between items-start w-full p-2">
									<div className="text-xs flex justify-between items-center gap-1">
										{activeDish?.flavor_profile === "spicy" && (
											<ImFire size={20} color={colors.red[500]} />
										)}
										{activeDish?.flavor_profile === "bitter" && (
											<FaCookieBite size={20} color={colors.indigo[500]} />
										)}
										{activeDish?.flavor_profile === "sweet" && (
											<IoGiftSharp size={20} color={colors.green[500]} />
										)}
										{activeDish?.flavor_profile === "-1" && (
											<FaUtensilSpoon size={20} color={colors.gray[500]} />
										)}
										{activeDish?.flavor_profile !== "-1"
											? "No specific taste"
											: activeDish?.flavor_profile}
									</div>
								</div>
							</div>
							<div className="py-2">
								<div className="flex justify-start gap-2 items-center">
									<FaRegClock size={20} color={colors.pink[400]} />
									<p className="font-bold text-md">Cooking time</p>
								</div>
								<p className="m-3">{activeDish?.cook_time} minutes</p>
							</div>
							<div>
								{activeDish?.state !== "-1" && (
									<div className="py-2">
										<div className="flex justify-start gap-2 items-center">
											<FaMapMarkerAlt size={20} color={colors.teal[400]} />
											<p className="font-bold text-md ">Origination</p>
										</div>
										<p className="mx-4">{activeDish?.state}, India</p>
									</div>
								)}
							</div>
						</div>
					</div>
				)}
			</div>
		);
	};

	const isMobile = useMediaQuery("max-width: 600px");

	return (
		<div className="h-full w-full bg-gray-900 text-white relative">
			<GridLines
				lineColor={colors.gray[400]}
				className="h-screen fixed w-full transform rotate-5 opacity-5 z-100 "
			/>
			<div
				className="md:w-2/5 sm:w-full mx-auto"
				onMouseMoveCapture={(e) => {
					setPosition({ x: e.clientX, y: e.clientY });
				}}
				onMouseDown={(e) => {
					setPosition({ x: 0, y: 0 });
				}}
				onMouseOut={() => setShow(false)}
			>
				<div
					style={{
						position: "fixed",
						top: 0,
						height: (active / dishFeeds?.length) * 100 + "%",
						bottom: 0,
					}}
					className="w-2 border-l-4 border-dotted border-green-500 mx-3"
				/>
				{dishFeeds?.map((item, index) => (
					<div
						className="font-sans font-semibold p-2 mx-3 w-full flex flex-row justify-between items-start relative cursor-pointer z-20 border-l-2 border-dotted border-gray-500"
						style={{
							height: "500px",
						}}
						key={item.name}
						onClick={() => setShow(true)}
						onMouseOver={(e) => {
							setActive(index);
							setActiveDish(dishFeeds[index]);
						}}
					>
						<div
							className="flex flex-col justify-center items-start relative pl-6 pb-10"
							onClick={() => setShow(true)}
						>
							{item.image && (
								<img
									// src={item.image}
									src="https://oaidalleapiprodscus.blob.core.windows.net/private/org-hHIaQKhHoGjeyQIs4R75BJvf/user-selfNgrZQO3HcV1BxwhTUJUS/img-HVnHz2SCDU8JsMa52PlnOsbm.png?st=2023-12-20T13%3A22%3A02Z&se=2023-12-20T15%3A22%3A02Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-12-20T01%3A04%3A43Z&ske=2023-12-21T01%3A04%3A43Z&sks=b&skv=2021-08-06&sig=mgbfOM5fSNfv//m8dP650ZJYnbt22FfXJWv4/0GCQO8%3D"
									className="w-10 h-10 rounded-md absolute top-4"
									style={{ position: "absolute", left: "-20px", top: "4px" }}
								/>
							)}
							<span className="text-green-400 text-sm">{index + 1}</span>{" "}
							<p className="text-gray-300 hover:text-white font-light md:text-xl sm:text-3xl xs:text-xs xxs:text-xs border-b border-gray-700">
								{item?.name}
							</p>
						</div>
					</div>
				))}
			</div>

			<div className={styles.previewbox}>
				<RenderActiveDish item={activeDish} />
			</div>
			{position.x > 0 && position.y > 0 && !isMobile && (
				<div
					className="w-auto h-auto p-1 rounded-md z-100"
					style={{
						position: "fixed",
						width: "500px",
						top: position.y - 100 + "px",
						left: position.x + 200 + "px",
						opacity: position.x > 0 ? 1 : 0,
						transition: "top 0.5s ease-in-out",
					}}
				>
					<RenderActiveDish item={activeDish} />
				</div>
			)}
			<div className="fixed bottom-10 right-10 w-auto px-4 py-2 bg-gray-800 shadow-2xl rounded-xl">
				<p>
					Made by{" "}
					<a
						href="https://shreys-portfolio.vercel.app/"
						target="_blank"
						className="text-orange-300 underline font-semibold"
					>
						Shrey
					</a>
				</p>
			</div>
		</div>
	);
};
export default IndianCuisineComponent;

const useStyles = makeStyles((theme) => ({
	box: {
		height: "100%",
		width: "100%",
		position: "relative",
		border: `1px solid ${colors.gray[700]}`,
		backgroundColor: colors.gray[900],
		borderRadius: 10,
		[theme.breakpoints.down("lg")]: {
			height: "auto",
			width: "auto",
			margin: "auto",
		},
	},
	previewbox: {
		overflowX: "scroll",
		padding: theme.spacing(1),
		zIndex: 50,
		transition: "height 0.5s ease-in-out",
		[theme.breakpoints.down("md")]: {
			display: "block",
			position: "fixed",
			top: "50%",
			left: "50%",
			transform: "translate(-50%, -50%)",
			width: "90vw",
			height: "90vh",
		},
		[theme.breakpoints.up("md")]: {
			display: "none",
		},
	},

	hoizontalLine: {
		borderBottom: `1px solid ${colors.indigo[400]}`,
		height: "1px",
		width: "500px",
		zIndex: 100,
		position: "fixed",
		top: "19%",
		left: "50%",
		padding: "1px",
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
	},
	previewContainer: {
		position: "fixed",
		left: "50%",
		bottom: "15%",
		width: "500px",
		height: "auto",
		overflowX: "scroll",
		padding: theme.spacing(1),
	},
	zigzagContainer: {
		position: "relative",
		overflow: "hidden",
	},
	zigzagContent: {
		padding: theme.spacing(2), // Adjust the padding as needed
	},
	zigzagBorder: {
		position: "absolute",
		top: 0,
		left: 0,
		width: "100%",
		height: "100%",
		border: `2px solid ${theme.palette.text.primary}`, // Border color
		borderRadius: theme.spacing(1), // Adjust the border-radius to control the curvature
		clipPath:
			"polygon(0% 0%, 10% 100%, 20% 0%, 30% 100%, 40% 0%, 50% 100%, 60% 0%, 70% 100%, 80% 0%, 90% 100%, 100% 0%)",
	},
}));
