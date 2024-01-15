import { makeStyles } from "@material-ui/core";
import { useRef } from "react";

const HempBusiness = () => {
	const data = new Array(100).fill(1, 0, 100);
	const [scrollPosition, setScrollPosition] = useState(0);
	const totalLength = data.length * 10;

	const previewRef = useRef();

	const styles = useStyles();

	const handleScroll = (val) => {
		console.log(val, "val");
		previewRef.current.onScroll((val) => consol.log(val, "val"));

		const scrollY = window.scrollY;
		setScrollPosition(scrollY);
		previewRef.current.scrollLeft = scrollY;
		return scrollY;
	};

	return (
		<div className="h-full w-full bg-gray-900 overflow-auto">
			<div className="border-l-4 border-dotted border-gray-500 mx-10">
				<div className="w-auto flex flex-col justify-start items-start text-gray-400 py-10 px-4 overflow-y-scroll">
					{data.map((item, index) => (
						<div key={item + index}>Point {item + index}</div>
					))}
				</div>
			</div>
			<div className={styles.previewbox}>
				<div className="border border-gray-700 rounded-md">
					<div
						className="flex justify-between items-center text-gray-400 py-10 px-4 rounded-md gap-4 overflow-x-scroll"
						ref={previewRef}
					>
						{data.map((item, index) => (
							<div
								className="w-96 h-full bg-gray-600"
								key={item + index}
								style={{ width: "100px" }}
							>
								<p>Point {item + index}</p>
							</div>
						))}
					</div>
				</div>
				<br />
				<div className="h-2 rounded-full w-full bg-gray-800">
					<div
						className="h-2 rounded-full bg-gray-600"
						style={{ width: (scrollPosition / totalLength) * 100 + "%" }}
					/>
				</div>
			</div>
		</div>
	);
};
export default HempBusiness;

const useStyles = makeStyles((theme) => ({
	previewbox: {
		position: "fixed",
		height: "70vh",
		left: "5%",
		right: "5%",
		top: "30%",
		overflowX: "scroll",
		overflowY: "hidden",
	},
}));
