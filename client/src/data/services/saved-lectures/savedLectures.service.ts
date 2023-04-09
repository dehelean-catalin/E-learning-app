import { AxiosInstance } from "axios";

export const getSavedLectures = (axios: AxiosInstance): Promise<any> => {
	return axios.get("/user/save-lecture").then((res) => res.data);
};
