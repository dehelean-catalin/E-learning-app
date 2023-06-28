import axios from "axios";
import { useContext } from "react";
import AuthContext from "../data/context/auth-context";

export const useAxios = () => {
	const { logout, token } = useContext(AuthContext);
	const expTime = localStorage.getItem("exp_time");

	const axiosInstance = axios.create({
		baseURL: "http://localhost:4000",
		headers: {
			authorization: `Bearer ${token}`,
		},
	});

	axiosInstance.interceptors.request.use(async (req) => {
		if (!token) {
			const token = localStorage.getItem("token");
			req.headers.authorization = `Bearer ${token}`;
		}
		if (token) {
			const expDate = new Date(expTime);

			if (expDate.getTime() * 1000 < Date.now()) {
				logout();
			}
		}

		return req;
	});

	return axiosInstance;
};
