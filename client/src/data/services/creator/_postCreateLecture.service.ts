import { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { NavigateFunction } from "react-router";
import { AnyAction, Dispatch } from "redux";
import { CreateLecturePayload } from "../../models/createdLecture.model";
import { NotificationActions } from "../../redux/notificationReducer";

export const postCreateLecture = (
	axios: AxiosInstance,
	dispatch: Dispatch<AnyAction>,
	navigate: NavigateFunction,
	data: CreateLecturePayload
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
			navigate("/creator/dashboard", { replace: true });
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
