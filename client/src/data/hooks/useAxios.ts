import axios from "axios";
import { useContext } from "react";
import AuthContext from "../context/auth-context";

export const useAxios = () => {
	const { token } = useContext(AuthContext);

	const axiosInstance = axios.create({
		baseURL: "http://localhost:4000",
		headers: {
			authorization: `Bearer ${token}`,
		},
	});

	axiosInstance.interceptors.request.use(async (req) => {
		console.log(req);
		if (!token) {
			const token = localStorage.getItem("token");
			req.headers.authorization = `Bearer ${token}`;
		}

		return req;
	});

	return axiosInstance;
};
