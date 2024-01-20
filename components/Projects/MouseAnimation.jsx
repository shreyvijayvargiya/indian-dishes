import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const MouseFollower = () => {
	const mouseRef = useRef(null);
	const textRef = useRef(null);

	useEffect(() => {
		const handleMouseMove = (e) => {
			const posX = e.clientX;
			const posY = e.clientY;
			const xPercent = (posX / window.innerWidth) * 100;
			const yPercent = (posY / window.innerHeight) * 100;
			if (posX < window.innerWidth / 2) {
				gsap.fromTo(
					textRef.current,
					{ rotateY: 0, rotateX: 0 },
					{ rotateX: -(xPercent / 2), rotateY: -(yPercent / 2) }
				);
			} else {
				gsap.fromTo(
					textRef.current,
					{ rotateY: 0, rotateX: 0 },
					{ rotateX: xPercent / 2, rotateY: yPercent / 2 }
				);
			}
		};

		window.addEventListener("mousemove", handleMouseMove);
		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
		};
	}, []);
	return (
		<div className="h-screen flex flex-col justify-center items-center bg-black bg-opacity-95 w-full">
			<div className="text-4xl" ref={textRef}>
				<div className="w-96 mx-auto bg-gray-900 border border-gray-800 h-96" />
			</div>
		</div>
	);
};
export default MouseFollower;
