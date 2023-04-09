import { UploadLectureActions } from "data/redux/creator/uploadLectureReducer";
import { RootState } from "data/redux/reducers";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import TreeNode from "primereact/treenode";
import { FormEvent, useState } from "react";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

const UploadLectureFooter = () => {
	const dispatch = useDispatch();
	const nodes = useSelector<RootState, TreeNode[]>(
		(s) => s.uploadLectureReducer.data
	);

	const [isVisible, toggleVisibility] = useState(false);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");

	const onSubmit = (e: FormEvent) => {
		e.preventDefault();
		const key = nodes.length + 1;
		dispatch(
			UploadLectureActions.onAddNode({
				key,
				label: title,
				data: description,
				children: [],
			})
		);
		setTitle("");
		setDescription("");
		toggleVisibility(false);
	};

	const onClose = () => {
		setTitle("");
		setDescription("");
		toggleVisibility(false);
	};

	if (!isVisible)
		return (
			<Button
				label="Section"
				icon="pi pi-plus-circle"
				onClick={() => toggleVisibility(true)}
			/>
		);

	return (
		<>
			<IoClose onClick={onClose} />
			<form onSubmit={onSubmit}>
				<div className="flex flex-column gap-2">
					<label htmlFor="title">Title</label>
					<InputText
						id="title"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						title="Title"
						placeholder="Enter a title"
						autoFocus
					/>
				</div>
				<div className="flex flex-column gap-2">
					<label htmlFor="description">Description</label>
					<InputText
						id="description"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						placeholder="Enter a description"
					/>
				</div>

				<Button label="Add section" disabled={!title} />
				<Button label="Cancel" type="button" onClick={onClose} />
			</form>
		</>
	);
};

export default UploadLectureFooter;
