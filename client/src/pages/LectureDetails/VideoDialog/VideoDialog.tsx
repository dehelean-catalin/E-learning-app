import { Dialog } from "primereact/dialog";
import { useDispatch, useSelector } from "react-redux";
import { DialogActions, DialogState } from "../../../data/redux/dialog.reducer";
import { RootState } from "../../../data/redux/reducers";
import "./VideoDialog.scss";

const VideoDialog = () => {
	const dispatch = useDispatch();
	const { visible, src, title } = useSelector<RootState, DialogState>(
		(s) => s.dialogReducer
	);

	const handleHide = () => {
		dispatch(DialogActions.hide());
	};

	if (!visible) return <></>;

	return (
		<Dialog
			visible={visible}
			onHide={handleHide}
			resizable={false}
			draggable={false}
			header={
				<>
					<p>Lecture preview</p>
					<h3 className="title">{title}</h3>
				</>
			}
			className="pr-dialog"
			maskClassName="dialog-mask"
		>
			<video controls width="700">
				<source src={src} type="video/mp4" />
				<source src={src} type="video/webm" />
				Your browser does not support the video tag.
			</video>
		</Dialog>
	);
};

export default VideoDialog;
