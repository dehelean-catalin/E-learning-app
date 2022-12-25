import { OverlayPanel } from "primereact/overlaypanel";
import React, { FC, useRef } from "react";
import { AiOutlineLink } from "react-icons/ai";
import { BiLinkAlt } from "react-icons/bi";
import { BsBookmark, BsShare } from "react-icons/bs";
import { IoTrashOutline } from "react-icons/io5";
import { MdContentCopy } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import useFetchLecture from "../../../hooks/useFetchLecture";
import { BasicLecture } from "../../../resources/models/lectures";
import { BannerNotificationType } from "../../../resources/models/models";
import { NotificationActions } from "../../../store/redux/notificationReducer";
import { CustomRating } from "../CustomRating/CustomRating";
import styles from "./LectureCard.module.scss";
import "./LectureCard.scss";

type Props = {
	value: BasicLecture;
	icon: JSX.Element;
	className?: string;
	bannerClassName?: string;
	contentClassName?: string;
	iconClassName?: string;
	onRemoveLecture?: (id: string) => void;
};

const LectureCard: FC<Props> = ({
	value,
	className = styles["lecture-card"],
	bannerClassName = styles.banner,
	contentClassName = styles.content,
	iconClassName = styles.icon,
	icon,
	onRemoveLecture,
}) => {
	const op = useRef(null);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { id, thumbnail, title, createdBy, rating, numberOfRates } = value;
	const { saveLecture } = useFetchLecture();
	const { pathname } = useLocation();

	const getPanelAction = () => {
		if (pathname.includes("saved-lecture")) {
			return (
				<div
					className={"item"}
					onClick={(e) => {
						onRemoveLecture(id);
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
					saveLecture(id);
					op.current.toggle(e);
				}}
			>
				<BsBookmark /> Save lecture
			</div>
		);
	};

	return (
		<div className={className}>
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
				<CustomRating rating={rating} numberOfRates={numberOfRates} />
			</div>
			<div className={iconClassName} onClick={(e) => op.current.toggle(e)}>
				{icon}
			</div>
		</div>
	);
};

export default LectureCard;
