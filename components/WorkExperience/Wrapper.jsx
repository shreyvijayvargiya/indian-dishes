import gsap from "gsap";
import React, { useEffect } from "react";

const Wrapper = ({ children }) => {

	useEffect(( )=> {
		gsap.from('.wrapper-container', { opacity: 1, scale: 0.2})
	}, [])
	return (
		<div className="w-full bg-black bg-opacity-90 h-screen z-100 wrapper-container sticky top-0 bottom-0 right-0 left-0">
			{/* <div
				className="bg-image"
				style={{
					backgroundImage: `url(./bg-workExp.jpg)`,
					backgroundBlendMode: "color-burn",
					backgroundPosition: "center center",
					backgroundRepeat: "no-repeat",
          backgroundSize: "100%",
					width: "100%",
					height: "100vh",
					position: "absolute",
					inset: 0,
					zIndex: -10,
          opacity: 0.3
				}}
			/> */}
			{children}
		</div>
	);
};
export default Wrapper;
