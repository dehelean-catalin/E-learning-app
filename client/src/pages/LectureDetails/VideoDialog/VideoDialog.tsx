import { useDispatch, useSelector } from "react-redux";
import PRDialog from "../../../components/PRDialog/PRDialog";
import { DialogActions, DialogState } from "../../../data/redux/dialog.reducer";
import { RootState } from "../../../data/redux/reducers";

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
		<PRDialog
			visible={visible}
			onHide={handleHide}
			header={
				<>
					<p>Lecture preview</p>
					<h3 className="title">{title}</h3>
				</>
			}
		>
			<video controls width="700">
				<source src={src} type="video/mp4" />
				<source src={src} type="video/webm" />
				Your browser does not support the video tag.
			</video>
		</PRDialog>
	);
};

export default VideoDialog;
