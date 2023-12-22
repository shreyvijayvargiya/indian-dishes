import { makeStyles, useMediaQuery } from "@material-ui/core";
import React, { useEffect, useState, useRef } from "react";
import { useQuery } from "react-query";
import colors from "tailwindcss/colors";
import { useTransition, animated, useSpring, config } from "react-spring";
import { motion } from "framer-motion";
import { Parallax } from "react-scroll-parallax";
import Wave from "react-wavify";

import { supabaseApp } from "utils";
import { ImFire } from "react-icons/im";
import {
	FaCookieBite,
	FaMapMarkerAlt,
	FaRegClock,
	FaRegSmile,
	FaUtensilSpoon,
} from "react-icons/fa";
import { IoFastFood, IoGiftSharp } from "react-icons/io5";
import GridLines from "react-gridlines";
import { Modal, TextInput } from "@mantine/core";

const IndianCuisineComponent = () => {
	const ref = useRef(null);

	const [active, setActive] = useState(0);
	const [indexValue, setIndexValue] = useState(active);
	const [position, setPosition] = useState({ x: 0, y: 0 });
	const [show, setShow] = useState(false);

	const isMobile = useMediaQuery("(max-width:767px)");
	const perDishHeight = isMobile ? "auto" : "700px";

	const fetchData = async () => {
		const result = await supabaseApp.from("Indian-Food").select("*");
		const feed = result.data;
		return feed;
	};
	const { data: dishFeeds, isLoading } = useQuery(["Indian-Food"], fetchData);

	const [activeDish, setActiveDish] = useState(
		dishFeeds?.length > 0 ? dishFeeds[active] : null
	);

	const styles = useStyles({ position });

	const RenderActiveDish = ({ item, showImage }) => {
		const activeDish = item;
		return (
			<div className="w-full relative border border-gray-500 rounded-md my-4">
				<div className={styles.box}>
					<p className="text-2xl font-semibold p-2 my-2 border-b border-gray-500 font-serif z-50">
						{activeDish?.name}
					</p>
					<div className="w-auto rounded-md m-4">
						<img
							src={`https://picsum.photos/${active}/300`}
							className="rounded-md h-40 w-full"
						/>
					</div>
					<div className="w-full my-4 px-4">
						<div className="bg-gray-900 z-50 border border-gray-800 rounded-md">
							<div className="flex justify-start gap-2 items-center border-b border-gray-500 p-2">
								<IoFastFood size={20} color={colors.indigo[400]} />
								<p className="font-bold text-md">Ingredients</p>
							</div>
							{activeDish?.ingredients && (
								<ul className="mx-10 my-2 list-decimal">
									{activeDish?.ingredients?.split(",")?.map((item) => (
										<li>{item}</li>
									))}
								</ul>
							)}
						</div>
						<div className="border border-gray-500 rounded-md bg-gray-900 my-2 z-50">
							<div className="flex justify-start gap-2 items-center my-1 border-b border-gray-500 p-2">
								<FaRegSmile size={20} color={colors.yellow[400]} />
								<p className="font-bold text-md">Flavour</p>
							</div>
							<div className="flex justify-between items-start w-full p-4">
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
						<div className="bg-gray-900 z-50 border border-gray-800 rounded-md my-2">
							<div className="flex justify-start gap-2 items-center border-b border-gray-500 p-2">
								<FaRegClock size={20} color={colors.pink[400]} />
								<p className="font-bold text-md">Cooking time</p>
							</div>
							<p className="m-3">{activeDish?.cook_time} minutes</p>
						</div>
						<div className="bg-gray-900 z-50 border border-gray-800 rounded-md my-2">
							{activeDish?.state !== "-1" && (
								<div className="py-2">
									<div className="flex justify-start gap-2 items-center border-b border-gray-500 p-2">
										<FaMapMarkerAlt size={20} color={colors.teal[400]} />
										<p className="font-bold text-md ">Origination</p>
									</div>
									<p className="m-4">{activeDish?.state}, India</p>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		);
	};

	const scrollToIndex = (e) => {
		const val = e.target.value;
		if (window !== undefined) {
			window.scrollTo({
				left: 0,
				top: Number(Number(val) * 700),
				behavior: "smooth",
			});
			setActiveDish(dishFeeds[Number(val)]);
			setActive(Number(val));
		}
	};

	const [loadingProgress, setLoadingProgress] = useState(0);

	useEffect(() => {
		const loadingInterval = setInterval(() => {
			if (loadingProgress < 100) {
				setLoadingProgress(loadingProgress < 100 ? loadingProgress + 10 : 5);
			} else {
				setLoadingProgress(100);
			}
		}, 500);
		return () => {
			clearInterval(loadingInterval);
		};
	}, [isLoading, loadingProgress]);

	const ScrollWave = () => {
		return (
			<div
				className="fixed left-0 top-0 bottom-0"
				style={{ translate: "rotateX(90deg)" }}
			>
				<Wave mask="url(#mask)" fill="#1277b0">
					<defs>
						<linearGradient id="gradient" gradientTransform="rotate(90)">
							<stop offset="0" stopColor="white" />
							<stop offset="0.5" stopColor="black" />
						</linearGradient>
						<mask id="mask">
							<rect
								x="0"
								y="0"
								width="20"
								height="1000"
								fill="url(#gradient)"
							/>
						</mask>
					</defs>
				</Wave>
			</div>
		);
	};
	const LoadingPage = () => {
		return (
			<div className="fixed top-0 bottom-0 left-0 right-0 w-full h-screen bg-black flex flex-col justify-center items-center p-80">
				<div>
					<p className="text-7xl font-mono text-center">
						Welcome to Indian Dishes
					</p>
					{loadingProgress < 100 && (
						<div className="w-96 h-8 bg-gray-900 my-5 mx-auto">
							<animated.div
								style={{
									width: loadingProgress + "%",
								}}
								className="bg-gray-800 h-8"
							>
								<p className="font-mono text-sm text-center p-1">
									{loadingProgress}%
								</p>
							</animated.div>
						</div>
					)}
				</div>
			</div>
		);
	};

	const [modal, setModal] = useState(false);
	return (
		<div className="h-full w-full bg-gray-900 text-white relative">
			<GridLines
				lineColor={colors.gray[400]}
				className="h-screen fixed w-full transform rotate-5 opacity-5 z-100"
			/>
			{loadingProgress < 100 ? (
				<LoadingPage />
			) : (
				<div
					className="md:w-full sm:w-full lg:w-3/6 xl:3/6 2xl:w-3/6 mx-auto"
					onMouseOver={() => {
						if (!show) {
							setShow(true);
						}
					}}
				>
					<div
						style={{
							position: "fixed",
							height: (active / dishFeeds?.length) * 100 + "%",
						}}
						className="w-2 border-l-2 border-dotted border-green-400 mx-3"
					/>
					{dishFeeds?.map((item, index) => (
						<div
							className="font-sans font-semibold p-2 mx-3 w-full flex lg:flex-row justify-between md:flex-col 
						sm:flex-col xxs:flex-col xs:flex-col
						items-start relative cursor-pointer z-20 border-l-2 border-dotted border-gray-500 pt-20"
							style={{
								height: perDishHeight,
								width: "100%",
							}}
							key={item.name}
							onMouseOver={(e) => {
								setActive(index + 1);
								setIndexValue(index + 1);
								setActiveDish(dishFeeds[index]);
							}}
							onMouseMoveCapture={(e) => {
								setPosition({ x: e.clientX, y: e.clientY });
							}}
							onMouseDown={(e) => {
								setPosition({ x: 0, y: 0 });
							}}
						>
							<div
								className="flex flex-col justify-center items-start relative pl-6 pb-10"
								onClick={() => setModal(true)}
							>
								{item.image && (
									<img
										src={`https://picsum.photos/${index + 1}/300`}
										className="w-10 h-10 rounded-md absolute top-4"
										style={{ position: "absolute", left: "-20px", top: "4px" }}
									/>
								)}
								<span
									className={`${
										active === index + 1 ? "text-green-400" : "text-gray-400"
									} text-sm`}
								>
									{index + 1}
								</span>{" "}
								<p
									className={`hover:text-white font-light md:text-xl sm:text-3xl xs:text-xs xxs:text-xs border-b border-gray-700 ${
										active === index + 1 ? "text-green-200" : "text-gray-200"
									}`}
								>
									{item?.name}
								</p>
							</div>
							<div>
								{!isMobile ? (
									<div
										className={
											active === index + 1
												? styles.previewbox
												: styles.unpreviewbox
										}
									>
										<RenderActiveDish item={item} />
									</div>
								) : (
									<div className={styles.simplePreviewBox}>
										<RenderActiveDish item={item} />
									</div>
								)}
							</div>
						</div>
					))}
				</div>
			)}
			{position.x > 0 && position.y > 0 && !isMobile && (
				<div
					className="w-auto h-auto p-1 rounded-md z-100"
					style={{
						position: "fixed",
						width: "500px",
						top: position.y + "px",
						left: position.x + "px",
						transition: "top 0.5s ease-in-out",
					}}
				>
					{activeDish && (
						<div className="w-60 h-auto border rounded-md border-gray-700 p-2">
							<img
								src={`https://picsum.photos/${active}/300`}
								className="rounded-md h-40 w-full"
							/>
						</div>
					)}
				</div>
			)}
			{loadingProgress === 100 && (
				<div className="flex justify-between items-center fixed bottom-0 right-0 left-0 z-50 p-4">
					<div className="w-auto px-4 py-2 shadow-2xl rounded-xl text-4xl text-pink-400 font-mono flex justify-center items-center">
						{"["}
						<TextInput
							type="number"
							value={indexValue}
							color="dark"
							onChange={(e) => {
								const val = e.target.value;
								setIndexValue(Number(val));
							}}
							onKeyDown={(e) => {
								if (e.key === "Enter") {
									scrollToIndex(e);
								}
							}}
							classNames={{
								input:
									"bg-gray-900 w-10 border-none text-pink-400 text-2xl px-0 text-center",
								root: "bg-transparent mx-0 px-0",
							}}
						/>
						{"]"}
					</div>
					<div className="w-auto px-4 py-2 bg-gray-800 shadow-2xl rounded-xl">
						<p className="text-sm">
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
			)}
			<Modal
				onClose={() => setModal(false)}
				opened={modal}
				classNames={{
					header: "none",
					root: "bg-black w-full h-full mx-0 p-40",
					modal: "bg-black text-white",
				}}
			>
				<div>
					<RenderActiveDish item={activeDish} />
				</div>
			</Modal>
		</div>
	);
};
export default IndianCuisineComponent;

const useStyles = makeStyles((theme) => ({
	box: {
		height: "100%",
		width: "100%",
		position: "relative",
		[theme.breakpoints.down("lg")]: {
			height: "100%",
			width: "100%",
			margin: "auto",
		},
	},
	simplePreviewBox: {
		height: "auto",
		width: "90vw",
		overflow: "scroll",
	},
	previewbox: {
		zIndex: 50,
		height: "auto",
		position: "sticky",
		width: "500px",
		overflow: "scroll",
		animation: "$flip 0.2s ease-in-out",
		animationTimingFunction: "cubic-bezier(0.42, 0, 0.58, 1)",
		[theme.breakpoints.down("md")]: {
			display: "block",
			height: "90vh",
		},
	},
	"@keyframes flip": {
		"0%": {
			opacity: 0.2,
			scale: "0.1",
		},
		"50%": {
			opacity: 0.6,
			scale: "0.7",
		},
		"100%": {
			opacity: 1,
			scale: 1,
		},
	},

	unpreviewbox: {
		display: "none",
		animation: "$unflip 1s ease-in-out",
		animationTimingFunction: "cubic-bezier(0.42, 0, 0.58, 1)",
	},

	"@keyframes unflip": {
		"0%": {
			opacity: 1,
			display: "block",
			transform: "translateX(-20%)",
		},
		"50%": {
			opacity: 0.6,
			display: "block",
			transform: "translateX(-50%)",
		},
		"100%": {
			opacity: 0,
			display: "none",
			transform: "translateX(-100%)",
		},
	},
}));
