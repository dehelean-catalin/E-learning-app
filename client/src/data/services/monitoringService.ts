import { AxiosInstance } from "axios";
import { HistoryLecture } from "../models/lectureModel";
import { VideoProgressItem } from "../models/usersModel";

export const getHistoryLectures = async (axios: AxiosInstance) => {
	return await axios.get<HistoryLecture[]>("history").then((res) => res.data);
};

export const getLectureCurrentProgress = async (
	axios: AxiosInstance,
	id: string,
	chapterId: string
) => {
	return await axios
		.get<Omit<VideoProgressItem, "id">>(`lecture/${id}/progress/${chapterId}`)
		.then((res) => res.data);
};

export const postLectureProgress = async (
	axios: AxiosInstance,
	id: string,
	items: string[],
	lastName: string
) => {
	return await axios
		.post<string>(`lecture/${id}/progress`, { items, lastName })
		.then((res) => res.data);
};
