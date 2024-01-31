import StickyNavbar from "components/Home/Navbar";

const Body = ({ children }) => {
	return (
		<div className="w-full h-full">
			{children}
			<StickyNavbar />
		</div>
	);
};
export default Body;
