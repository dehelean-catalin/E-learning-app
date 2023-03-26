import { AxiosInstance } from "axios";

export const updateCreatedLecturePlan = (
	axios: AxiosInstance,
	id: string,
	plan: {
		goals: any;
		requirements: any;
	}
): Promise<string> => {
	return axios
		.post(`created-lectures/${id}/plan`, plan)
		.then((res) => res.data);
};
