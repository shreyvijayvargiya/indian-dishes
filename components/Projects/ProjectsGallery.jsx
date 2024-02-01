import { useEffect, useRef, useState } from "react";
import { StylesProvider, makeStyles } from "@material-ui/core";
import gsap from "gsap";
import colors from "tailwindcss/colors";
import GridLines from "react-gridlines";

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
	const [active, setActive] = useState();

	return (
		<div className="h-screen bg-opacity-95 bg-black w-full py-14">
			<GridLines
				lineColor={colors.gray[400]}
				className="h-full w-full absolute top-0 right-0 left-0 bottom-0 transform opacity-5"
			/>
			<div className="flex flex-row justify-around items-center w-full h-full">
				<div className={`${classes.projectListContainer}`}>
					{projects.map((project, index) => (
						<div
							key={index}
							className="relative w-full my-5"
							onMouseOver={() => {
								setTimeout(() => {
									setActive(project);
								}, 500);
							}}
						>
							<div
								className={`px-10 cursor-pointer ${
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
									borderRadius: 20,
								}}
							/>
						</div>
					)}
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
		border: `2px dotted ${colors.cyan[700]}`,
		boxShadow: "0px 0px 10px rgb(150, 150, 200, 0.4)",
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
			width: "100%",
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
