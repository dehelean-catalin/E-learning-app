import { OverlayPanel } from "primereact/overlaypanel";
import { FC, useRef } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useDispatch } from "react-redux";
import PRButton from "../../../components/Forms/Buttons/PRButton/PRButton";
import { NotificationActions } from "../../../data/redux/notificationReducer";
import { useAxios } from "../../../hooks/useAxios";

const SavedLectureActionBar: FC<{ id: string }> = ({ id }) => {
	const dispatch = useDispatch();
	const axios = useAxios();
	const op = useRef(null);
	const queryClient = useQueryClient();

	const handleError = () => {
		dispatch(
			NotificationActions.showBannerNotification({
				type: "warning",
				action: "settings/saved-lectures",
				message: "Somenthing went wrong",
			})
		);
	};

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

	const { mutate: handleRemoveLecture } = useMutation(
		() => axios.delete(`saved-lecture/${id}`),
		{
			onSuccess: () => queryClient.invalidateQueries("save-lecture"),
			onError: handleError,
		}
	);

	return (
		<div className="m-auto" onClick={(e) => op.current.toggle(e)}>
			<i className="pi pi-ellipsis-v text-xl cursor-pointer" />
			<OverlayPanel ref={op}>
				<div>
					<PRButton
						label="Remove lecture"
						icon="pi pi-trash"
						className="bg-transparent px-1"
						onClick={(e) => {
							handleRemoveLecture();
							op.current.toggle(e);
						}}
					/>
				</div>

				<PRButton
					label="Copy link"
					icon="pi pi-link"
					className="bg-transparent px-1"
					onClick={handleCopyLink}
				/>
			</OverlayPanel>
		</div>
	);
};

export default SavedLectureActionBar;
