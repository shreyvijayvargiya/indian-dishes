import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import gsap from "gsap";
import colors from "tailwindcss/colors";

const TextName = () => {
	const colorKeys = Object.keys(colors);
	const [index, setIndex] = useState(0);

	const startColorInterval = () => {
		return setInterval(() => {
			if (index === colorKeys.length - 1) {
				setIndex(0);
			} else {
				setIndex(index + 1);
			}
		}, 400);
	};

	const nameArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14];
	useEffect(() => {
		gsap.fromTo(
			".name-container",
			{ xPercent: 0 },
			{
				xPercent: -20,
				repeat: -1,
				yoyo: true,
				duration: 10,
				ease: "none",
			}
		);
	}, []);

	useEffect(() => {
		const colorsIntervalId = startColorInterval();
		return () => {
			clearInterval(colorsIntervalId);
		};
	}, [index]);

	const styles = useStyles();

	return (
		<div
			className="name-container flex justify-between items-center overflow-x-hidden gap-10 whitespace-nowrap  bg-black bg-opacity-20"
			style={{ width: "300%" }}
		>
			{nameArr.map((item) => {
				return (
					<div
						className={`text-name font-fancy ${styles.textName} px-10`}
						key={item}
						style={{
							color: colors[colorKeys[index]][400]
								? colors[colorKeys[index]][400]
								: colors.gray[400],
							textShadow: "0px 0px 40px rgb(250, 250, 250, 0.3)",
						}}
					>
						{" "}
						Shrey Vijayvargiya{" "}
					</div>
				);
			})}
		</div>
	);
};
export default TextName;

const useStyles = makeStyles((theme) => ({
	textName: {
		fontSize: "10em",
		[theme.breakpoints.down("sm")]: {
			fontSize: "5em",
		},
	},
}));
