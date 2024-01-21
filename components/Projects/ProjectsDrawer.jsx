import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import { FaBars } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useSpring, animated } from "@react-spring/web";
import colors from "tailwindcss/colors";

const ProjectsDrawer = () => {
	const tree = [
		{
			id: 1,
			content: "Welcome to Shrey's projects",
		},
		{
			id: 2,
			content: "Getting started with React.js",
		},
		{
			id: 3,
			content: "First projects",
		},
		{
			id: 4,
			content: "Fourth project",
		},
		{
			id: 5,
			content: "Fifth Project",
		},
		{
			id: 6,
			content: "Introduction to Gatsby.js",
		},
		{
			id: 7,
			content: "Welcome to Supabase",
		},
		{
			id: 8,
			content: "React Timeline in 4 steps",
		},
		{
			id: 9,
			content: "VS Code Web Editor",
		},
	];

	const [mouse, setMouse] = useState({ x: 100, y: 100 });

	const handleMouseMove = (e) => {
		setMouse({ x: e.clientX, y: e.clientY });
	};

	const [browser, setBrowser] = useState({
		width: 0,
		height: 0,
	});

	useEffect(() => {
		setBrowser({ width: window.innerWidth, height: window.innerHeight });
	}, []);

	const [active, setActive] = useState(tree[0]);

	const rotatePercent = Math.abs(mouse.x / browser.width) * 100;


	const [show, setShow] = useState(true);

	const { width, height } = useSpring({
		width: show ? "30%" : "0%",
		height: show ? "100%" : "0%",
		config: {
			duration: 500,
		},
	});

	const toggleSidebar = () => {
		setShow(!show);
	};

	return (
		<div
			className="bg-black h-screen w-full bg-opacity-95"
			onMouseMoveCapture={handleMouseMove}
		>
			<div className="rounded-xl mx-auto md:fixed flex-col xl:top-40 md:top-40 sm:top-20 xxs:top-20 xs:top-20 sm:bottom-20 xxs:bottom-20 xs:bottom-20 md:bottom-40 xxl:left-80 xxl:right-80 md:left-40 md:right-40">
				<div
					className="flex flex-row justify-between items-start w-full h-full gap-4"
					onMouseMoveCapture={(e) => {
						e.preventDefault();
						setMouse({ x: 150, y: 100 });
					}}
				>
					<animated.div
						className="mx-4 h-full overflow-y-scroll rounded-xl border-gray-600 border"
						style={{
							width,
							height,
							visibility: show ? "visible" : "hidden",
							transition: "height 0.5s width 0.5s",
							transform: `${
								rotatePercent > 50
									? `rotateZ(${100 * rotatePercent}px)`
									: `rotateZ(${rotatePercent * 100 + 10}px)`
							} `,
						}}
					>
						{tree.map((item) => {
							return (
								<div
									className={`border-b border-gray-600 p-4 hover:bg-blackBg hover:bg-opacity-25 z-40 cursor-pointer ${
										item.id === 1
											? "rounded-tl-xl"
											: null + " " + item.id === tree.length - 1
											? "rounded-bl-xl"
											: null
									}`}
									key={item.id}
								>
									<p
										className="text-4xl text-gray-400 hover:text-white  font-serif"
										onClick={() => setActive(item)}
									>
										#{item.id}
									</p>
								</div>
							);
						})}
					</animated.div>
					<animated.div
						className="p-10 h-full rounded-xl border-gray-600 border bg-blackShade"
						style={{
							width: width.to((value) => `calc(100% - ${value})`),
							boxShadow: `0 0 ${
								mouse.x > 200 ? mouse.x : 50
							}px rgba(255, 255, 255, 0.2)`,
							transition: "all 1s ease",
						}}
					>
						<p className="text-white text-7xl font-serif">{active.content}</p>
					</animated.div>
				</div>
			</div>
			<animated.div
				className="w-auto h-auto fixed bottom-20 left-20 p-4 rounded-full border-gray-500 border bg-black bg-opacity-5 bg-none cursor-pointer hover:border-gray-400"
				style={{
					transform: show ? "": "translateX(200px) translateY(-100px)",
					transition: "transform 2s ease",
				}}
			>
				{show ? (
					<IoClose size={24} color={colors.gray[400]} onClick={toggleSidebar} />
				) : (
					<FaBars size={24} color={colors.gray[400]} onClick={toggleSidebar} />
				)}
			</animated.div>
		</div>
	);
};
export default ProjectsDrawer;

