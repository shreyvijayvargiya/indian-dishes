import gsap from "gsap";
import router from "next/router";
import React, { useEffect, useState } from "react";
import useSound from "use-sound";

const Description = () => {
	const desc = [
		{
			id: 1,
			content: () => (
				<div className="text-gray-400 hover:text-gray-100">
					<p>
						Hello, I am a{" "}
						<span className="text-blue-600 cursor-pointer hover:text-blue-400">
							software developer
						</span>
					</p>
				</div>
			),
			leftImage: "./avatar.png",
		},
		{
			id: 2,
			content: () => (
				<div>
					<p className="text-gray-400 hover:text-gray-100">
						with <span className="text-orange-400">4</span> years of{" "}
						<span
							className="relative text-indigo-500 cursor-pointer hover:text-indigo-400"
							onClick={() => router.push("/work-experience")}
							onMouseOver={() => {
								gsap.fromTo(
									".underline-1",
									{ width: "0%", height: "0%" },
									{
										width: "100%",
										height: "100%",
									}
								);
							}}
						>
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
			previewLink: "/work-experience",
		},
		{
			id: 3,
			content: () => (
				<div className="text-gray-400 hover:text-gray-100">
					<p>
						website and mobile apps
						{"( here is my"}
						<span
							className="relative text-green-500 cursor-pointer hover:text-green-400"
							onClick={() => router.push("/tech-stack")}
							onMouseOver={() => {
								gsap.fromTo(
									".underline-2",
									{ width: "0%", height: "0%" },
									{
										width: "100%",
										height: "100%",
									}
								);
							}}
						>
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
			previewLink: "/tech-stack",
		},
		{
			id: 4,
			content: () => (
				<div className="text-gray-400 hover:text-gray-100">
					<p>
						do check my{" "}
						<span
							className="relative text-pink-500 hover:text-pink-400"
							onClick={() => router.push("/projects")}
							onMouseOver={() => {
								gsap.fromTo(
									".underline-3",
									{ width: "0%", height: "0%" },
									{
										width: "100%",
										height: "100%",
									}
								);
							}}
						>
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
			previewLink: "/projects",
		},
		{
			id: 5,
			content: () => {
				return (
					<div className="text-gray-400 hover:text-gray-100 relative">
						& feel free to{" "}
						<a
							className="relative text-orange-500 hover:text-orange-400 cursor-pointer"
							href="mailto:shreyvijayvagriya26@gmail.com?subject=hello shrey"
							target="_blank"
							onMouseOver={() => {
								gsap.fromTo(
									".underline-4",
									{ width: "0%", height: "0%" },
									{
										width: "100%",
										height: "100%",
									}
								);
							}}
						>
							say Hi
							<img
								className="absolute left-0 right-0 bottom-0 top-10 underline-4"
								src="./desc-images/underline-4.svg"
							/>
						</a>
					</div>
				);
			},
			leftImage: "./desc-images/icon-5.svg",
		},
	];

	const [active, setActive] = useState(desc[0]);
	const [play] = useSound("./sound-clips/sound-keyboard.mp3", { volume: 0.6 });
	const tl = gsap.timeline();

	useEffect(() => {
		const sections = gsap.utils.toArray(".section-container .section-item");
		sections.forEach((section) => {
			tl.fromTo(
				section,
				{ yPercent: 20, opacity: 0, width: 0, visibility: "hidden" },
				{
					stagger: 0.4,
					yPercent: 0,
					opacity: 1,
					width: "100%",
					visibility: "visible",
					delay: 0.1,
				}
			);
		});
		tl.fromTo(
			".preview-container",
			{ opacity: 0, yPercent: 20 },
			{ opacity: 1, yPercent: 0, delay: 0.5 }
		);
	}, []);

	const handleMouseOver = (item) => {
		setActive(item);
		tl.to(`.section-${item.id}`, { scale: 1.2 });
		tl.fromTo(
			".centered-image",
			{ opacity: 0, rotate: "0deg", xPercent: -200 },
			{ opacity: 1, rotate: "360deg", xPercent: 0 }
		);
		play();
	};

	const handleMouseOut = (item) => {
		setActive(null);
		tl.to(`.section-${item.id}`, { scale: 1 });
		tl.fromTo(
			".centered-image",
			{ opacity: 1, rotate: "0deg", xPercent: 0 },
			{ rotate: "360deg", xPercent: -200, opacity: 0 }
		);
	};

	return (
		<div className="w-full h-full">
			<div className="md:w-full lg:w-1/3 mx-auto sm:w-full xxs:w-full px-10 section-container">
				{desc.map((item) => {
					const ContentComponent = item.content();
					return (
						<div
							key={item.id}
							className={`flex justify-start items-center gap-2 w-full my-10 section-item section-${item.id}`}
							onMouseEnter={() => handleMouseOver(item)}
							onMouseLeave={() => handleMouseOut(item)}
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
							<div className="text-2xl">{ContentComponent}</div>
						</div>
					);
				})}
			</div>
			{/* <div className="border-t-2 border-dashed border-gray-700 w-screen p-10 flex justify-between items=center gap-10 sm:hidden preview-container">
				{desc.map((item) => {
					return (
						<div>
							{item.previewLink && (
								<iframe
									src={item.previewLink}
									width={300}
									height={300}
									className={`border-dashed border-gray-800 rounded-2xl ${
										active?.id === item.id && "border-indigo-600"
									}`}
								/>
							)}
						</div>
					);
				})}
			</div> */}
		</div>
	);
};
export default Description;
