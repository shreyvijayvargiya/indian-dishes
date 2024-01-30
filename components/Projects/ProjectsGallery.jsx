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
];

const ProjectsGallery = () => {
	const classes = useStyles();
	const frameRef = useRef(null);
	const [active, setActive] = useState();

	return (
		<div className="h-screen bg-opacity-95 bg-black w-full py-10">
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
								gsap.fromTo(
									frameRef.current,
									{ opacity: 0 },
									{ opacity: 1, duration: 1 }
								);
							}}
						>
							{active?.url === project?.url && (
								<div className="absolute top-4 left-0 right-0 border-t border-b w-full border-dashed border-gray-400 h-1 z-0" />
							)}
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
										className={`text-sm ml-2 font-mono group-hover:text-white group-hover:hidden ${
											active?.url === project?.url
												? "text-gray-200"
												: "text-gray-500"
										}`}
									>
										{project.title}
									</span>
								</p>
							</div>
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
	},
	frameContainer: {
		width: "85%",
		margin: "auto",
		height: "90vh",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "column",
		borderTop: `1px dotted ${colors.gray[400]}`,
		borderBottom: `1px dotted ${colors.gray[400]}`,
		borderLeft: `1px dotted ${colors.gray[400]}`,
		[theme.breakpoints.down("sm")]: {
			width: "100%",
		},
	},
	iframe: {
		width: "100%",
		height: "100%",
		overflow: "scroll"
	},
	desktopIframe: {
		width: "100%",
		height: "400px",
		borderRadius: 10,
		border: `1px solid ${colors.gray[300]}`,
	},
}));

export default ProjectsGallery;
