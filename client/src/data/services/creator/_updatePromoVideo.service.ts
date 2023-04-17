import { AxiosInstance } from "axios";

export const updatePromoVideo = (
	axios: AxiosInstance,
	id: string,
	formData: FormData
): Promise<string> => {
	return axios.post(`promoVideo/${id}`, formData).then((res) => res.data);
};
