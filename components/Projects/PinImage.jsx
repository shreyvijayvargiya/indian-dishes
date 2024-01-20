import React from "react";
import { makeStyles } from "@material-ui/core";
import colors from "tailwindcss/colors";

const translations = {
	1: "rotateZ(-90deg) rotateY(-10deg)",
};

const getTranslation = (index) => {
	return translations[index];
};

const PinImage = () => {
	const styles = useStyles();

	const cards = [1];
	return (
		<div className="w-screen h-screen bg-black bg-opacity-95 flex flex-col justify-center items-center md:p-10">
			<div className="flex flex-wrap md:w-1/5 sm:w-full xxs:w-full xs:w-full mx-auto justify-center items-center gap-10 relative border-t-2 border-dashed border-gray-800 z-70">
				{cards.map((item) => {
					return (
						<div className={styles.card} key={item}>
							<div className={styles.cardFront}>
								<img
									src="./avatar.png"
									className="w-auto h-auto aspect-square"
								/>
								<p className="text-sm text-gray-400 hover:text-gray-200 text-center">
									Hover the image
								</p>
							</div>
							<div className={styles.cardBack}>
								<p className="text-gray-400 hover:text-gray-200 text-center">
									Hi I am Shrey, I am software developer by profession and doing
									this for past 4 years.
								</p>
								<a
									href="https://www.iamshrey.me"
									target="_blank"
									className="text-orange-400 hover:text-organge-700 underline text-center"
								>
									Website
								</a>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

const useStyles = makeStyles((theme) => ({
	card: {
		position: "relative",
		cursor: "pointer",
		transformStyle: "preserve-3d",
		transition: "all 0.2s ease",
		"&:hover": {
			"& .cardBlock": {
				transform: "rotateZ(-4deg) translateY(3px)",
			},
		},
	},
	cardFront: {
		border: `1px solid ${colors.gray[700]}`,
		borderRadius: 16,
		padding: 10,
		zIndex: 50,
		transformOrigin: "top left",
		backfaceVisibility: "hidden",
		background: `linear-gradient(100deg, ${colors.gray[900]}, ${colors.gray[800]})`,
		transition: "all 1s ease",
		transform: "rotateZ(12deg) translateY(-4px)",
		"&:hover": {
			transform: getTranslation(1),
			transformOrigin: "top left",
		},
	},
	cardBack: {
		position: "absolute",
		top: 0,
		left: 0,
		padding: 20,
		width: "100%",
		height: "100%",
		zIndex: -10,
		borderRadius: 16,
		backfaceVisibility: "hidden",
		background: `linear-gradient(45deg, ${colors.gray[900]}, ${colors.gray[800]})`,
		transformOrigin: "top left",
		transition: "all 0.2s ease",
		pointerEvents: "auto",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "column",
		transform: "rotateZ(4deg) translateY(-3px)",
	},
	pinIcon: {
		position: "absolute",
		top: "-18px",
		left: "-10px",
		zIndex: 200,
		rotate: "-90deg",
	},
}));
export default PinImage;
