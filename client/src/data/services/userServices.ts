import axiosInstance from "../../config/axios";
import { UserDataModel } from "../models/usersModel";

export const getAccountData = async () => {
	return axiosInstance.get<UserDataModel>("/user/data");
};
export const getProfilePicture = async () => {
	return axiosInstance.get("/user/profile-picture");
};
export const postProfilePicture = async (payload) => {
	return axiosInstance.post("/user/profile-picture", payload);
};
