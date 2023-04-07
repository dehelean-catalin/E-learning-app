import { Button } from "primereact/button";
import { FileUpload } from "primereact/fileupload";
import { Tree } from "primereact/tree";
import { FormEvent, useContext, useState } from "react";
import InputTextField from "../../../../components/Forms/Inputs/InputTextField/InputTextField";
import { UploadLectureContext } from "../../../../data/context/uploadLecture";

const UploadLecture = () => {
	const { nodes, onAddSection } = useContext(UploadLectureContext);
	const [isVisible, toggleVisibility] = useState(false);
	const [title, setTitle] = useState("");
	console.debug(title);
	const nodeTemplate = (node, options) => {
		if (node?.children)
			return (
				<div className={options.className}>
					<strong>Section {node.key}:</strong>
					{node.label}
					<Button label="Add Section Item" icon="pi pi-plus-circle" />
				</div>
			);
		return (
			<div className={options.className}>
				<strong>Lecture {node.key}:</strong>
				{node.label}
				<FileUpload mode="basic" />
			</div>
		);
	};

	const onSubmit = (e: FormEvent) => {
		e.preventDefault();
		const key = nodes.length + 1;

		onAddSection({
			key,
			label: title,
			children: [],
		});
	};

	return (
		<div className="flex-1">
			Structura Cursului
			<Tree
				value={nodes}
				dragdropScope="demo"
				onDragDrop={({ value }) => console.log(value)}
				nodeTemplate={nodeTemplate}
			/>
			{isVisible ? (
				<form onSubmit={onSubmit}>
					<InputTextField
						placeholder="Title"
						value={title}
						onChange={(e) => setTitle(e)}
					/>

					<Button label="Save" />
				</form>
			) : (
				<Button
					label="Add Section"
					icon="pi pi-plus-circle"
					onClick={() => toggleVisibility(true)}
				/>
			)}
		</div>
	);
};

export default UploadLecture;
