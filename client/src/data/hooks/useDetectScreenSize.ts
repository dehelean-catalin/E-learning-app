import { useEffect, useState } from "react";

const useDetectScreenSize = () => {
	const [screenSize, setScreenSize] = useState({
		width: window.innerWidth,
		height: window.innerHeight,
	});

	useEffect(() => {
		const handleResize = () => {
			setScreenSize({ width: window.innerWidth, height: window.innerHeight });
		};

		window.addEventListener("resize", handleResize);

		// Clean up the event listener
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return {
		screenSize,
		isMobile: screenSize.width < 480,
	};
};

export default useDetectScreenSize;
