import { AxiosInstance } from "axios";
import { BasicLecture } from "../../models/lectureModel";

export const getLectures = async (
	axios: AxiosInstance,
	category: string
): Promise<BasicLecture[]> => {
	return await axios
		.get("/lectures", {
			params: { category },
		})
		.then((res) => res.data);
};
