import axiosInstance from "../../config/axios";
import { UserDataModel } from "../models/usersModel";

export const getAccountData = async () => {
	return await axiosInstance.get<UserDataModel>("/profile-data");
};
export const updateAccountData = async (payload) => {
	return await axiosInstance.put("/profile-data", payload);
};
export const getProfilePicture = async () => {
	return await axiosInstance.get("/profile-picture");
};
export const putProfilePicture = async (payload) => {
	return await axiosInstance.put("profile-picture", payload);
};

export const getProfileBanner = async () => {
	return await axiosInstance.get("/profile-banner");
};
export const putProfileBanner = async (payload) => {
	return await axiosInstance.put("profile-banner", payload);
};
