import axios from "axios";
import { UserDataModel } from "../models/usersModel";

//TODO: Pass axios + RETURN TYPE

export const getAccountData = async () => {
	return await axios.get<UserDataModel>("http://localhost:4000/profile-data");
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
