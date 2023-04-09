import {
	UploadLectureActions,
	UploadLectureState,
} from "data/redux/creator/uploadLectureReducer";
import { RootState } from "data/redux/reducers";
import { Button } from "primereact/button";
import { useDispatch, useSelector } from "react-redux";

const UploadLectureHeader = () => {
	const dispatch = useDispatch();
	const { headerVisible, selectedNodeKey } = useSelector<
		RootState,
		UploadLectureState
	>((s) => s.uploadLectureReducer);

	const onShowModal = () => {
		dispatch(UploadLectureActions.toggleVisibility(true));
	};

	const onDeleteNode = (key: string | number) => {
		dispatch(UploadLectureActions.onDeleteNode(key));
	};

	return (
		<header className="flex justify-content-between mb-2">
			<h1>Structura Cursului</h1>
			{headerVisible && (
				<div>
					<Button label="Add item" icon="pi pi-add" onClick={onShowModal} />
					<Button label="Edit" icon="pi pi-pencil" onClick={onShowModal} />
					<Button
						label="Delete"
						icon="pi pi-trash"
						onClick={() => onDeleteNode(selectedNodeKey)}
					/>
				</div>
			)}
		</header>
	);
};

export default UploadLectureHeader;
