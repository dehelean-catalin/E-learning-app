import axios from "axios";
import { useEffect } from "react";
import auth from "../../config/firebase.config";

export const useAxios = () => {
	const token = localStorage.getItem("token");

	const axiosInstance = axios.create({
		baseURL: "http://localhost:4000",
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	useEffect(() => {
		const reqIntercept = axiosInstance.interceptors.request.use(
			(config) => {
				if (!config.headers["Authorization"]) {
					config.headers["Authorization"] = `Bearer ${token}`;
				}
				return config;
			},
			(err) => Promise.reject(err)
		);
		const respIntercept = axiosInstance.interceptors.response.use(
			(response) => response,
			async (err) => {
				const prevReq = err?.congfig;
				if (err?.response?.status === 401 && !prevReq) {
					localStorage.clear();
				} else if (err?.response?.status === 401 && !prevReq?._retry) {
					prevReq._retry = true;
					const newToken = await auth?.currentUser?.getIdToken(true);
					prevReq.headers["Authorization"] = `Bearer ${newToken}`;
					return axiosInstance(prevReq);
				}
				return Promise.reject(err);
			}
		);

		return () => {
			axiosInstance.interceptors.response.eject(respIntercept);
			axiosInstance.interceptors.request.eject(reqIntercept);
		};
	}, [token, axiosInstance]);

	return axiosInstance;
};
