import { useEffect } from "react";
import { IoMdWarning } from "react-icons/io";
import { RiErrorWarningFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { BannerNotificationType } from "../../resources/models/usersModel";
import {
	BannerNotificationState,
	NotificationActions,
} from "../../store/redux/notificationReducer";
import { RootState } from "../../store/redux/reducers";
import styles from "./BannerNotification.module.scss";

const Notification = () => {
	const dispatch = useDispatch();
	const bannerNotification = useSelector<RootState, BannerNotificationState>(
		(s) => s.notificationReducer.bannerNotification
	);
	const clearNotification = () =>
		dispatch(NotificationActions.clearBannerMessage());

	useEffect(() => {
		let clearNotificationTimeout: any;
		if (
			bannerNotification != null &&
			typeof bannerNotification !== "undefined"
		) {
			clearNotificationTimeout = bannerNotification?.timeout
				? setTimeout(() => clearNotification(), bannerNotification?.timeout)
				: null;
		}

		return function () {
			clearNotificationTimeout ? clearTimeout(clearNotificationTimeout) : <></>;
		};
	}, [bannerNotification]);

	const getClassName = () => {
		if (typeof bannerNotification === "undefined") {
			return styles.hidden;
		}
		if (bannerNotification.type === BannerNotificationType.Warning) {
			return styles.warning;
		}
		if (bannerNotification.type === BannerNotificationType.Info) {
			return styles.info;
		}
	};

	return (
		<div className={getClassName()}>
			{bannerNotification?.type === BannerNotificationType.Warning && (
				<RiErrorWarningFill />
			)}
			<span>{bannerNotification?.message}</span>
			{typeof bannerNotification?.action !== "undefined" && (
				<NavLink to={bannerNotification.action} className={styles.link}>
					Go to
				</NavLink>
			)}
		</div>
	);
};

export default Notification;
