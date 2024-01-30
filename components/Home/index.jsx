import React, { useState } from "react";
import router from "next/router";


const Home = () => {
	const [toggle, setToggle] = useState(false);
	const [move, setMove] = useState(false);

	const [mousePosition, setMousePosition] = useState({
		x: 0,
		y: 0,
	});

	return (
		<div
			className="h-screen w-full overflow-hidden flex flex-col justify-center items-center relative"
			
			onMouseMoveCapture={(e) => {
				setToggle(false);
				setMousePosition({ x: e.clientX, y: e.clientY });
			}}
			style={{
				backgroundImage: `url(./bg-banner.png)`,
				backgroundOrigin: "border-box",
				backgroundPosition: "center center",
				backgroundRepeat: "repeat",
				backgroundAttachment: "fixed",
				backgroundColor: "rgb(0, 0, 0, 0.7)",
				backgroundBlendMode: "darken",
			}}
		>
			<div
				className="md:2/5 sm:w-full xl:w-2/5 xs:w-full xxs:w-full mx-auto break-words"
				onMouseMoveCapture={(e) => {
					setToggle(true);
					setMousePosition({ x: e.clientX, y: e.clientY });
				}}
				onMouseLeave={(e) => {
					setToggle(false);
				}}
			>
				<p className="text-gray-500 font-mono text-2xl">
					this is{" "}
					<span
						className="text-gray-50"
						style={{ fontFamily: "phosphate", fontSize: "10em" }}
					>
						SHREY
					</span>
				</p>
				<p className="text-gray-300 text-xl font-sans">
					Hi, I am Shrey, I am a Full Stack Developer with 4 years of industry
					experience in developing websites, mobile apps, blockchain wallets,
					smart contracts and backend services{" "}
				</p>
				<p className="text-xs w-28 py-2 px-2 rounded-md text-gray-300 my-2 bg-opacity-5 bg-gray-900 border border-gray-700 font-serif mx-auto">
					Hover the card
				</p>
				{toggle ? (
					<div
						style={{
							position: "fixed",
							top: mousePosition.y - 100 + "px",
							left: mousePosition.x - 100 + "px",
							width: toggle ? "50vw" : "0px",
							height: toggle ? "50vh" : "0px",
							borderRadius: 10,
							transition: "all 0.5s ease-in-out",
						}}
						className="box-1 text-gray-900 font-semibold w-full h-full border-2 border-dashed border-gray-300 p-2 flex justify-center items-center bg-transparent"
					>
						<iframe
							src="https://www.iamshrey.me/"
							width="100%"
							height="100%"
							style={{ borderRadius: 10 }}
							title="iamShrey portfolio website"
						/>
					</div>
				) : (
					<div
						className="box-2 w-4 h-4 rounded-full bg-green-600 p-2"
						id="box-2"
						style={{
							position: "fixed",
							top: mousePosition.y,
							left: mousePosition.x,
							transition: "all 0.5s ease-in-out",
						}}
					/>
				)}
			</div>
			
		</div>
	);
};
export default Home;
