import { Button } from "primereact/button";
import { Tree } from "primereact/tree";
import TreeNode from "primereact/treenode";
import { useState } from "react";
import InputTextField from "../../../../components/Forms/Inputs/InputTextField/InputTextField";

const StructureLecture = () => {
	const [nodes, setNodes] = useState<TreeNode[]>([
		{
			key: "0",
			label: "Documents",
			data: "Documents Folder",
			children: [
				{
					key: "0-0",
					label: "Work",
					data: "Work Folder",
					icon: "pi pi-file-o",
				},
			],
		},
	]);
	const [isVisible, toggleVisibility] = useState(false);

	return (
		<div>
			Structura Cursului
			<Tree
				value={nodes}
				dragdropScope="demo"
				onDragDrop={({ value }) => setNodes(value)}
			/>
			{isVisible ? (
				<div>
					<InputTextField placeholder="Title" />
					<InputTextField placeholder="Description" />
				</div>
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

export default StructureLecture;
