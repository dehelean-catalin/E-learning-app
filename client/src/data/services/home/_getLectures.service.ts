import { AxiosInstance } from "axios";
import { CreatedLectureModel } from "../../models/createdLecture.model";

export const getLectures = async (
	axios: AxiosInstance,
	params: { category: string }
): Promise<CreatedLectureModel[]> => {
	return await axios
		.get("/lectures", {
			params,
		})
		.then((res) => res.data);
};
