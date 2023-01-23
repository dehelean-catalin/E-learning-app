import axios from "axios";

axios.defaults.baseURL = "http://192.168.1.11:4000";

axios.interceptors.request.use(
	(request) => {
		request.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
		return request;
	},
	(error) => {
		return Promise.reject(error);
	}
);

axios.interceptors.request.use(
	(request) => {
		return request;
	},
	(error) => {
		// NotificationBridgeService.onError();
		return Promise.reject(error);
	}
);

export default axios;
