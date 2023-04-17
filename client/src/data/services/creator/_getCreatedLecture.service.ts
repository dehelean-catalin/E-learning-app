import { AxiosInstance } from "axios";
import { CreatedLectureModel } from "../../models/createdLecture.model";

export const getCreatedLecture = (
	axios: AxiosInstance,
	id: string
): Promise<CreatedLectureModel> => {
	return axios.get(`created-lectures/${id}`).then((res) => res.data);
};
