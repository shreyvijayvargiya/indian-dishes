import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import colors from "tailwindcss/colors";
import { TiPin } from "react-icons/ti";

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
		<div className="w-screen h-screen bg-black bg-opacity-95 flex flex-col justify-center items-center p-10">
			<div className="flex flex-wrap w-3/5 mx-auto justify-center items-center gap-10 relative">
				{cards.map((item) => {
					return (
						<div className={styles.card} key={item}>
							<div className={styles.pinIcon}>
								<TiPin size={24} color={colors.pink[400]} />
							</div>
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
	},
	cardFront: {
		border: `1px solid ${colors.gray[700]}`,
		borderRadius: 10,
		padding: 10,
		zIndex: 100,
		transformOrigin: "top left",
		backfaceVisibility: "hidden",
		background: `linear-gradient(100deg, ${colors.gray[900]}, ${colors.gray[800]})`,
		transition: "all 1s ease",
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
		borderRadius: 10,
		backfaceVisibility: "hidden",
		background: `linear-gradient(45deg, ${colors.gray[900]}, ${colors.gray[800]})`,
		pointerEvents: "auto",
	},
	pinIcon: {
		position: "absolute",
		top: "-10px",
		left: "-10px",
		zIndex: 200,
		rotate: "-90deg",
	},
}));
export default PinImage;
