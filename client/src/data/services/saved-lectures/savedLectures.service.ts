import { AxiosInstance } from "axios";
import { BasicLecture } from "../../models/lectureModel";

export const getSavedLectures = (
	axios: AxiosInstance
): Promise<BasicLecture[]> => {
	return axios.get("/saved-lecture").then((res) => res.data);
};
