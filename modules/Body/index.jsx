import StickyNavbar from "components/Home/Navbar";

const Body = ({ children }) => {
	return (
		<div className="w-full h-full bg-black bg-opacity-95">
			{children}
			<StickyNavbar />
		</div>
	);
};
export default Body;
