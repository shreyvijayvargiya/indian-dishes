import gsap from "gsap";
import router from "next/router";
import React, { useEffect, useState } from "react";
import colors from "tailwindcss/colors";
import useSound from "use-sound";

const Description = () => {
	const desc = [
		{
			id: 1,
			content: () => (
				<div className="text-gray-400 hover:text-gray-100 z-100">
					<p className="z-100">
						Hello, I am a{" "}
						<span className="text-blue-600 cursor-pointer hover:text-blue-400">
							software developer
						</span>
					</p>
				</div>
			),
			leftImage: <img className="w-10 h-10 img-1" src="./avatar.png" />,
			bgImage: <img className="w-full h-full object-cover" src="./devBg.svg" />,
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
								className="absolute left-0 right-0 bottom-0 top-5 underline-1"
								src="./desc-images/underline-1.svg"
							/>
						</span>{" "}
						in developing
					</p>
				</div>
			),
			leftImage: (
				<img className="w-10 h-10 img-2" src="./desc-images/icon-2.svg" />
			),
			bgImage: (
				<img className=" w-full h-full object-cover" src="./workExBg.svg" />
			),
			previewLink: "/work-experience",
		},
		{
			id: 3,
			content: () => (
				<div className="text-gray-400 hover:text-gray-100 font-serif">
					<p>
						website and mobile apps
						{"(here is my"}
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
								className="absolute left-0 right-0 bottom-0 top-5 underline-2"
								src="./desc-images/underline-2.svg"
							/>
						</span>
						{")"}
					</p>
				</div>
			),
			leftImage: (
				<img className="w-10 h-10 img-3" src="./desc-images/icon-3.svg" />
			),
			bgImage: (
				<img
					className="w-full h-full z-0 object-cover"
					src="./projectsBg.svg"
				/>
			),
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
								className="absolute left-0 right-0 bottom-0 top-5 underline-3"
								src="./desc-images/underline-3.svg"
							/>
						</span>
					</p>
				</div>
			),
			leftImage: (
				<img className="w-10 h-10 img-4" src="./desc-images/icon-4.svg" />
			),
			bgImage: (
				<img
					className="w-full h-full z-0 object-cover"
					src="./websitesBg.svg"
				/>
			),
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
								className="absolute left-0 right-0 bottom-0 top-5 underline-4"
								src="./desc-images/underline-4.svg"
							/>
						</a>
					</div>
				);
			},
			bgImage: (
				<img className=" w-full h-full z-0 object-cover" src="./mailmeBg.svg" />
			),
			leftImage: (
				<img className="w-10 h-10 img-5" src="./desc-images/icon-5.svg" />
			),
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
			".cursor-image",
			{ yPercent: -10, scale: 1, rotateX: "2deg" },
			{ yPercent: 10, repeat: -1, yoyo: true, scale: 0.8, rotateX: "-2deg" }
		);
		tl.fromTo(
			".img-1",
			{ rotateX: "2deg" },
			{
				rotateX: "-2deg",
				duration: 4,
				repeat: -1,
				yoyo: true,
			}
		)
			.fromTo(
				".img-2",
				{ x: "2deg" },
				{
					x: "-2deg",
					duration: 4,
					repeat: -1,
					yoyo: true,
					ease: "bounce.inOut",
				}
			)
			.fromTo(
				".img-3",
				{ y: "2deg" },
				{
					y: "-2deg",
					duration: 4,
					repeat: -1,
					yoyo: true,
					ease: "bounce.inOut",
				}
			)
			.fromTo(
				".img-4",
				{ yPercent: "2%" },
				{
					yPercent: "-2%",
					duration: 4,
					repeat: -1,
					yoyo: true,
					ease: "bounce.inOut",
				}
			);
	}, []);

	const handleMouseOver = (item) => {
		setActive(item);
		tl.to(`.bg-image-${item.id}`, {
			opacity: 0.5,
			scaleX: 1,
			transformOrigin: "50% 50%",
			borderRadius: 100,
			ease: "power2.out",
		});
		play();
	};

	const handleMouseOut = (item) => {
		tl.to(`.bg-image-${item.id}`, {
			opacity: 0,
			ease: "power2.in",
			scaleX: 0,
			transformOrigin: "50% 50%",
		});
		setActive(null);
	};

	const [mousePosition, setMousePosition] = useState({
		x: 0,
		y: 0,
	});

	return (
		<div
			className="w-full h-full relative"
			onMouseMoveCapture={(e) => {
				setMousePosition({ x: e.clientX, y: e.clientY });
			}}
		>
			<div className="md:w-full section-container lg:w-1/3 mx-auto rounded-xl">
				{desc.map((item) => {
					const ContentComponent = item.content();
					return (
						<div
							key={item.id}
							className={`relative w-full mx-auto gap-2 py-8 my-4 hover:bg-black hover:bg-opacity-40 bg-black bg-opacity-10 flex flex-row justify-center items-center section-item section-${item.id} border rounded-xl border-dashed border-gray-700`}
							onMouseEnter={() => handleMouseOver(item)}
							onMouseLeave={() => handleMouseOut(item)}
						>
							<div className="absolute left-0 top-0 bottom-0 p-5">
								{item.leftImage}
							</div>
							<div className="text-xl text-center">{ContentComponent}</div>
							<div
								className={`bg-image-${item?.id} absolute top-0 left-0 right-0 bottom-0 z-0 w-full h-full rounded-xl`}
								style={{
									pointerEvents: "none",
								}}
							>
								{item.bgImage}
							</div>
						</div>
					);
				})}
			</div>
			{mousePosition.x && mousePosition.y && (
				<div
					style={{
						position: "fixed",
						top: mousePosition.y + "px",
						left: mousePosition.x + "px",
					}}
				>
					{/* <img src="./circular-cursor.svg" className="w-40 h-40 cursor-image" /> */}
				</div>
			)}
		</div>
	);
};
export default Description;
