import { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { CreateLecture } from "data/models/creator/createLecture.model";
import { NavigateFunction } from "react-router";
import { AnyAction, Dispatch } from "redux";
import { NotificationActions } from "../../redux/notificationReducer";

export const postCreateLecture = (
	axios: AxiosInstance,
	dispatch: Dispatch<AnyAction>,
	navigate: NavigateFunction,
	data: CreateLecture
) => {
	return axios
		.post("create", data)
		.then((res: AxiosResponse<string>) => {
			dispatch(
				NotificationActions.showBannerNotification({
					message: res.data,
					type: "info",
				})
			);
			navigate("/creator/created-lectures", { replace: true });
		})
		.catch((err: AxiosError<string>) =>
			dispatch(
				NotificationActions.showBannerNotification({
					message: err.response.data,
					type: "warning",
				})
			)
		);
};
