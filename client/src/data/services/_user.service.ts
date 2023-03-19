import axios, { AxiosInstance } from "axios";
import { UserDataModel } from "../models/usersModel";

//TODO: Pass axios + RETURN TYPE

export const getAccountData = async (
	axios: AxiosInstance
): Promise<UserDataModel> => {
	return await axios.get("profile-data").then((res) => res.data);
};

export const updateAccountData = async (payload) => {
	return await axios.put("http://localhost:4000/profile-data", payload);
};

export const getProfilePicture = async () => {
	return await axios.get("http://localhost:4000/profile-picture");
};

export const putProfilePicture = async (payload) => {
	return await axios.put("http://localhost:4000/profile-picture", payload);
};

export const getProfileBanner = async () => {
	return await axios.get("http://localhost:4000/profile-banner");
};
export const putProfileBanner = async (payload) => {
	return await axios.put("http://localhost:4000/profile-banner", payload);
};
