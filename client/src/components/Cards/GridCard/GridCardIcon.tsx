import { OverlayPanel } from "primereact/overlaypanel";
import { useRef } from "react";
import { BiDotsVerticalRounded, BiLinkAlt } from "react-icons/bi";
import { BsBookmark } from "react-icons/bs";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { NotificationActions } from "../../../data/redux/notificationReducer";
import { useAxios } from "../../../hooks/useAxios";
import "./GridCardIcon.scss";

const GridCardIcon = ({ id }) => {
	const dispatch = useDispatch();
	const axios = useAxios();
	const op = useRef(null);

	const onSuccess = () => {
		dispatch(
			NotificationActions.showBannerNotification({
				type: "info",
				action: "settings/saved-lectures",
				message: "Lecture Saved",
			})
		);
	};

	const onError = (err) => {
		dispatch(
			NotificationActions.showBannerNotification({
				type: "warning",
				action: "settings/saved-lectures",
				message: err.response.data.message,
			})
		);
	};

	const { mutate } = useMutation(() => axios.post(`user/save-lecture/${id}`), {
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
