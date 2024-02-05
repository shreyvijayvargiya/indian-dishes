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

	const [active, setActive] = useState(desc[0]);
	const [play] = useSound("./sound-clips/sound-keyboard.mp3", { volume: 0.6 });
	const tl = gsap.timeline();

	useEffect(() => {
		const sections = gsap.utils.toArray(".section-container .section-item");
		const tl = gsap.timeline();
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

	const handleMouseOver = (item) => {
		play();
		setActive(item);
		tl.to(`.section-active-${item.id}`, {
			opacity: 0.9,
			scale: 1.1,
			duration: 0.8,
		}).to(`.left-active-icon-${item?.id}`, { xPercent: -100, opacity: 0 });
	};

	const handleMouseOut = (item) => {
		setActive(null);
		tl.to(`.section-inactive-${item.id}`, {
			opacity: 1,
			scale: 1,
			duration: 0.8,
		}).fromTo(
			`.left-inactive-icon-${item?.id}`,
			{
				xPercent: -200,
			},
			{
				xPercent: 0,
			}
		);
	};

	return (
		<div className="w-full h-full px-20">
			<div className="md:w-1/2 mx-auto sm:w-full xxs:w-full px-20 section-container">
				{desc.map((item, index) => {
					return (
						<section
							key={item.id}
							className={`${
								active?.id === item.id
									? `section-inactive-${item.id}`
									: `section-active-${item.id}`
							} flex justify-start items-center gap-2 w-full my-10 section-item`}
							onMouseOver={() => handleMouseOver(item)}
							onMouseOut={() => handleMouseOut(item)}
						>
							<div
								className={`w-10 h-10 text-gray-400 text-2xl ${
									active?.id === item.id
										? `left-active-icon-${item.id}`
										: `left-inactive-icon-${item.id}`
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
