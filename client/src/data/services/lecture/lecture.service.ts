import { AxiosInstance } from "axios";
import { CreatedLectureModel } from "../../models/createdLecture.model";

export const getLecture = (
	axios: AxiosInstance,
	id: string
): Promise<CreatedLectureModel> => {
	return axios.get(`/lecture/${id}`).then((res) => res.data);
};

export const getLastViewedLecturePage = (axios: AxiosInstance, id: string) => {
	return axios
		.get(`/user/watching-lectures/${id}/page`)
		.then((res) => res.data);
};

export const test = (axios: AxiosInstance, id: string): Promise<string> => {
	return axios.post(`/user/watching-lectures/${id}`).then((res) => res.data);
};
