import { OverlayPanel } from "primereact/overlaypanel";
import { FC, useRef } from "react";
import { BiDotsVerticalRounded, BiLinkAlt } from "react-icons/bi";
import { BsBookmark } from "react-icons/bs";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { NotificationActions } from "../../../data/redux/notificationReducer";
import { useAxios } from "../../../hooks/useAxios";
import "./GridCardIcon.scss";

const GridCardIcon: FC<{ id: string }> = ({ id }) => {
	const dispatch = useDispatch();
	const axios = useAxios();
	const op = useRef(null);

	const onSuccess = () => {
		dispatch(
			NotificationActions.showBannerNotification({
				type: "info",
				action: "library",
				message: "Lecture Saved",
			})
		);
	};

	const onError = (err) => {
		dispatch(
			NotificationActions.showBannerNotification({
				type: "warning",
				action: "library",
				message: err.response.data.message,
			})
		);
	};

	const { mutate } = useMutation(() => axios.post(`saved-lecture/${id}`), {
		onSuccess,
		onError,
	});

	const onCopyLink = (e) => {
		op.current.toggle(e);
		navigator.clipboard.writeText(`http://localhost:3000/lecture/${id}`);
		dispatch(
			NotificationActions.showBannerNotification({
				type: "info",
				message: "Copied to clipboard",
			})
		);
	};

	const onLectureSave = (e) => {
		mutate();
		op.current.toggle(e);
	};

	return (
		<div className="grid-card-icon" onClick={(e) => op.current.toggle(e)}>
			<BiDotsVerticalRounded size="24px" />
			<OverlayPanel ref={op} className="overlay">
				<div className="overlay-item" onClick={onLectureSave}>
					<BsBookmark /> Save lecture
				</div>
				<div className="overlay-item" onClick={onCopyLink}>
					<BiLinkAlt fontSize="16px" /> Copy link
				</div>
			</OverlayPanel>
		</div>
	);
};

export default GridCardIcon;
