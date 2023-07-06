import { AxiosInstance } from "axios";
import { UserDataModel } from "../models/usersModel";

export const getAccountData = async (
	axios: AxiosInstance
): Promise<UserDataModel> => {
	return await axios.get("/account").then((res) => res.data);
};
