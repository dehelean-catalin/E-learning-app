import axiosInstance from "../../config/axios";
import { UserDataModel } from "../models/usersModel";

export const getAccountData = async () => {
	return await axiosInstance.get<UserDataModel>("/user/data");
};
export const updateAccountData = async (payload) => {
	return await axiosInstance.put("/user/data", payload);
};
export const getProfilePicture = async () => {
	return await axiosInstance.get("/user/profile-picture");
};
export const postProfilePicture = async (payload) => {
	return await axiosInstance.post("/user/profile-picture", payload);
};
