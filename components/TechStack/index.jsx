import { Button } from "@mantine/core";
import gsap from "gsap";
import { useEffect } from "react";

const TechStack = () => {
	const images = [
		"javascript",
		"nodejs",
		"reactjs",
		"react-native",
		"html",
		"css",
		"firebase",
	];

	useEffect(() => {
		images.map((item, index) => {
			const tl = gsap.timeline();
			tl.fromTo(
				`.icon-container-${item}`,
				{ y: "-" + index + "10px", scale: 0.2 },
				{ y: "0px", scale: 1 },
				{ delay: 0.2 * index, duration: 3, ease: "power2.out" }
			);
		});
	}, []);

	const animateIcons = () => {
		images.map((item, index) => {
			const tl = gsap.timeline();
			tl.fromTo(
				`.icon-container-${item}`,
				{ y: "-" + index + "10px", scale: 0.2 },
				{ y: "0px", scale: 1 },
				{ delay: 0.2 * index, duration: 4, ease: "power2.out" }
			);
		});
	};

	const animateIconsLeft = () => {
		images.map((item, index) => {
			const tl = gsap.timeline();
			tl.fromTo(
				`.icon-container-${item}`,
				{ x: "-" + index + "10px", scale: 0.2 },
				{ x: "0px", scale: 1 },
				{ delay: 0.2 * index, duration: 4, ease: "power2.out" }
			);
		});
	};
	return (
		<div className="bg-black bg-opacity-95 h-screen w-full flex flex-col justify-center items-center">
			<p className="text-gray-400 text-3xl">Tech Stack</p>
			<br />
			<div
				className="flex justify-evenly items-center p-4 bg-gray-800 bg-opacity-20 border border-gray-700 rounded-2xl"
				style={{ boxShadow: "0px 0px 50px rgb(255, 255, 255, 0.2)" }}
			>
				{images.map((item, index) => {
					return (
						<div
							key={item}
							className="p-2 cursor-pointer"
							onMouseEnter={() => {
								gsap.fromTo(
									`.icon-container-${item}`,
									{ scale: 0.8, y: "0px", rotateX: "0deg" },
									{ scale: 1.2, y: "-30px", rotateX: "360deg" }
								);
							}}
							onMouseLeave={() => {
								gsap.fromTo(
									`.icon-container-${item}`,
									{ scale: 1.2, y: "-40px", rotateX: "360deg" },
									{ scale: 1, y: "0px", rotateX: "0deg" }
								);
							}}
						>
							<img
								className={`border border-gray-500 hover:border-gray-500 w-20 h-20 object-contain bg-blend-darken rounded-2xl icon-container-${item}`}
								src={`./logos/${item}.svg`}
							/>
						</div>
					);
				})}
			</div>
			<br />
			<br />
			<div className="flex justify-evenly items-center gap-4">
				<Button onClick={animateIcons} color="dark" variant="filled">
					Top Animation
				</Button>
				<br />
				<Button onClick={animateIconsLeft} color="dark" variant="filled">
					Left Animation
				</Button>
			</div>
		</div>
	);
};
export default TechStack;
