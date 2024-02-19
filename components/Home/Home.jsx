import React, { useEffect, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core";
import AnimatedText from "components/Projects/AnimatedText";
import TripLoader from "components/Projects/TripLoader";
import Description from "./Description";
import colors from "tailwindcss/colors";
import PlayIcon from "modules/Icons/PlayIcon";
import GridLines from "react-gridlines";
import gsap from "gsap";
import WorkExperience from "components/WorkExperience";
import ProjectsGallery from "components/Projects/ProjectsGallery";
import TechStack from "components/TechStack";
import { Parallax } from "react-scroll-parallax";
import TextName from "./TextName";

const HomeComponent = () => {
	const styles = useStyles();
	const containerRef = useRef();

	const [loading, setLoading] = useState(true);
	const animatedCompRef = useRef();
	const descCompRef = useRef();
	const workExperienceCompRef = useRef();
	const projectsCompRef = useRef();
	const techStackCompRef = useRef();

	useEffect(() => {
		startAnimation();
	}, []);

	const startAnimation = () => {
		const tl = gsap.timeline();

		tl.fromTo(
			animatedCompRef.current,
			{ opacity: 0, scale: 0 },
			{ opacity: 1, scale: 1 }
		)
			.fromTo(
				animatedCompRef.current,
				{ y: "50%" },
				{ y: "0%", duration: 1, ease: "power4.out" }
			)
			.fromTo(
				descCompRef.current,
				{ y: "20%", opacity: 0 },
				{ y: "0%", opacity: 1, ease: "power4.out" }
			)
			.fromTo(
				workExperienceCompRef.current,
				{ xPercent: -100, opacity: 0 },
				{ xPercent: 0, opacity: 1 }
			)
			.fromTo(projectsCompRef.current, { scale: 0.9 }, { scale: 1 })
			.fromTo(techStackCompRef.current, { yPercent: 40 }, { yPercent: 0 });
	};

	return (
		<div
			className={`w-full relative overflow-x-hidden bg-black bg-opacity-95 h-screen ${styles.container}`}
			style={{ scrollBehavior: "smooth" }}
			ref={containerRef}
		>
			{loading ? (
				<TripLoader setLoading={setLoading} />
			) : (
				<div className="relative w-full h-screen">
					<GridLines
						lineColor={colors.gray[700]}
						className="h-screen fixed w-full transform rotate-5 opacity-5 z-100"
					/>
					<div
						className="fixed md:bottom-40 sm:top-5 xs:top-5 xxs:top-5 left-4  z-100"
						onClick={() => setLoading(true)}
						style={{ zIndex: 1000 }}
					>
						<PlayIcon />
					</div>
					<br />
					<br />
					<br />
					<div className="w-full " ref={animatedCompRef}>
						<TextName />
					</div>
					<div ref={descCompRef} className="w-full">
						<Description />
					</div>
				</div>
			)}
		</div>
	);
};
export default HomeComponent;

const useStyles = makeStyles((theme) => ({
	container: {},
}));
