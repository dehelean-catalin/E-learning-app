import { AxiosInstance } from "axios";
import { CreatedLectureModel } from "../../models/createdLecture.model";

export const getLecture = (
	axios: AxiosInstance,
	id: string
): Promise<CreatedLectureModel> => {
	return axios.get(`/lecture/${id}`).then((res) => res.data);
};
