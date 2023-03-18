import { CustomRating } from "common/CustomRating/CustomRating";
import { getRatingValue } from "helper/lectureCardHelper";
import { OverlayPanel } from "primereact/overlaypanel";
import { FC, useRef } from "react";
import { BiDotsVerticalRounded, BiLinkAlt } from "react-icons/bi";
import { BsBookmark } from "react-icons/bs";
import { IoTrashOutline } from "react-icons/io5";
import { useMutation, useQueryClient } from "react-query";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { LectureModel } from "../../data/models/lectureModel";
import { NotificationActions } from "../../data/redux/notificationReducer";
import { useAxios } from "../../hooks/useAxios";
import styles from "./LectureCard.module.scss";
import "./LectureCard.scss";

type Props = {
	value: LectureModel;
	icon?: JSX.Element;
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
	icon = <BiDotsVerticalRounded size="26px" />,
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
						type: "info",
						action: "settings/saved-lectures",
						message: "Lecture Saved",
					})
				);
			},
			onError: (err: any) => {
				dispatch(
					NotificationActions.showBannerNotification({
						type: "warning",
						action: "settings/saved-lectures",
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
				{/* <div>{getLectureDuration(value.items.data)}</div>
				<div>{value.language}</div> */}
				<CustomRating
					rating={getRatingValue(reviewList.data)}
					numberOfRates={reviewList.data.length}
					hideUsers={true}
				/>
				{/* {value.createdAt?.split("T")[0]} */}
			</div>
			<div className={iconClassName} onClick={(e) => op.current.toggle(e)}>
				{icon}
				<OverlayPanel ref={op} className={"lecture-card"}>
					{getPanelAction()}
					<div
						className={"item"}
						onClick={(e) => {
							op.current.toggle(e);
							navigator.clipboard.writeText(
								`http://localhost:3000/lecture/${id}`
							);
							dispatch(
								NotificationActions.showBannerNotification({
									type: "info",
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
