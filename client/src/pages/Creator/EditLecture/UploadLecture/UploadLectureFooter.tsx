import InputTextField from "components/Forms/Inputs/InputTextField/InputTextField";
import { UploadLectureContext } from "data/context/uploadLecture";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { FormEvent, useContext, useState } from "react";
import { IoClose } from "react-icons/io5";

const UploadLectureFooter = () => {
	const { nodes, onAddSection } = useContext(UploadLectureContext);
	const [isVisible, toggleVisibility] = useState(false);
	const [title, setTitle] = useState("");

	const onSubmit = (e: FormEvent) => {
		e.preventDefault();
		const key = nodes.length + 1;

		onAddSection({
			key,
			label: title,
			children: [],
		});
		setTitle("");
		toggleVisibility(false);
	};

	const onClose = () => {
		setTitle("");
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
				<InputText
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					title="Title"
					placeholder="Enter a title"
					autoFocus
				/>

				<InputTextField />
				<InputTextField
					label="What will students be able to do at the end of this section?"
					placeholder="Enter a description"
					value={title}
					onChange={(e) => setTitle(e)}
				/>
				<Button label="Add section" disabled={!title} />
				<Button label="Cancel" type="button" onClick={onClose} />
			</form>
		</>
	);
};

export default UploadLectureFooter;
