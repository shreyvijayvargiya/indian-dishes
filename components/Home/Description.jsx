import gsap from "gsap";
import React, { useEffect, useState } from "react";
import useSound from "use-sound";

const Description = () => {
	const desc = [
		{
			id: 1,
			content: (
				<div className="text-gray-400 hover:text-gray-100">
					<p>
						Hello, I am a{" "}
						<span className="text-blue-600 cursor-pointer hover:text-blue-400">
							software developer
						</span>
					</p>
				</div>
			),
			leftImage: "./desc-images/icon-1.svg",
		},
		{
			id: 2,
			content: (
				<div>
					<p className="text-gray-400 hover:text-gray-100">
						with <span className="text-orange-400">4</span> years of{" "}
						<span className="relative text-indigo-500 cursor-pointer hover:text-indigo-400">
							experience{" "}
							<img
								className="absolute left-0 right-0 bottom-0 top-10 underline-1"
								src="./desc-images/underline-1.svg"
							/>
						</span>{" "}
						in developing
					</p>
				</div>
			),
			leftImage: "./desc-images/icon-2.svg",
		},
		{
			id: 3,
			content: (
				<div className="text-gray-400 hover:text-gray-100">
					<p>
						website and mobile apps
						{"( here is my"}
						<span className="relative text-green-500 cursor-pointer hover:text-green-400">
							{" "}
							tech stack
							<img
								className="absolute left-0 right-0 bottom-0 top-10 underline-2"
								src="./desc-images/underline-2.svg"
							/>
						</span>
						{")"}
					</p>
				</div>
			),
			leftImage: "./desc-images/icon-3.svg",
		},
		{
			id: 4,
			content: (
				<div className="text-gray-400 hover:text-gray-100">
					<p>
						do check my{" "}
						<span className="relative text-pink-500 hover:text-pink-400">
							projects
							<img
								className="absolute left-0 right-0 bottom-0 top-10 underline-3"
								src="./desc-images/underline-3.svg"
							/>
						</span>
					</p>
				</div>
			),
			leftImage: "./desc-images/icon-4.svg",
		},
		{
			id: 5,
			content: (
				<div className="text-gray-400 hover:text-gray-100">
					& feel free to{" "}
					<span className="relative text-orange-500 hover:text-orange-400 cursor-pointer">
						say Hi
						<img
							className="absolute left-0 right-0 bottom-0 top-10 underline-4"
							src="./desc-images/underline-4.svg"
						/>
					</span>
				</div>
			),
			leftImage: "./desc-images/icon-5.svg",
		},
	];

	const [active, setActive] = useState();
	const [play] = useSound("./sound-clips/sound-keyboard.mp3", { volume: 0.6 });
	const tl = gsap.timeline();

	useEffect(() => {
		const sections = gsap.utils.toArray(".section-container .section-item");
		sections.forEach((section) => {
			tl.fromTo(
				section,
				{ yPercent: 100, opacity: 0, width: 0, visibility: "hidden" },
				{
					stagger: 0.8,
					yPercent: 0,
					opacity: 1,
					width: "100%",
					visibility: "visible",
					delay: 0.5,
				}
			);
		});
	}, []);

	useEffect(() => {
		const tl = gsap.timeline();
		tl.fromTo(
			".active-image",
			{ opacity: 0, scale: 0, rotate: "0deg", xPercent: -200 },
			{ opacity: 1, scale: 1, rotate: "360deg", xPercent: 0 }
		).fromTo(
			".inactive-image",
			{ opacity: 1, scale: 1, rotate: "-360deg", xPercent: 0 },
			{ scale: 0, rotate: "0deg", xPercent: -200 }
		);
	}, [active]);

	const handleMouseOver = (item) => {
		setActive(item);
		play();
	};

	const handleMouseOut = () => {
		setActive(null);
	};

	return (
		<div className="w-full h-full px-20">
			<div className="fixed top-1/3 bottom-1/2 left-20">
				{active && (
					<div className={`${active ? "active-image" : "inactive-image"}`}>
						<img src={active.leftImage} className="w-40 h-40" />
					</div>
				)}
			</div>
			<div className="md:w-1/2 mx-auto sm:w-full xxs:w-full px-20 section-container">
				{desc.map((item) => {
					return (
						<section
							key={item.id}
							className={`${
								active?.id === item.id ? "section-active" : "section-inactive"
							} flex justify-start items-center gap-2 w-full my-10 section-item`}
							onMouseEnter={() => handleMouseOver(item)}
							onMouseLeave={handleMouseOut}
						>
							<div
								className={`w-10 h-10 text-gray-400 text-2xl ${
									active?.id === item.id
										? `left-active-icon`
										: `left-inactive-icon`
								}`}
							>
								<img className="w-10 h-10" src={item.leftImage} />
							</div>
							<div className="text-3xl">{item.content}</div>
						</section>
					);
				})}
			</div>
		</div>
	);
};
export default Description;
