import React, { useState, useEffect } from "react";

const LiveTime = () => {
	const [currentTime, setCurrentTime] = useState(new Date());

	useEffect(() => {
		const intervalId = setInterval(() => {
			setCurrentTime(new Date());
		}, 1000); // Update every second

		return () => clearInterval(intervalId); // Cleanup on unmount
	}, []);

	const formatTime = (time) => {
		const options = { hour: "2-digit", minute: "2-digit", second: "2-digit" };
		return time.toLocaleTimeString("en-GB", options);
	};

	return (
		<div>
			<p className="text-indigo-400 text-xl underline font-mono">{formatTime(currentTime)}</p>
		</div>
	);
};

export default LiveTime;
