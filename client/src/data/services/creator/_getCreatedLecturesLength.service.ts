import { AxiosInstance } from "axios";

export const getCreatedLecturesLength = (
	axios: AxiosInstance
): Promise<number> => {
	return axios.get("created-lectures-length").then((res) => Number(res.data));
};
