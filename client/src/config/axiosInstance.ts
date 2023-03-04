import axios from "axios";
import { decodeJwt } from "jose";
import { useContext } from "react";
import AuthContext from "../data/context/auth-context";

export const useAxios = () => {
	const token = localStorage.getItem("token");
	const { logout } = useContext(AuthContext);

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
			const { exp } = decodeJwt(token);

			if (exp * 1000 < Date.now()) {
				logout();
			}
		}

		return req;
	});

	return axiosInstance;
};
