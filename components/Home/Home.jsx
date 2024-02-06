import { makeStyles } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import AnimatedText from "components/Projects/AnimatedText";
import gsap from "gsap";
import Om from "components/Projects/TextEffects/Om";
import TripLoader from "components/Projects/TripLoader";
import RocketLaunch from "components/Projects/TextEffects/RocketLaunch";
import Description from "./Description";
import colors from "tailwindcss/colors";
import PlayIcon from "modules/Icons/PlayIcon";
import GridLines from "react-gridlines";
import GithubCalenderContribution from "components/Projects/GithubCalender";

const HomeComponent = () => {
	const styles = useStyles();
	const containerRef = useRef();

	const [loading, setLoading] = useState(false);
	const animatedCompRef = useRef();
	const descCompRef = useRef();

	useEffect(() => {
		startAnimation();
	}, []);

	const startAnimation = () => {
		const tl = gsap.timeline();

		tl.fromTo(
			animatedCompRef.current,
			{ y: "100%", opacity: 0 },
			{ y: "0%", opacity: 1, duration: 1.5, ease: "power4.out" }
		);

		tl.fromTo(
			descCompRef.current,
			{ y: "50%", opacity: 0 },
			{ y: "0%", opacity: 1, ease: "power4.out" }
		);
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
				<div className="w-full">
					<div className="fixed top-10 left-10">
						<RocketLaunch />
					</div>
					<div className="fixed bottom-10 left-10">
						<GithubCalenderContribution />
					</div>
					<div
						className="fixed bottom-10 right-10"
						onClick={() => setLoading(true)}
					>
						<PlayIcon />
					</div>
					<div ref={animatedCompRef} className="w-full">
						<AnimatedText />
						<div ref={descCompRef} className="w-full">
							<Description />
						</div>
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
