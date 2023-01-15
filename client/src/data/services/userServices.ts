import axios from "axios";
import { UserDataModel } from "../models/usersModel";
export const getUserData = async () => {
	return axios.get<UserDataModel>("http://localhost:4000/user/data", {
		headers: {
			authorization: `Bearer ${localStorage.getItem("token")}`,
		},
	});
};
