import { AxiosInstance } from "axios";
import { sendPasswordResetEmail } from "firebase/auth";
import auth from "../../config/firebase.config";

import { AccountData, AuthModel } from "../models/usersModel";

export const getAccountData = async (axios: AxiosInstance) => {
	return await axios.get<AccountData>("/account").then((res) => res.data);
};

export const updateConnection = async (
	axios: AxiosInstance,
	device: string,
	location: string
) => {
	return await axios
		.post<string>("/connections", { device, location })
		.then((res) => res.data);
};

export const postRegister = async (axios: AxiosInstance, data: AuthModel) => {
	return await axios.post<string>("/account", data).then((res) => res.data);
};

export const postLoginProvider = async (
	axios: AxiosInstance,
	data: AuthModel
) => {
	return await axios
		.post<string>("/login-provider", data)
		.then((res) => res.data);
};

export const postForgotPassword = async (email: string) => {
	return await sendPasswordResetEmail(auth, email);
};
