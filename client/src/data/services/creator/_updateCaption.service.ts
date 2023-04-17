import { AxiosInstance } from "axios";

export const updateCaption = (
	axios: AxiosInstance,
	id: string,
	formData: FormData
): Promise<string> => {
	return axios.post(`caption/${id}`, formData).then((res) => res.data);
};
