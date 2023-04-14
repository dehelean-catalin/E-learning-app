import GenericDialog from "components/Dialog/GenericDialog";
import {
	UploadLectureActions,
	UploadLectureState,
} from "data/redux/creator/uploadLectureReducer";
import { RootState } from "data/redux/reducers";
import { Button } from "primereact/button";
import { FileUpload } from "primereact/fileupload";
import { InputText } from "primereact/inputtext";
import { useDispatch, useSelector } from "react-redux";

const EditLectureDialog = () => {
	const dispatch = useDispatch();
	const { visible, selectedNodeKey, data } = useSelector<
		RootState,
		UploadLectureState
	>((s) => s.uploadLectureReducer);

	const onHide = () => {
		dispatch(UploadLectureActions.toggleVisibility(false));
	};
	const itemKey =
		data?.find((node) => node?.key === selectedNodeKey)?.children.length + 1;

	const onSubmit = (e) => {
		e.preventDefault();
		dispatch(
			UploadLectureActions.onAddNodeChild({
				key: selectedNodeKey,
				data: {
					key: selectedNodeKey + "-" + itemKey,
					label: "test",
					data: {
						description: "hahah",
					},
				},
			})
		);
		dispatch(UploadLectureActions.toggleVisibility(false));
	};

	return (
		<GenericDialog visible={visible} onHide={onHide}>
			<form onSubmit={onSubmit}>
				<div className="flex flex-column gap-2">
					<label htmlFor="username">Title</label>
					<InputText id="username" />
				</div>
				<div className="flex flex-column gap-2">
					<label htmlFor="username">Description</label>
					<InputText id="username" />
				</div>
				<FileUpload />
				<Button label="Save" type="submit" />
			</form>
		</GenericDialog>
	);
};

export default EditLectureDialog;
