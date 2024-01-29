import React from "react";

const Wrapper = ({ children }) => {
	return (
		<div className="w-full h-full relative">
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
					position: "sticky",
					inset: 0,
          top: 0,
          left:0,
          right:0,
          bottom: 0,
					zIndex: -10,
          opacity: 0.5
				}}
			/> */}
			{children}
		</div>
	);
};
export default Wrapper;
