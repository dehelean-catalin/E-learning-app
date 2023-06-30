import { AxiosInstance } from "axios";
import { VideoProgressItem } from "../models/createdLecture.model";

export const getLectureCurrentProgress = async (
	axios: AxiosInstance,
	id: string,
	chapterId: string
): Promise<Omit<VideoProgressItem, "id">> => {
	return await axios
		.get(`lecture/${id}/progress/${chapterId}`)
		.then((res) => res.data);
};

export const postLectureProgress = async (
	axios: AxiosInstance,
	id: string,
	items: string[],
	lastName: string
): Promise<string> => {
	return axios
		.post(`lecture/${id}/progress`, { items, lastName })
		.then((res) => res.data);
};
