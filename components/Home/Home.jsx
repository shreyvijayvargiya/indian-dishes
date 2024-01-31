import { makeStyles } from "@material-ui/core";
import React, { useEffect, useRef } from "react";
import colors from "tailwindcss/colors";
import StickyNavbar from "./Navbar";
import { Typewriter } from "react-simple-typewriter";
import ScrollingIntro from "./ScrollingIntro";
import WorkExperience from "components/WorkExperience";
import ProjectsGallery from "components/Projects/ProjectsGallery";
import ContactMe from "components/ContactMe";
import TechStack from "components/TechStack";
import AnimatedText from "components/Projects/AnimatedText";
import { useParallax } from "react-scroll-parallax";
import gsap from "gsap";

const pages = [];
const HomeComponent = () => {
	const styles = useStyles();
	const containerRef = useRef();

	// const [pageStates, setPageStates] = useState()

	return (
		<div
			className="w-full relative home-container h-screen"
			style={{ scrollBehavior: "smooth" }}
			ref={containerRef}
		>
			
			<ScrollingIntro />
			{/* <div style={{ zIndex: 10 }} className="relative">
				<WorkExperience />
			</div>
			<div style={{ zIndex: 10 }} className="relative">
				<ProjectsGallery />
			</div>
			<TechStack />
			<ContactMe /> */}
		</div>
	);
};
export default HomeComponent;

const useStyles = makeStyles((theme) => ({}));
