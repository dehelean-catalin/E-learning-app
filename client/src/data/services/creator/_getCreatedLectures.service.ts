import { AxiosInstance } from "axios";
import { CreatedLectureModel } from "../../models/createdLecture.model";

export const getCreatedLectures = (
	axios: AxiosInstance
	// lectureId: string
	// direction: string,
	// length: number
): Promise<CreatedLectureModel[]> => {
	return axios.get("created-lectures").then((res) => res.data);
};
