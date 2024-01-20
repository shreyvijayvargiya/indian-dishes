import { useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import gsap from "gsap";
import colors from "tailwindcss/colors";

const projects = [
	{
		url: "https://tailwind-css-theme-toggle-demo.vercel.app/",
		device: "desktop",
	},
	{ url: "https://ihatereading.in", device: "mobile" },
	{ url: "https://indian-dishes.vercel.app/", device: "desktop" },
	{ url: "https://indian-dishes.vercel.app/glowy-navbar", device: "mobile" },
	{
		url: "https://indian-dishes.vercel.app/blog-drawer",
		desktop: "desktop",
	},
	{
		url: "https://indian-dishes.vercel.app/crazy-modal",
		device: "desktop",
	},
	{
		url: "https://indian-dishes.vercel.app/shuffle-text",
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
					<div key={index} className={`project ${classes.frame}`}>
						{project.device === "desktop" ? (
							<iframe
								src={project.url}
								title={`Project ${index + 1}`}
								className={classes.iframe}
								loading="lazy"
								style={{ width: "700px", height: "500px" }}
							/>
						) : (
							<iframe
								src={project.url}
								title={`Project ${index + 1}`}
								className={classes.iframe}
								loading="lazy"
								style={{ width: "340px", height: "700px" }}
							/>
						)}
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
		flexWrap: "wrap",
		gap: theme.spacing(2),
		padding: theme.spacing(4),
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
