import { useEffect } from "react";
import gsap from "gsap";
import colors from "tailwindcss/colors";

const BackgroundDots = (props) => {
	const colorKeys = Object.keys(colors);

	useEffect(() => {
		dots.map((item) => {
			gsap.fromTo(
				`.dot-${item}`,
				{
					// x: () => "-" + Math.random() * window.innerWidth,
					y: "0%",
					scale: 0.4,
					ease: "power2.out",
					backgroundColor:
						colors[colorKeys[Math.floor(Math.random() * 25)]][400],
				},
				{
					// x: 0,
					y: "100%",
					stagger: 0.5,
					repeat: -1,
					scale: 1,
					ease: "power1.out",
					backgroundColor:
						colors[colorKeys[Math.floor(Math.random() * 25)]][400],
				}
			);
		});
		gsap.fromTo(
			".bgLoader",
			{ width: "1vw", left: 0 },
			{ width: "100vw", duration: 3, left: 0 }
		);
	}, []);

	let dots = [];
	const getRandomArray = (length) => {
		for (let i = 0; i < length; i++) {
			dots.push(i);
		}
		return dots;
	};
	getRandomArray(10);

	const dotsParent = [
		1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
	];

	return (
		<div className="bg-black bg-opacity-95 h-screen w-full flex flex-col justify-center items-center">
			<div className="bgLoader flex justify-evenly items-center w-full h-full fixed top-0 left-0 right-0 bottom-0">
				{dotsParent.map((item) => (
					<div
						className="w-full h-full overflow-hidden flex flex-col justify-evenly items-center"
						key={item}
					>
						{dots.map((dot) => {
							return (
								<div
									key={dot}
									className={`dot-${dot} w-2 h-2 bg-gray-700 rounded-full`}
								/>
							);
						})}
					</div>
				))}
			</div>
			<div className="bgLoader absolute w-1 h-screen left-0 top-0 right-0 bottom-0 bg-gray-900 bg-opacity-20 border-r border-l border-gray-800" />
		</div>
	);
};
export default BackgroundDots;