import { makeStyles, useMediaQuery } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import colors from "tailwindcss/colors";
import { animated, useSpring } from "react-spring";
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
	const [active, setActive] = useState(0);
	const [indexValue, setIndexValue] = useState(active);
	const [position, setPosition] = useState({ x: 0, y: 0 });

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
			<div
				className="w-full relative border border-gray-500 rounded-md my-4"
				key={item.name}
			>
				<div className={styles.box}>
					<p className="text-2xl font-semibold p-2 my-2 border-b border-gray-500 font-serif z-50">
						{activeDish?.name}
					</p>
					{showImage && (
						<div className="w-auto rounded-md m-4">
							<img
								src={`77u/PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48RXJyb3I+PENvZGU+QXV0aGVudGljYXRpb25GYWlsZWQ8L0NvZGU+PE1lc3NhZ2U+U2VydmVyIGZhaWxlZCB0byBhdXRoZW50aWNhdGUgdGhlIHJlcXVlc3QuIE1ha2Ugc3VyZSB0aGUgdmFsdWUgb2YgQXV0aG9yaXphdGlvbiBoZWFkZXIgaXMgZm9ybWVkIGNvcnJlY3RseSBpbmNsdWRpbmcgdGhlIHNpZ25hdHVyZS4KUmVxdWVzdElkOmYxNDExMWU2LTQwMWUtMDAyNy0xZDg1LTNjNWIzOTAwMDAwMApUaW1lOjIwMjQtMDEtMDFUMDc6Mzg6NDQuNDI0MjM0MFo8L01lc3NhZ2U+PEF1dGhlbnRpY2F0aW9uRXJyb3JEZXRhaWw+U2lnbmF0dXJlIG5vdCB2YWxpZCBpbiB0aGUgc3BlY2lmaWVkIHRpbWUgZnJhbWU6IFN0YXJ0IFtUdWUsIDE5IERlYyAyMDIzIDE4OjAwOjU3IEdNVF0gLSBFeHBpcnkgW1R1ZSwgMTkgRGVjIDIwMjMgMjA6MDA6NTcgR01UXSAtIEN1cnJlbnQgW01vbiwgMDEgSmFuIDIwMjQgMDc6Mzg6NDQgR01UXTwvQXV0aGVudGljYXRpb25FcnJvckRldGFpbD48L0Vycm9yPg==`}
								className="rounded-md h-40 w-full object-fill"
							/>
						</div>
					)}
					<div className="w-full my-4 px-4">
						<div className="bg-gray-900 z-50 border border-gray-800 rounded-md">
							<div className="flex justify-start gap-2 items-center border-b border-gray-500 p-2">
								<IoFastFood size={20} color={colors.indigo[400]} />
								<p className="font-bold text-md">Ingredients</p>
							</div>
							{activeDish?.ingredients && (
								<ul className="mx-10 my-2 list-decimal">
									{activeDish?.ingredients?.split(",")?.map((item) => (
										<li key={item}>{item}</li>
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

	const [loading, setLoading] = useState(false);

	const [progress, setProgress] = useState(0);

	const loadingSpring = useSpring({
		from: { width: "0%" },
		to: { width: "100%" },
		onStart: () => setLoading(true),
		onRest: () => setLoading(false),
		onChange: (val) => setProgress(val?.value?.width?.split("%")[0]),
		config: {
			duration: 3000,
		},
		exitBeforeEnter: false,
	});

	const LoadingText = () => {
		return (
			<p
				style={{
					width: progress,
					transition: "width 1s ease",
					whiteSpace: "nowrap",
					overflow: "hidden",
				}}
				className="md:text-7xl sm:text-5xl xs:text-xl font-serif"
			>
				Welcome to Indian Dishes
			</p>
		);
	};

	const LoadingPage = () => {
		return (
			<div className="fixed top-0 bottom-0 left-0 right-0 w-full bg-black flex flex-col justify-center items-center p-80 z-100">
				<div className="font-serif">
					<LoadingText />
					<div className="w-96 h-8 bg-gray-900 my-5 mx-auto">
						<animated.div style={loadingSpring} className="bg-indigo-600 h-8">
							<p className="font-mono text-sm text-center text-white p-1">
								{Math.round(progress.toString())}%
							</p>
						</animated.div>
					</div>
				</div>
			</div>
		);
	};

	const [modal, setModal] = useState(false);
	const [scrollPos, setScrollPos] = useState();

	useEffect(() => {
		const handleScroll = () => {
			const currentScrollPos = window.scrollY;
			// if scroll up move element from left -50% to 0% left to right
			// if scroll down move element from 0% to 50% from right to left

			if (currentScrollPos > scrollPos) {
				console.log("moving down");
			} else {
				console.log("moving up");
			}
			setScrollPos(window.scrollY);
		};
		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<div className="h-full w-full bg-gray-900 text-white relative">
			<div
				style={{
					position: "fixed",
					top: 0,
					left: 0,
					height: (active / dishFeeds?.length) * 100 + "%",
					bottom: 0,
					transition: "height 0.5s ease-in-out",
				}}
				className="w-1 rounded-b-xl bg-gradient-to-r from-blue-800 via-purple-500 to-pink-500"
			/>
			<GridLines
				lineColor={colors.gray[400]}
				className="h-screen fixed w-full transform rotate-5 opacity-5 z-100"
			/>
			{loading ? (
				<LoadingPage />
			) : (
				<div className="md:w-full sm:w-full lg:w-3/6 xl:3/6 2xl:w-3/6 mx-auto">
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
							key={item.name}
							style={{
								height: perDishHeight,
								width: "100%",
							}}
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
										style={{
											position: "absolute",
											left: "-20px",
											top: "4px",
										}}
									/>
								)}
								<span
									className={`${
										active === index + 1 ? "text-green-300" : "text-gray-400"
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
							<div className={styles.previewContainer}>
								<div>
									{!isMobile ? (
										<div
											className={
												active === index + 1
													? styles.previewbox
													: styles.unpreviewbox
											}
										>
											<RenderActiveDish item={item} key={item.name} />
										</div>
									) : (
										<div className={styles.simplePreviewBox}>
											<RenderActiveDish item={item} key={item.name} />
										</div>
									)}
								</div>
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
						<div className="w-40 h-auto border rounded-md border-gray-700 p-2">
							<p>{activeDish.name}</p>
							<img
								src={`77u/PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48RXJyb3I+PENvZGU+QXV0aGVudGljYXRpb25GYWlsZWQ8L0NvZGU+PE1lc3NhZ2U+U2VydmVyIGZhaWxlZCB0byBhdXRoZW50aWNhdGUgdGhlIHJlcXVlc3QuIE1ha2Ugc3VyZSB0aGUgdmFsdWUgb2YgQXV0aG9yaXphdGlvbiBoZWFkZXIgaXMgZm9ybWVkIGNvcnJlY3RseSBpbmNsdWRpbmcgdGhlIHNpZ25hdHVyZS4KUmVxdWVzdElkOmYxNDExMWU2LTQwMWUtMDAyNy0xZDg1LTNjNWIzOTAwMDAwMApUaW1lOjIwMjQtMDEtMDFUMDc6Mzg6NDQuNDI0MjM0MFo8L01lc3NhZ2U+PEF1dGhlbnRpY2F0aW9uRXJyb3JEZXRhaWw+U2lnbmF0dXJlIG5vdCB2YWxpZCBpbiB0aGUgc3BlY2lmaWVkIHRpbWUgZnJhbWU6IFN0YXJ0IFtUdWUsIDE5IERlYyAyMDIzIDE4OjAwOjU3IEdNVF0gLSBFeHBpcnkgW1R1ZSwgMTkgRGVjIDIwMjMgMjA6MDA6NTcgR01UXSAtIEN1cnJlbnQgW01vbiwgMDEgSmFuIDIwMjQgMDc6Mzg6NDQgR01UXTwvQXV0aGVudGljYXRpb25FcnJvckRldGFpbD48L0Vycm9yPg==`}
								className="rounded-md h-24 w-full"
							/>
						</div>
					)}
				</div>
			)}
			{!loading && (
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
								root: "bg-transparent mx-0 px-0 ",
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
				<RenderActiveDish showImage item={activeDish} />
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
	previewContainer: {
		position: "relative",
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
			transform: "translateX(100%)",
		},
		"50%": {
			transform: "translateX(50%)",
		},
		"100%": {
			transform: "translateX(0%)",
		},
	},
	animatedText: {
		animation: "$textAnimation 0.2s ease-in-out",
		animationTimingFunction: "cubic-bezier(0.42, 0, 0.58, 1)",
	},
	"@keyframes textAnimation": {
		"0%": {
			opacity: 0.2,
			width: "20%",
		},
		"50%": {
			opacity: 0.6,
			width: "60%",
		},
		"100%": {
			opacity: 1,
			width: "100%",
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
			scale: 1,
			transform: "translateX(-100%)",
		},
		"50%": {
			opacity: 0.3,
			display: "block",
			scale: 0.5,
			transform: "translateX(-50%)",
		},
		"100%": {
			opacity: 0,
			display: "none",
			scale: 0,
			transform: "translateX(0%)",
		},
	},
}));
