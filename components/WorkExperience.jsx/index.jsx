import gsap from "gsap";
import React, { useLayoutEffect } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WorkExperience = () => {
	useLayoutEffect(() => {
		gsap.fromTo(
			".text",
			{
				fontSize: "1rem",
			},
			{
				fontSize: "10rem",
				scrollTrigger: {
					trigger: ".root",
					start: "top center",
          end: "end end",
					markers: true,
					toggleActions: "restart pause reverse pause",
				},
			}
		);
	}, []);

	const handleScrollAnimation = () => {
    
  };

	return (
		<div className="root bg-black h-full w-full bg-opacity-95 p-10 text-gray-400 flex flex-col justify-center items-center">
			<div className="w-full h-screen" />
			<p className="text">Work Experience</p>
			<br />
			<br />
			<br />
		</div>
	);
};
export default WorkExperience;
