import { AxiosInstance } from "axios";
import { CreatedLectureModel } from "../../models/createdLecture.model";

export const getHistoryLectures = (
	axios: AxiosInstance
): Promise<CreatedLectureModel[]> => {
	return axios.get(`/user/history`).then((res) => res.data);
};
