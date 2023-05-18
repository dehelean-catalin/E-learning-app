import { AxiosInstance } from "axios";

type NexPassword = {
	newPassword: string;
	confirmPassword: string;
};
type NewEmail = {
	newEmail: string;
	confirmEmail: string;
};

export const postNewPassword = (
	axios: AxiosInstance,
	value: NexPassword
): Promise<string> => {
	return axios.post("change-password", value).then((res) => res.data);
};

export const postNewEmail = (
	axios: AxiosInstance,
	value: NewEmail
): Promise<string> => {
	return axios.post("change-email", value).then((res) => res.data);
};
