import React, { useEffect } from "react";
import { styled } from "@material-ui/core/styles";
import gsap from "gsap";
import colors from "tailwindcss/colors";

const InfiniteSign = styled("div")({
	width: "100px",
	height: "100px",
	position: "relative",
	animation: "rotate 2s linear infinite",
});

const InnerCircle = styled("div")({
	position: "absolute",
	top: "50%",
	left: "50%",
	width: "20px",
	height: "20px",
	backgroundColor: "rgb(200, 200, 200, 0.1)",
	borderRadius: "50%",
	transform: "translate(-50%, -50%)",
});

const OuterCircle = styled("div")({
	position: "absolute",
	top: "50%",
	left: "50%",
	width: "40px",
	height: "40px",
	border: `1px dotted ${colors.gray[800]}`,
	borderRadius: "50%",
	transform: "translate(-50%, -50%)",
});

const InfinitySign = () => {
	useEffect(() => {
		const tl = gsap.timeline();
		tl.fromTo(
			".upper-sign",
			{ opacity: 0, xPercent: -20 },
			{
				xPercent: 60,
				opacity: 1,
				duration: 1,
				repeat: -1,
				yoyo: true,
				ease: "power2.inOut",
			}
		).fromTo(
			".lower-sign",
			{ xPercent: 0 },
			{
				xPercent: 80,
				repeat: -1,
				duration: 1,
				yoyo: true,
				ease: "power2.inOut",
			}
		);
	}, []);
	return (
		<div className="flex justify-center items-center">
			<InfiniteSign className="upper-sign">
				<InnerCircle />
				<OuterCircle />
			</InfiniteSign>
			<InfiniteSign className="lower-sign">
				<InnerCircle />
				<OuterCircle />
			</InfiniteSign>
			<InfiniteSign className="upper-sign">
				<InnerCircle />
				<OuterCircle />
			</InfiniteSign>
			<InfiniteSign className="lower-sign">
				<InnerCircle />
				<OuterCircle />
			</InfiniteSign>
		</div>
	);
};

export default InfinitySign;
