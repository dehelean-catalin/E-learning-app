import { AxiosInstance } from "axios";
import { LectureCard } from "../../models/lectureModel";

export const getSavedLectures = (
	axios: AxiosInstance
): Promise<LectureCard[]> => {
	return axios.get("/saved-lecture").then((res) => res.data);
};
