import { AxiosInstance } from "axios";
import { CreatedLecturesModel } from "../../models/creator/createdLectures.model";

export const getCreatedLectures = (
	axios: AxiosInstance,
	lectureId: string,
	direction: string,
	items: number
): Promise<CreatedLecturesModel[]> => {
	return axios
		.get("created-lectures", { params: { lectureId, direction, items } })
		.then((res) => res.data);
};
