import { AxiosInstance } from "axios";
import { CreatedLectureModel } from "../../../../../shared/src/createdLecture.model";

export const updateCreatedLecturePlan = (
	axios: AxiosInstance,
	id: string,
	data: CreatedLectureModel
): Promise<string> => {
	return axios.post(`created-lectures/${id}`, data).then((res) => res.data);
};
