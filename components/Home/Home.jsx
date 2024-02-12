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

const HomeComponent = () => {
	const styles = useStyles();
	const containerRef = useRef();

	const [loading, setLoading] = useState(false);
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
			{ opacity: 1, scale: 1, delay: 1 }
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
				{ xPercent: -20, opacity: 0 },
				{ xPercent: 0, opacity: 1 }
			)
			.fromTo(projectsCompRef.current, { scale: 0.9 }, { scale: 1 })
			.fromTo(techStackCompRef.current, { yPercent: 40 }, { yPercent: 0 });
	};

	return (
		<div
			className={`w-full relative overflow-x-hidden bg-black bg-opacity-95 h-auto ${styles.container}`}
			style={{ scrollBehavior: "smooth" }}
			ref={containerRef}
		>
			{loading ? (
				<TripLoader setLoading={setLoading} />
			) : (
				<div className="w-full h-full">
					<GridLines
						lineColor={colors.gray[400]}
						className="h-full fixed top-0 left-0 bottom-0 right-0 w-full opacity-5 z-100"
					/>
					<div
						className="absolute bottom-10 right-10"
						onClick={() => setLoading(true)}
					>
						<PlayIcon />
					</div>
					<br />
					<br />
					<div ref={animatedCompRef} className="w-full">
						<AnimatedText />
					</div>
					<div ref={descCompRef} className="w-full">
						<Parallax speed={10}>
							<Description />
						</Parallax>
					</div>
					<div ref={workExperienceCompRef}>
						<Parallax speed={20}>
							<WorkExperience />
						</Parallax>
					</div>
					<div className="w-full h-full relative" ref={projectsCompRef}>
						<Parallax speed={-20}>
							<ProjectsGallery />
						</Parallax>
					</div>
					<div className="w-full h-full relative" ref={techStackCompRef}>
						<Parallax speed={20}>
							<TechStack />
						</Parallax>
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
