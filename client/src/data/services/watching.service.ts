import { AxiosInstance } from "axios";
import { Content } from "../models/createdLecture.model";

export const getWatchingLecture = async (
	axios: AxiosInstance,
	id: string
): Promise<Content[]> => {
	return await axios.get(`watching/${id}`).then((res) => res.data);
};

export const postWatchingLecture = async (
	axios: AxiosInstance,
	id: string,
	content: Content[]
): Promise<string> => {
	return axios.post(`/watching/${id}`, content).then((res) => res.data);
};
