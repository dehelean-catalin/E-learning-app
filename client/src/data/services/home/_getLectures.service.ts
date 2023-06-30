import { AxiosInstance } from "axios";
import { LectureCard } from "../../models/lectureModel";

export const getLectures = async (
	axios: AxiosInstance,
	category: string
): Promise<LectureCard[]> => {
	return await axios
		.get("/lectures", {
			params: { category },
		})
		.then((res) => res.data);
};
