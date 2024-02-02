// BrushCanvas.js
import React, { useRef, useEffect } from "react";
import colors from "tailwindcss/colors";

const BrushCanvas = () => {
	const canvasRef = useRef(null);
	const ctxRef = useRef(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		const ctx = canvas.getContext("2d");
		ctxRef.current = ctx;
	}, []);

	const handleMouseDown = (e) => {
		const ctx = ctxRef.current;
		ctx.beginPath();
		ctx.moveTo(e.clientX, e.clientY);
    ctx.stokeStyle = colors.gray[800];
	};

	const handleMouseMove = (e) => {
		const ctx = ctxRef.current;
		ctx.lineTo(e.clientX, e.clientY);
		ctx.stroke();
	};

	return (
		<canvas
			ref={canvasRef}
			onMouseDown={handleMouseDown}
			onMouseMove={handleMouseMove}
			style={{
				cursor: "crosshair",
				background: "url(./bg-banner.svg) no-repeat center/cover",
			}}
		/>
	);
};

export default BrushCanvas;
