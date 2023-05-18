import { AxiosInstance } from "axios";
import { LectureCard } from "../models/lectureModel";

export const getHistoryLectures = (
	axios: AxiosInstance
): Promise<LectureCard[]> => {
	return axios.get("history").then((res) => res.data);
};
