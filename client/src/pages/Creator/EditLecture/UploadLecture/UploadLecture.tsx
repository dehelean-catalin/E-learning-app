import {
	UploadLectureActions,
	UploadLectureState,
} from "data/redux/creator/uploadLectureReducer";
import { RootState } from "data/redux/reducers";
import { FileUpload } from "primereact/fileupload";
import { Tree, TreeNodeTemplateOptions } from "primereact/tree";
import TreeNode from "primereact/treenode";
import { useDispatch, useSelector } from "react-redux";
import EditLectureDialog from "./EditLectureDialog";
import "./UploadLecture.scss";
import UploadLectureFooter from "./UploadLectureFooter";
import UploadLectureHeader from "./UploadLectureHeader";

const UploadLecture = () => {
	const dispatch = useDispatch();
	const { data, selectedNodeKey } = useSelector<RootState, UploadLectureState>(
		(s) => s.uploadLectureReducer
	);

	const nodeTemplate = (node: TreeNode, options: TreeNodeTemplateOptions) => {
		if (node?.children)
			return (
				<div className={options.className}>
					<p>
						<strong className="mr-2">Section {node.key}:</strong>
						{node.label}
					</p>
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

	const onSelectionChange = (e) => {
		if (selectedNodeKey === e.value) {
			dispatch(UploadLectureActions.setSelectedNodeKey(null));
			dispatch(UploadLectureActions.toggleHeaderVisibility(false));
		} else {
			dispatch(UploadLectureActions.setSelectedNodeKey(e.value));
			dispatch(UploadLectureActions.toggleHeaderVisibility(true));
		}
	};

	return (
		<>
			<Tree
				value={data}
				className="uplaod-lecture-tree"
				header={<UploadLectureHeader />}
				footer={<UploadLectureFooter />}
				nodeTemplate={nodeTemplate}
				dragdropScope="demo"
				selectionMode="single"
				selectionKeys={selectedNodeKey}
				onSelectionChange={onSelectionChange}
				onDragDrop={({ value }) => console.log(value)}
			/>
			<EditLectureDialog />
		</>
	);
};

export default UploadLecture;
