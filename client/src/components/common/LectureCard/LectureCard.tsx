import { OverlayPanel } from "primereact/overlaypanel";
import { FC, useRef } from "react";
import { BiLinkAlt } from "react-icons/bi";
import { BsBookmark } from "react-icons/bs";
import { IoTrashOutline } from "react-icons/io5";
import { useMutation, useQueryClient } from "react-query";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { getRatingValue } from "../../../helpers/lectureCardHelper";
import { useAxios } from "../../../resources/axiosInstance";
import { LectureModel } from "../../../resources/models/lectureModel";
import { BannerNotificationType } from "../../../resources/models/usersModel";
import { NotificationActions } from "../../../store/redux/notificationReducer";
import { CustomRating } from "../CustomRating/CustomRating";
import styles from "./LectureCard.module.scss";
import "./LectureCard.scss";

type Props = {
	value: LectureModel;
	icon: JSX.Element;
	className?: string;
	bannerClassName?: string;
	contentClassName?: string;
	iconClassName?: string;
};

const LectureCard: FC<Props> = ({
	value,
	className = styles["lecture-card"],
	bannerClassName = styles.banner,
	contentClassName = styles.content,
	iconClassName = styles.icon,
	icon,
}) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { pathname } = useLocation();
	const queryClient = useQueryClient();
	const op = useRef(null);
	const { id, thumbnail, title, createdBy, reviewList } = value;
	const axiosInstance = useAxios();
	const { mutate } = useMutation(
		() => axiosInstance.delete(`user/save-lecture/${id}`),
		{
			onSuccess: () => queryClient.invalidateQueries("save-lecture"),
		}
	);
	const { mutate: saveLecture } = useMutation(
		() => axiosInstance.post(`user/save-lecture/${id}`),
		{
			onSuccess: () => {
				dispatch(
					NotificationActions.showBannerNotification({
						type: BannerNotificationType.Info,
						action: "settings/saved-lectures",
						message: "Added to Saved Lectures",
					})
				);
			},
			onError: (err: any) => {
				dispatch(
					NotificationActions.showBannerNotification({
						type: BannerNotificationType.Warning,
						message: err.response.data.message,
					})
				);
			},
		}
	);

	const getPanelAction = () => {
		if (pathname.includes("saved-lecture")) {
			return (
				<div
					className={"item"}
					onClick={(e) => {
						mutate();
						op.current.toggle(e);
					}}
				>
					<IoTrashOutline fontSize="18px" /> Remove lecture
				</div>
			);
		}
		return (
			<div
				className={"item"}
				onClick={(e) => {
					saveLecture();
					op.current.toggle(e);
				}}
			>
				<BsBookmark /> Save lecture
			</div>
		);
	};
	return (
		<div className={className}>
			<div
				className={bannerClassName}
				onClick={() => navigate(`/lecture/${id}`)}
			>
				<img src={thumbnail} alt="" />
			</div>

			<div className={contentClassName}>
				<div className={styles.title}>
					<span>{title}</span>
				</div>
				<div className={styles.author}>{createdBy}</div>

				<CustomRating
					rating={getRatingValue(reviewList.data)}
					numberOfRates={reviewList.data.length}
					hideUsers={true}
				/>
			</div>
			<div className={iconClassName} onClick={(e) => op.current.toggle(e)}>
				{icon}
				<OverlayPanel ref={op} className={"lecture-card"}>
					{getPanelAction()}
					<div
						className={"item"}
						onClick={(e) => {
							op.current.toggle(e);
							navigator.clipboard.writeText("lala");
							dispatch(
								NotificationActions.showBannerNotification({
									type: BannerNotificationType.Info,
									message: "Copied to clipboard",
								})
							);
						}}
					>
						<BiLinkAlt fontSize="16px" /> Copy link
					</div>
				</OverlayPanel>
			</div>
		</div>
	);
};

export default LectureCard;
