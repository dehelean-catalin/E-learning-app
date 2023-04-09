import { AxiosInstance } from "axios";
import { CreatedLecturesModel } from "../../models/creator/createdLectures.model";

export const getCreatedLecture = (
	axios: AxiosInstance,
	id: string
): Promise<CreatedLecturesModel> => {
	return axios.get(`created-lectures/${id}`).then((res) => res.data);
};
