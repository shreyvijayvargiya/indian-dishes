import { useEffect, useLayoutEffect, useState } from "react";
import { Button } from "@mantine/core";
import gsap from "gsap";
import colors from "tailwindcss/colors";
import BackgroundDots from "components/Projects/BackgroundDots";

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

	const [active, setActive] = useState(0);

	useEffect(() => {
		const tl = gsap.timeline();
		images.map((item, index) => {
			tl.fromTo(
				`.icon-container-${item}`,
				{ y: "-" + index + "10px", scale: 0.2 },
				{ y: "0px", scale: 1 },
				{ delay: 0.2 * index, duration: 3, ease: "power2.out" }
			);
		});
	}, []);
	useEffect(() => {
		gsap.fromTo(
			".wave",
			{
				x: "0%",
			},
			{
				x: "-5%",
				duration: 10,
				repeat: -1,
				ease: "linear",
				yoyo: true,
			}
		);
		gsap.fromTo(
			".wave-shadow",
			{
				x: "0%",
			},
			{
				x: "-4%",
				duration: 10,
				repeat: -1,
				ease: "linear",
				yoyo: true,
			}
		);
	}, [active]);

	const animateIcons = () => {
		images.map((item, index) => {
			const tl = gsap.timeline();
			tl.fromTo(
				`.icon-container-${item}`,
				{ y: "-" + index + "10px", scale: 0.2, opacity: 0.1 },
				{ y: "0px", scale: 1, opacity: 1, stagger: 1 },
				{ delay: 1 * index, duration: 4, ease: "power2.out", stagger: 1 }
			);
		});
	};

	const animateIconsLeft = () => {
		images.map((item, index) => {
			const tl = gsap.timeline();
			tl.fromTo(
				`.icon-container-${item}`,
				{ x: "-" + index + "10px", scale: 0.2, opacity: 0.1 },
				{ x: "0px", scale: 1, opacity: 1, stagger: 1 },
				{ delay: index, duration: 4, ease: "power2.out", stagger: 1 }
			);
		});
	};

	return (
		<div className="bg-black bg-opacity-95 h-screen flex flex-col justify-center items-center relative">
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
							onClick={() => setActive(index)}
							className={`p-2 cursor-pointer py-4`}
							onMouseEnter={() => {
								setActive(index);
								gsap.fromTo(
									`.icon-container-${item}`,
									{
										scale: 0.8,
										y: "0px",
										rotateX: "0deg",
									},
									{
										scale: 1.1,
										y: "-20px",
										rotateX: "0deg",
									}
								);
							}}
							onMouseLeave={() => {
								setActive(false);
								gsap.fromTo(
									`.icon-container-${item}`,
									{ scale: 1.1, y: "-30px", rotateX: "360deg" },
									{ scale: 1, y: "0px", rotateX: "0deg" }
								);
							}}
						>
							<img
								className={`border border-gray-500 hover:border-gray-500 w-20 h-20 object-contain bg-blend-darken rounded-2xl icon-container-${item}
								image-item-${index}`}
								src={`./logos/${item}.svg`}
							/>
							{active === index && (
								<div className="mx-auto text-xs text-center text-gray-500">
									{item}
								</div>
							)}
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
