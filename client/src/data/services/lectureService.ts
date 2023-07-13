import { AxiosInstance } from "axios";
import { CreatedLectureModel, Review } from "../models/creatorModel";
import {
	BasicLecture,
	QueryFilterParams,
	SavedLecture,
	SearchedLecture,
} from "../models/lectureModel";

export const getLecture = async (axios: AxiosInstance, id: string) => {
	return await axios
		.get<CreatedLectureModel>(`/lecture/${id}`)
		.then((res) => res.data);
};

export const getSearchLectures = async (
	axios: AxiosInstance,
	params: QueryFilterParams
) => {
	return await axios
		.get<SearchedLecture[]>("/search", {
			params,
		})
		.then((res) => res.data);
};

export const getSavedLectures = async (axios: AxiosInstance) => {
	return await axios
		.get<SavedLecture[]>("/saved-lecture")
		.then((res) => res.data);
};
export const getLectures = async (axios: AxiosInstance, category: string) => {
	return await axios
		.get<BasicLecture[]>("/lectures", {
			params: { category },
		})
		.then((res) => res.data);
};
// aici
export const getLastChapter = async (axios: AxiosInstance, id: string) => {
	return await axios
		.get<string>(`/lectures/${id}/last-chapter`)
		.then((res) => res.data);
};

export const getLectureProgress = async (axios: AxiosInstance, id: string) => {
	return await axios.get(`lecture/${id}/progress`).then((res) => res.data);
};

export const getLectureReviews = async (axios: AxiosInstance, id: string) => {
	return await axios
		.get<Review[]>(`lecture/${id}/review`)
		.then((res) => res.data);
};

export const postLectureReview = async (
	axios: AxiosInstance,
	id: string,
	value: Omit<Review, "date" | "authorId">
) => {
	return await axios
		.post<string>(`lecture/${id}/review`, value)
		.then((res) => res.data);
};

export const deleteLectureReview = async (
	axios: AxiosInstance,
	id: string,
	rating: number
) => {
	return await axios
		.put<string>(`lecture/${id}/review`, { rating })
		.then((res) => res.data);
};
