import { AxiosInstance } from "axios";
import {
	Category,
	CreatedLectureModel,
	DashboardLecture,
	LanguageEnum,
} from "data/models/creatorModel";

export const getCreatedLecture = async (axios: AxiosInstance, id: string) => {
	return await axios
		.get<CreatedLectureModel>(`created-lectures/${id}`)
		.then((res) => res.data);
};

export const getCreatedLectures = async (axios: AxiosInstance) => {
	return await axios
		.get<DashboardLecture[]>("created-lectures")
		.then((res) => res.data);
};

export const postCreateLecture = async (
	axios: AxiosInstance,
	data: {
		title: string;
		language: LanguageEnum;
		category: Category;
		author: string;
	}
) => {
	return await axios.post<string>("create", data).then((res) => res.data);
};

export const updateCreatedLecturePlan = async (
	axios: AxiosInstance,
	id: string,
	data: CreatedLectureModel
) => {
	return await axios
		.post<string>(`created-lectures/${id}`, data)
		.then((res) => res.data);
};
