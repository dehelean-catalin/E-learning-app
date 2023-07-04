import { AxiosInstance } from "axios";
import { BasicLecture } from "../models/lectureModel";

export const getHistoryLectures = (
	axios: AxiosInstance
): Promise<BasicLecture[]> => {
	return axios.get("history").then((res) => res.data);
};
