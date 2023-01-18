import axios from "axios";
export const forgotPassword = async (payload: string) => {
	return axios.post("/forgot-password", {
		email: payload,
	});
};
