import PRDialog from "components/PRDialog/PRDialog";
import { VideoDialogState, hideVideoDialog } from "data/redux/dialogReducer";
import { RootState } from "data/redux/store";

import { useDispatch, useSelector } from "react-redux";

const VideoDialog = () => {
	const dispatch = useDispatch();
	const videoDialog = useSelector<RootState, VideoDialogState>(
		(s) => s.dialogReducer.videoDialog
	);

	const handleHide = () => {
		dispatch(hideVideoDialog());
	};

	if (!videoDialog.isOpen) return;

	return (
		<PRDialog
			visible={videoDialog.isOpen}
			onHide={handleHide}
			header={
				<>
					<p>Lecture preview</p>
					<h3 className="title">{videoDialog.title}</h3>
				</>
			}
		>
			<video controls width="700">
				<source src={videoDialog.src} type="video/mp4" />
				<source src={videoDialog.src} type="video/webm" />
				Your browser does not support the video tag.
			</video>
		</PRDialog>
	);
};

export default VideoDialog;
