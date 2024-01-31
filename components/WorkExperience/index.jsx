import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core";
import gsap from "gsap";
import colors from "tailwindcss/colors";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Wrapper from "./Wrapper";

gsap.registerPlugin(ScrollTrigger);

const workExperience = [
	{
		name: "Mobile app developer",
		date: "ChainGPT",
		content:
			"My job is to developer web3 non-custodial wallet app for crypto users",
	},
	{
		name: "Freelancer",
		date: "iHateReading",
		content:
			"Developing and Running Full Stack website iHateReading along with Writing Blogs and Making online content",
	},
	{
		name: "Senior Frontend Developer - Koo",
		date: "August 2021 - September 2022",
		content:
			"Lead frontend team of 6 members. My job is to develop and manage Koo website along with dashboard or admin panel for non-technical team to manage koos users.",
	},
	{
		name: "Mobile App Developer - CoinSwitch",
		date: "March 20 - jan 21",
		content:
			"Developed cryptocurrency trading application for millions of users. Successfully improved app(APK) bundle size by 40%. Increased Application runtime speed by 25%. Integration of GraphQL to enhance performance by 50%. Implementation of Graphs, Flatlists, Animations Firebase and Amplitude software tools.",
	},
	{
		name: "Frontend Developer - Cogoport",
		date: "April 19- Feb 20",
		content: `Developed React UI library of 72 components (https:// nautical.cogoport.com). Developed the packages like React reusable hooks,React realtime editable Spreadsheet, CMS(Content management system) & UI Library. Worked on Babel, Webpack, Next JS, Redux, Gatsby`,
	},
];

const WorkExperience = () => {
	useEffect(() => {
		const sections = gsap.utils.toArray(".list-container .section");
		gsap.to(sections, {
			x: "-100vh",
			ease: "none",
			yoyo: true,
			scrollTrigger: {
				trigger: ".work-experience-container",
				start: "top top",
				end: () => `${(sections.length - 1) * 100}vh`,
				scrub: 1,
				pin: true,
				markers: true,
			},
		});
		sections.forEach((section, index) => {
			gsap.from(section, {
				xPercent: index * 10 + 100,
				yPercent: 50,
				scale: 0,
			});
		});
	}, []);

	const styles = useStyles();

	return (
		<div className="work-experience-container mx-auto overflow-x-hidden relative w-full bg-black bg-opacity-95">
			<div className="list-container">
				<div
					className={`${styles.listContainer} mx-auto flex justify-around items-center py-4`}
				>
					{workExperience.map((item, index) => {
						return (
							<section key={item.date} className={`${styles.section} section `}>
								<div
									className={`${styles.card} border-t-2 border-dotted border-gray-700 rounded-xl card-${index}`}
								>
									<div className={styles.cardFront}>
										<p className="text-2xl">{item.name}</p>
									</div>
									<div className={styles.cardBack}>{item.content}</div>
								</div>
							</section>
						);
					})}
				</div>
			</div>
		</div>
	);
};
export default WorkExperience;

const useStyles = makeStyles((theme) => ({
	listContainer: {
		width: "400vh",
		height: "100vh",
	},
	section: {
		width: "100vh",
	},
	card: {
		width: "400px",
		position: "relative",
		cursor: "pointer",
		transformStyle: "preserve-3d",
		color: colors.gray[400],
		transition: "all 0.2s ease",
		"&:hover": {
			"& .cardBlock": {
				transform: "rotateZ(-4deg) translateY(3px)",
			},
		},
	},
	cardFront: {
		borderRadius: 16,
		padding: 10,
		border: `1px dotted ${colors.gray[600]}`,
		zIndex: 50,
		width: "98%",
		transformOrigin: "top left",
		backfaceVisibility: "hidden",
		background: `linear-gradient(50deg, ${colors.gray[900]}, ${colors.gray[800]})`,
		transition: "all 1s ease",
		transform: "rotateZ(0deg) translateY(-4px)",
		"&:hover": {
			transform: "rotateZ(-10deg) rotateY(-10deg)",
			transformOrigin: "top left",
		},
	},
	cardBack: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		padding: 20,
		lineBreak: "auto",
		width: "100%",
		height: "100%",
		zIndex: -10,
		border: `1px dotted ${colors.gray[600]}`,
		borderRadius: 16,
		backfaceVisibility: "hidden",
		background: `linear-gradient(90deg, ${colors.blackBg}, ${colors.black})`,
		transformOrigin: "top left",
		transition: "all 0.2s ease",
		pointerEvents: "auto",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "column",
		transform: "rotateZ(0deg) translateY(-3px)",
	},
}));
