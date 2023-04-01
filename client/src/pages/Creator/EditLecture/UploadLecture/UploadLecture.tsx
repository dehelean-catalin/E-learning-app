import { FileUpload } from "primereact/fileupload";
import { Tree, TreeNodeTemplateOptions } from "primereact/tree";
import TreeNode from "primereact/treenode";
import { useContext, useState } from "react";
import { UploadLectureContext } from "../../../../data/context/uploadLecture";
import "./UploadLecture.scss";
import UploadLectureFooter from "./UploadLectureFooter";
import UploadLectureHeader from "./UploadLectureHeader";

const UploadLecture = () => {
	const { nodes, onDeleteSection } = useContext(UploadLectureContext);
	const [selectedNodeKey, setSelectedNodeKey] = useState(null);

	const nodeTemplate = (node: TreeNode, options: TreeNodeTemplateOptions) => {
		if (node?.children)
			return (
				<div className={options.className}>
					<p>
						<strong className="mr-2">Section {node.key}:</strong>
						{node.label}
					</p>
					<div onClick={() => onDeleteSection(node.key)}>X</div>
				</div>
			);

		return (
			<div className={options.className}>
				<p>
					<strong className="mr-2">Lecture {node.key}:</strong>
					{node.label}
				</p>
				<FileUpload mode="basic" chooseLabel="Content" />
			</div>
		);
	};

	return (
		<Tree
			value={nodes}
			className="uplaod-lecture-tree"
			header={<UploadLectureHeader />}
			footer={<UploadLectureFooter />}
			nodeTemplate={nodeTemplate}
			dragdropScope="demo"
			selectionMode="single"
			selectionKeys={selectedNodeKey}
			onSelectionChange={(e) => setSelectedNodeKey(e.value)}
			onDragDrop={({ value }) => console.log(value)}
		/>
	);
};

export default UploadLecture;
