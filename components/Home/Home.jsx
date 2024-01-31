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

const HomeComponent = () => {
	const styles = useStyles();
	const containerRef = useRef();

	// const bgImage = useParallax({ tabIndex: containerRef.current, speed: 10 });

	const { ref } = useParallax({
		targetElement: containerRef.current,
		speed: 0,
	});



	return (
		<div
			className="h-full w-full relative home-container"
			style={{ scrollBehavior: "smooth" }}
			ref={containerRef}
		>
			<StickyNavbar />
			<div
				className="flex flex-col justify-center w-full items-center animated-text"
				ref={ref}
			>
				<AnimatedText />
			</div>
			{/* <ScrollingIntro />
			<div style={{ zIndex: 10 }} className="relative">
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
