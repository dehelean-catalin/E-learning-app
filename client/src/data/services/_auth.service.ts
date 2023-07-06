import { AxiosInstance } from "axios";
import { AuthModel } from "data/models/_auth.model";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../config/firebase.config";

export const updateConnection = async (
	axios: AxiosInstance,
	device: string,
	location: string
) => {
	return await axios
		.post<string>("http://localhost:4000/connections", { device, location })
		.then((res) => res.data);
};

export const postRegister = async (
	axios: AxiosInstance,
	data: AuthModel
): Promise<string> => {
	return await axios
		.post("http://localhost:4000/account", data)
		.then((res) => res.data);
};

export const postLoginProvider = async (
	axios: AxiosInstance,
	data: AuthModel
): Promise<string> => {
	return await axios
		.post("http://localhost:4000/login-provider", data)
		.then((res) => res.data);
};

export const postForgotPassword = async (email: string) => {
	return await sendPasswordResetEmail(auth, email);
};
