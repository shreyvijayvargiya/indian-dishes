import { useEffect, useRef, useState } from "react";
import { StylesProvider, makeStyles } from "@material-ui/core";
import gsap from "gsap";
import colors from "tailwindcss/colors";
import GridLines from "react-gridlines";
import { FaBars, FaList } from "react-icons/fa";
import { IoCloseCircle, IoLogoStackoverflow } from "react-icons/io5";
import useSound from "use-sound";

const projects = [
	{
		url: "https://tailwind-css-theme-toggle-demo.vercel.app/",
		device: "desktop",
		title: "3D Globe",
	},
	{
		url: "https://ihatereading.in",
		device: "desktop",
		title: "Breaking topcis into steps",
	},
	{
		url: "https://indian-dishes.vercel.app/glowy-navbar",
		device: "desktop",
		title: "Glowy Navbar",
	},
	{
		url: "https://indian-dishes.vercel.app/shuffle-text",
		device: "desktop",
		title: "Text shuffling",
	},
	{
		url: "https://web-code-editor-sage.vercel.app/",
		device: "desktop",
		title: "VS Code Editor",
	},
	{
		url: "https://indian-dishes.vercel.app/crazy-modal",
		device: "desktop",
		title: "Damm Modal",
	},
	{
		url: "https://indian-dishes.vercel.app/pin-image",
		device: "desktop",
		title: "Pin Image",
	},
	{
		url: "https://indian-dishes.vercel.app/link-preview",
		device: "desktop",
		title: "link preview",
	},
	{
		url: "https://indian-dishes.vercel.app/blog-drawer",
		device: "desktop",
		title: "blog drawer",
	},
	{
		url: "https://musiversal-task.vercel.app/",
		device: "desktop",
		title: "music assembler",
	},
	{
		url: "https://eth-txns.vercel.app/",
		device: "desktop",
		title: "ethereum transactions",
	},
	{
		url: "https://portfolio-social-cards-starter.vercel.app/",
		device: "desktop",
		title: "social media showcase portfolio",
	},
	{
		url: "https://newsletter-calender-starter-kit.vercel.app/",
		device: "desktop",
		title: "newsletter business kit",
	},
	{
		url: "https://uireactlibrary.vercel.app/?path=/story/layout--navbar",
		device: "desktop",
		title: "UI library storybook",
	},
	{
		url: "https://indian-dishes.vercel.app/link-preview/projects/live-time",
		device: "desktop",
		title: "Live time component",
	},
];

const ProjectsGallery = () => {
	const classes = useStyles();
	const frameRef = useRef(null);
	const bar = useRef(null);
	const [active, setActive] = useState(projects[0]);
	const [play] = useSound("./sound-clips/sound-keyboard.mp3", { volume: 0.6 });

	const [show, setShow] = useState(false);

	useEffect(() => {
		gsap.fromTo(
			".project-bg-image",
			{ skewX: "-2deg", transformOrigin: "center center" },
			{
				skewX: "2deg",
				rotation: 360,
				duration: 300,
				transformOrigin: "center center",
				repeat: -1,
				yoyo: true,
			}
		);
	}, []);

	return (
		<div className="min-h-screen w-full py-10 flex flex-col justify-center items-center bg-black bg-opacity-95">
			<div>
				<img
					src="./gridlines.svg"
					width={"100%"}
					height={"100%"}
					className="project-bg-image fixed top-0 left-0 bottom-0 right-0 z-0 opacity-5 rotate-45 skew-x-6 rounded-full border-4 border-dotted border-gray-100 sm:none block"
					style={{
						perspective: "3d 1000px",
					}}
				/>
			</div>
			<div className="flex flex-row justify-around items-center w-full h-full">
				<div className={`${classes.projectListContainer}`}>
					{projects.map((project, index) => (
						<div
							key={index}
							className="relative w-full my-5"
							onMouseOver={() => {
								play();
								setTimeout(() => {
									setActive(project);
								}, 200);
							}}
						>
							<div
								className={`px-3 cursor-pointer ${
									active?.url === project?.url && "w-full py-2"
								}`}
							>
								<p
									className={`text-sm group ${
										active?.url === project?.url
											? "text-white"
											: "text-gray-500"
									}`}
								>
									#{index + 1}
									<span
										className={`text-md ml-2 group-hover:text-white group-hover:hidden font-sans ${
											active?.url === project?.url
												? "text-gray-200"
												: "text-gray-500"
										}`}
									>
										{project.title}
									</span>
								</p>
							</div>
							{active?.url === project?.url && (
								<div className="absolute top-4 left-0 right-0 border-t border-b w-full border-dashed border-gray-800 h-1 z-0" />
							)}
						</div>
					))}
				</div>
				<div
					ref={frameRef}
					className={`${classes.frameContainer} bg-black bg-opacity-10`}
				>
					{active && (
						<div className="relative w-full h-full">
							<iframe
								src={active?.url}
								title={active?.title}
								className={classes.iframe}
								loading="lazy"
								ref={frameRef}
								style={{
									width: "100%",
									height: "100%",
									zIndex: 100,
									opacity: 0.8,
									borderRadius: 20,
								}}
							/>
						</div>
					)}
				</div>
			</div>
			<div className={classes.mobileProjectsListContainer}>
				{show && (
					<div className="mobile-projects-list bg-blackBg bg-opacity-90 h-60 overflow-y-scroll m-10 rounded-xl border border-dashed border-gray-700">
						{projects.map((project, index) => (
							<div
								key={index}
								className="relative w-full my-5"
								onClick={() => {
									setActive(project);
									setShow(false);
								}}
							>
								<div
									className={`px-3 cursor-pointer ${
										active?.url === project?.url && "w-full py-2"
									}`}
								>
									<p
										className={`text-sm group ${
											active?.url === project?.url
												? "text-white"
												: "text-gray-500"
										}`}
									>
										#{index + 1}
										<span
											className={`text-md ml-2 group-hover:text-white group-hover:hidden font-sans ${
												active?.url === project?.url
													? "text-gray-200"
													: "text-gray-500"
											}`}
										>
											{project.title}
										</span>
									</p>
								</div>
								{active?.url === project?.url && (
									<div className="absolute top-4 left-0 right-0 border-t border-b w-full border-dashed border-gray-800 h-1 z-0" />
								)}
							</div>
						))}
					</div>
				)}
				<div
					className={`cursor-pointer rounded-full flex justify-center items-center bg-none`}
				>
					<div
						className="border border-gray-700 rounded-full p-2 hover:border-gray-400"
						ref={bar}
						onClick={() => {
							setShow(!show);
							gsap.fromTo(
								".mobile-projects-list",
								{ height: "0%", opacity: 0 },
								{ height: "100%", opacity: 1 }
							);
						}}
					>
						{show ? (
							<IoCloseCircle size={24} color={colors.gray[600]} />
						) : (
							<FaList size={24} color={colors.gray[600]} />
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

const useStyles = makeStyles((theme) => ({
	projectListContainer: {
		overflow: "scroll",
		maxWidth: "15%",
		margin: 10,
		borderRadius: 10,
		background: "",
		border: `2px dotted ${colors.gray[600]}`,
		boxShadow: "0px 0px 10px rgb(150, 150, 200, 0.4)",
		[theme.breakpoints.down("md")]: {
			display: "none",
		},
	},
	mobileProjectsListContainer: {
		position: "fixed",
		bottom: 10,
		left: 0,
		right: 0,
		overflowY: "scroll",
		[theme.breakpoints.up("md")]: {
			display: "none",
		},
	},
	frameContainer: {
		width: "80%",
		margin: "auto",
		height: "80vh",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "column",
		border: `2px dotted ${colors.gray[700]}`,
		boxShadow: "0px 0px 40px rgb(150, 150, 200, 0.2)",
		borderRadius: 20,
		[theme.breakpoints.down("sm")]: {
			width: "95%",
			margin: "auto",
		},
	},
	iframe: {
		width: "100%",
		height: "100%",
		overflow: "scroll",
	},
	desktopIframe: {
		width: "100%",
		height: "400px",
		borderRadius: 10,
		border: `1px solid ${colors.gray[300]}`,
	},
}));

export default ProjectsGallery;
