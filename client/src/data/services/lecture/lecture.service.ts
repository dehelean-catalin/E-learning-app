import { AxiosInstance } from "axios";
import { LectureModel } from "../../models/lectureModel";

export const getLecture = (
	axios: AxiosInstance,
	id: string
): Promise<LectureModel> => {
	return axios.get(`/lecture/${id}`).then((res) => res.data);
};
