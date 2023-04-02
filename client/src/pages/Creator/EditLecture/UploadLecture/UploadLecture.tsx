import { RootState } from "data/redux/reducers";
import {
	UploadLectureActions,
	UploadLectureState,
} from "data/redux/uploadLecture/uploadLectureReducer";
import { Button } from "primereact/button";
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
		dispatch(UploadLectureActions.setSelectedNodeKey(e.value));
		dispatch(UploadLectureActions.toggleHeaderVisibility(true));
	};

	const onUnselect = () => {
		dispatch(UploadLectureActions.setSelectedNodeKey(null));
		dispatch(UploadLectureActions.toggleHeaderVisibility(false));
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
				onUnselect={onUnselect}
				onDragDrop={({ value }) => console.log(value)}
			/>
			<Button label="Save" type="button" />
			<EditLectureDialog />
		</>
	);
};

export default UploadLecture;
