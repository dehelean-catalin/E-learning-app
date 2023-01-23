import React from "react";
import { useAxios } from "../../config/axiosInstance";

const SecurityPage = () => {
	const axiosInstance = useAxios();
	return (
		<div>
			<div>Security</div>
			<button onClick={() => axiosInstance.post("/user/email")}>Click</button>
		</div>
	);
};

export default SecurityPage;
