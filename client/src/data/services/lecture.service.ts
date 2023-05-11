import { AxiosInstance } from "axios";
import { CreatedLectureModel, Review } from "../models/createdLecture.model";

export const getLecture = (
	axios: AxiosInstance,
	id: string
): Promise<CreatedLectureModel> => {
	return axios.get(`/lecture/${id}`).then((res) => res.data);
};

export const getLastChapter = (
	axios: AxiosInstance,
	id: string
): Promise<string> => {
	return axios.get(`/lectures/${id}/last-chapter`).then((res) => res.data);
};

export const getLectureProgress = (axios: AxiosInstance, id: string) => {
	return axios.get(`lecture/${id}/progress`).then((res) => res.data);
};

export const putLectureLastDate = (
	axios: AxiosInstance,
	id: string
): Promise<string> => {
	return axios.put(`lecture/${id}/last-date`).then((res) => res.data);
};

export const getLectureReviews = (
	axios: AxiosInstance,
	id: string
): Promise<{ reviews: Review[]; yourReview: Review[] }> => {
	return axios.get(`lecture/${id}/review`).then((res) => res.data);
};
export const postLectureReview = (
	axios: AxiosInstance,
	id: string,
	value: Review
): Promise<any> => {
	return axios.post(`lecture/${id}/review`, value).then((res) => res.data);
};
