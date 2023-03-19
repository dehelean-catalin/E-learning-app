import { AxiosInstance } from "axios";
import { CreatedLecturesModel } from "data/models/creator/createdLectures.model";

export const getCreatedLectures = (
	axios: AxiosInstance
): Promise<CreatedLecturesModel[]> => {
	return axios.get("created-lectures").then((res) => res.data);
};
