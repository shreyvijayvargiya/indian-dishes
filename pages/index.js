import React from "react";
import { Home } from "components";
import OnPressLoader from "components/Projects/onPressLoader";
import ProjectsDrawer from "components/Projects/ProjectsDrawer";
import GlowyNavbar from "components/Projects/GlowyNavbar";
import DammModal from "components/Projects/CrazyModal";

const HomePage = () => (
	<div className="bg-black bg-opacity-5">
		<DammModal />;
	</div>
);
export default HomePage;
