import gsap from "gsap";
import { useEffect } from "react";
import GitHubCalendar from "react-github-calendar";
import colors from "tailwindcss/colors";

const GithubCalenderContribution = () => {
	useEffect(() => {
		gsap.fromTo(
			".github-calender",
			{ borderColor: colors.gray[800] },
			{
				borderColor: colors.gray[600],
				ease: "power2.out",
				repeat: -1,
				yoyo: true,
			}
		);
	}, []);
	return (
		<div className="github-calender text-gray-400 border-dashed border-2 rounded-xl border-gray-800 p-1">
			<GitHubCalendar
				username="shreyvijayvargiya"
				blockSize={10}
				blockMargin={5}
				fontSize={12}
				hideTotalCount
				hideColorLegend
				year={2024}
			/>
		</div>
	);
};
export default GithubCalenderContribution;
