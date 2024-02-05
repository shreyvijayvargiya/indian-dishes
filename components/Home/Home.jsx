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
import GridLines from "react-gridlines";
import Om from "components/Projects/TextEffects/Om";
import TripLoader from "components/Projects/TripLoader";
import RocketLaunch from "components/Projects/TextEffects/RocketLaunch";
import Description from "./Description";

const HomeComponent = () => {
	const styles = useStyles();
	const containerRef = useRef();

	return (
		<div
			className={`w-full relative overflow-x-hidden bg-black bg-opacity-95 h-screen ${styles.container}`}
			style={{ scrollBehavior: "smooth" }}
			ref={containerRef}
		>
			{/* <TripLoader /> */}
			<div className="fixed top-20 left-10">
				<RocketLaunch />
			</div>
			<div className="fixed bottom-10 right-10">
				<Om />
			</div>
			<br />
			<br />
			<AnimatedText />
			<br />
			<br />
			<Description />
		</div>
	);
};
export default HomeComponent;

const useStyles = makeStyles((theme) => ({
	container: {},
}));
