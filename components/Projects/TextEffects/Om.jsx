import { makeStyles } from "@material-ui/core";
import gsap from "gsap";
import { useEffect } from "react";
import { theme } from "tailwind.config";
import colors from "tailwindcss/colors";

const Om = () => {
	const styles = useStyles();

	useEffect(() => {
		gsap.fromTo(
			".om",
			{ transform: "rotateY(0deg)", color: colors.yellow[300] },
			{
				transform: "rotateY(180deg)",
				repeat: -1,
				yoyo: true,
				color: colors.orange[400],
				ease: "circ.inOut",
				duration: 2,
			}
		);
	}, []);
	return (
		<div>
			<p className={`${styles.om} om`}>ॐ</p>
		</div>
	);
};

export default Om;

const useStyles = makeStyles((theme) => ({
	om: {
		color: colors.orange[300],
		fontSize: "3em",
		[theme.breakpoints.down("sm")]: {
			display: "hidden",
		},
	},
}));
