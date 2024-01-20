import { useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import gsap from "gsap";
import colors from "tailwindcss/colors";

const projects = [
	{
		url: "https://tailwind-css-theme-toggle-demo.vercel.app/",
		device: "desktop",
	},
	{ url: "https://ihatereading.in", device: "desktop" },
	{ url: "https://indian-dishes.vercel.app/glowy-navbar", device: "desktop" },
	{ url: "https://indian-dishes.vercel.app/shuffle-text", device: "desktop" },
	{
		url: "https://web-code-editor-sage.vercel.app/",
		device: "desktop",
	},
	{
		url: "https://indian-dishes.vercel.app/crazy-modal",
		device: "desktop",
	},
	{
		url: "https://indian-dishes.vercel.app/link-preview",
		device: "desktop",
	},
	{
		url: "https://indian-dishes.vercel.app/blog-drawer",
		device: "desktop",
	},
	{
		url: "https://musiversal-task.vercel.app/",
		device: "desktop",
	},
	{
		url: "https://eth-txns.vercel.app/",
		device: "desktop",
	},
	{
		url: "https://portfolio-social-cards-starter.vercel.app/",
		device: "desktop",
	},
	{
		url: "https://newsletter-calender-starter-kit.vercel.app/",
		device: "desktop",
	},
	{
		url: "https://uireactlibrary.vercel.app/?path=/story/layout--navbar",
		device: "desktop",
	},
];

const ProjectsGallery = () => {
	const classes = useStyles();

	useEffect(() => {
		gsap.from(".project", { opacity: 0, duration: 1, stagger: 0.2 });
	}, []);

	return (
		<div className="h-full bg-opacity-95 bg-black w-full">
			<div className={classes.projectContainer}>
				{projects.map((project, index) => (
					<div
						key={index}
						className="flex justify-between items-center w-full m-10 p-10"
					>
						<div>
							<p className="text-5xl text-pink-400">Project #{index + 1}</p>
							<a
								className="text-indigo-500 hover:text-indigo-600 text-xl underline"
								href={project.url}
								target="_blank"
							>
								Reach website
							</a>
						</div>
						<div className={`project ${classes.frame}`}>
							<iframe
								src={project.url}
								title={`Project ${index + 1}`}
								className={classes.iframe}
								loading="lazy"
								style={{ width: "60vw", height: "800px", aspectRatio: "auto" }}
							/>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

const useStyles = makeStyles((theme) => ({
	projectContainer: {
		display: "flex",
		justifyContent: "flex-start",
		alignItems: "flex-start",
		flexDirection: "column",
		flexWrap: "wrap",
		gap: theme.spacing(2),
		padding: theme.spacing(10),
	},
	iframe: {
		width: "100%",
		height: "100%",
		borderRadius: 10,
		border: `1px solid ${colors.gray[500]}`,
	},
	desktopIframe: {
		width: "100%",
		height: "400px",
		borderRadius: 10,
		border: `1px solid ${colors.gray[300]}`,
	},
}));

export default ProjectsGallery;
