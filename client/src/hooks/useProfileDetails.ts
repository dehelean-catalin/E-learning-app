import axios from "axios";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
	BannerNotificationType,
	UserDetails,
} from "../resources/models/models";
import { storage } from "../store/firebase";
import { NotificationActions } from "../store/redux/notificationReducer";
export const useProfileDetails = () => {
	const dispatch = useDispatch();
	const userId = localStorage.getItem("userId");
	const [loading, setLoading] = useState(false);
	const storageRef = ref(storage, `users/${userId}`);

	const sendRequest = (
		values: UserDetails,
		onSelect: (e: any) => void,
		activeIndex: number,
		profilePicture: File
	) => {
		if (profilePicture) {
			uploadBytes(storageRef, profilePicture).then(() => {
				getDownloadURL(ref(storage, `users/${userId}`)).then((url) => {
					axios
						.put(`http://localhost:4000/users/${userId}`, {
							values,
							profilePicture: url,
						})
						.then(() => onSelect(activeIndex + 1))
						.catch(() => {
							dispatch(
								NotificationActions.showBannerNotification({
									type: BannerNotificationType.Warning,
									message: "Try again! Something went wrong",
								})
							);
						})
						.finally(() => setLoading(false));
				});
			});
			return;
		}
		axios
			.put(`http://localhost:4000/users/${userId}`, {
				values,
				profilePicture: null,
			})
			.then(() => onSelect(activeIndex + 1))
			.catch(() => {
				dispatch(
					NotificationActions.showBannerNotification({
						type: BannerNotificationType.Warning,
						message: "Try again! Something went wrong",
					})
				);
			})
			.finally(() => setLoading(false));
	};

	return {
		sendRequest,
		loading,
	};
};
