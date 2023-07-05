import { AxiosInstance } from "axios";
import { DashboardLecture } from "../../models/createdLecture.model";

export const getCreatedLectures = (
	axios: AxiosInstance
): Promise<DashboardLecture[]> => {
	return axios.get("created-lectures").then((res) => res.data);
};
