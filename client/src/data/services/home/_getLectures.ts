import { AxiosInstance } from "axios";
import { LectureModel } from "data/models/lectureModel";

export const getLectures = async (
	axios: AxiosInstance,
	params: { category: string }
): Promise<LectureModel[]> => {
	return await axios
		.get("/lectures", {
			params,
		})
		.then((res) => res.data);
};
