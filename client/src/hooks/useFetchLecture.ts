import { NotificationActions } from "./../store/redux/notificationReducer";
import { useDispatch } from "react-redux";
import { useContext } from "react";
import { Axios } from "../resources/routes";
import AuthContext from "../store/context/auth-context";
import { BannerNotificationType } from "../resources/models/usersModel";

const useFetchLecture = () => {
	const { token } = useContext(AuthContext);
	const dispatch = useDispatch();
	const saveLecture = (id: string) => {
		Axios.put(
			"/add-lectures",
			{ id },
			{
				headers: {
					authorization: "Bearer " + token,
				},
			}
		)
			.then(() => {
				dispatch(
					NotificationActions.showBannerNotification({
						type: BannerNotificationType.Info,
						action: "settings/saved-lectures",
						message: "Added to Saved Lectures",
					})
				);
			})
			.catch((err) =>
				dispatch(
					NotificationActions.showBannerNotification({
						type: BannerNotificationType.Warning,
						message: err.response.data.message,
					})
				)
			);
	};

	const deleteLecture = (id: string) => {
		Axios.put(
			"/delete-lecture",
			{ id },
			{
				headers: {
					authorization: "Bearer " + token,
				},
			}
		)
			.then((res) => {
				console.log(res);
			})
			.catch((err) => console.log(err.response.data));
	};

	return {
		saveLecture,
		deleteLecture,
	};
};

export default useFetchLecture;
