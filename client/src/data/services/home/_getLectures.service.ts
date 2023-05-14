import { AxiosInstance } from "axios";
import { LectureCard } from "../../models/lectureModel";

export const getLectures = async (
	axios: AxiosInstance,
	params: { category: string }
): Promise<LectureCard[]> => {
	return await axios
		.get("/lectures", {
			params,
		})
		.then((res) => res.data);
};
