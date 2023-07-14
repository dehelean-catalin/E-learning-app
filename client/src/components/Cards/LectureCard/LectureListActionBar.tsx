import { OverlayPanel } from "primereact/overlaypanel";
import { FC, useRef } from "react";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { useAxios } from "../../../data/hooks/useAxios";
import { NotificationActions } from "../../../data/redux/notificationReducer";
import PRButton from "../../PRButton/PRButton";

const LectureListActionBar: FC<{ id: string }> = ({ id }) => {
	const dispatch = useDispatch();
	const axios = useAxios();
	const op = useRef(null);

	const handleSuccess = () => {
		dispatch(
			NotificationActions.showBannerNotification({
				type: "info",
				action: "settings/saved-lectures",
				message: "Lecture Saved",
			})
		);
	};
	const handleError = () => {
		dispatch(
			NotificationActions.showBannerNotification({
				type: "warning",
				action: "settings/saved-lectures",
				message: "Somenthing went wrong",
			})
		);
	};

	const { mutate: handleSaveLecture } = useMutation(
		() => axios.post(`saved-lecture/${id}`),
		{
			onSuccess: handleSuccess,
			onError: handleError,
		}
	);

	const handleCopyLink = (e) => {
		op.current.toggle(e);
		navigator.clipboard.writeText(`http://localhost:3000/lecture/${id}`);
		dispatch(
			NotificationActions.showBannerNotification({
				type: "info",
				message: "Copied to clipboard",
			})
		);
	};

	return (
		<div className="m-auto" onClick={(e) => op.current.toggle(e)}>
			<i className="pi pi-ellipsis-v text-xl cursor-pointer" />
			<OverlayPanel ref={op}>
				<div
					className={"item"}
					onClick={(e) => {
						handleSaveLecture();
						op.current.toggle(e);
					}}
				>
					<PRButton
						label="Save lecture"
						icon="pi pi-bookmark"
						className="bg-transparent px-1"
					/>
				</div>

				<div className={"item"} onClick={handleCopyLink}>
					<PRButton
						label="Copy link"
						icon="pi pi-link"
						className="bg-transparent px-1"
					/>
				</div>
			</OverlayPanel>
		</div>
	);
};

export default LectureListActionBar;
