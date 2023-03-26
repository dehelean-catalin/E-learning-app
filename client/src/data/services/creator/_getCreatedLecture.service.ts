import { AxiosInstance } from "axios";

export const getCreatedLecture = (axios: AxiosInstance, id: string) => {
	return axios.get(`created-lectures/${id}`).then((res) => res.data.plan);
};
