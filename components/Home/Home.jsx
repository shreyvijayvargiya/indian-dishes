import { makeStyles } from "@material-ui/core";
import React, { useEffect, useRef } from "react";
import colors from "tailwindcss/colors";
import StickyNavbar from "./Navbar";
import { Typewriter } from "react-simple-typewriter";
import WorkExperience from "components/WorkExperience";
import ProjectsGallery from "components/Projects/ProjectsGallery";
import ContactMe from "components/ContactMe";
import TechStack from "components/TechStack";
import AnimatedText from "components/Projects/AnimatedText";
import { Parallax, ParallaxBanner, useParallax } from "react-scroll-parallax";
import gsap from "gsap";
import Introduction from "./Introduction";
import BrushCanvas from "./BrushEffect";

const HomeComponent = () => {
	const styles = useStyles();
	const containerRef = useRef();

	return (
		<div
			className={`w-full relative h-full overflow-y-scroll overflow-x-hidden bg-black bg-opacity-60 ${styles.container}`}
			style={{ scrollBehavior: "smooth" }}
			ref={containerRef}
		>
			<AnimatedText />
			<Parallax speed={-20}>
				<Introduction />
			</Parallax>
			<Parallax>
				<WorkExperience />
			</Parallax>
			<Parallax>
				<ProjectsGallery />
			</Parallax>
			<Parallax>
				<TechStack />
			</Parallax>
		</div>
	);
};
export default HomeComponent;

const useStyles = makeStyles((theme) => ({
	container: {
		backgroundImage: "url(./bg-Banner.svg)",
		backgroundAttachment: "fixed",
		backgroundBlendMode: "color-burn",
		position: "fixed",
		backgroundRepeat: "repeat-x",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
	},
}));
