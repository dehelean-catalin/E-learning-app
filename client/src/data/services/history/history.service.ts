import { AxiosInstance } from "axios";
import { HistoryModel } from "../../models/lectureModel";

export const getHistoryLectures = (
	axios: AxiosInstance
): Promise<HistoryModel[]> => {
	return axios.get(`/user/history`).then((res) => res.data);
};
