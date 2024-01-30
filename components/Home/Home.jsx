import { makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import colors from "tailwindcss/colors";
import StickyNavbar from "./Navbar";
import { Typewriter } from "react-simple-typewriter";
import ScrollingIntro from "./ScrollingIntro";
import gsap from "gsap";
import WorkExperience from "components/WorkExperience";
import ProjectsGallery from "components/Projects/ProjectsGallery";
import ContactMe from "components/ContactMe";
import TechStack from "components/TechStack";
import AnimatedText from "components/Projects/AnimatedText";

const HomeComponent = () => {
	const styles = useStyles();

	return (
		<div
			className="h-full w-full relative home-container"
			style={{ scrollBehavior: "smooth", scrollPadding: "10px" }}
		>
			<StickyNavbar />
			<div
				className="bg-image"
				style={{
					backgroundImage: `url(./home-bg.svg)`,
					backgroundBlendMode: "color-burn",
					backgroundPosition: "center",
					backgroundRepeat: "repeat-x",
					width: "100%",
					height: "100vh",
					position: "fixed",
					zIndex: -10,
					inset: 0,
				}}
			/>
			<ScrollingIntro />
			<div style={{ zIndex: 1000 }} className="relative">
				<WorkExperience />
			</div>
			<div style={{ zIndex: 1000 }} className="relative">
				<ProjectsGallery />
			</div>
			<TechStack />
			<ContactMe />
		</div>
	);
};
export default HomeComponent;

const useStyles = makeStyles((theme) => ({
	nameText: {
		fontFamily: "phosphate",
		fontSize: "12rem",
		color: colors.gray[200],
		[theme.breakpoints.between("xs", "sm")]: {
			fontSize: "4rem",
		},
	},
	navbar: {
		[theme.breakpoints.between("sm", "xl")]: {
			width: "30%",
		},
		[theme.breakpoints.between("xs", "sm")]: {
			width: "90%",
			margin: "auto",
		},
	},
}));
