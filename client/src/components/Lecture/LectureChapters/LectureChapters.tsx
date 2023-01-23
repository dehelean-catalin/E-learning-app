import { Tree } from "primereact/tree";
import TreeNode from "primereact/treenode";
import { FC } from "react";
import { BsPlayCircle } from "react-icons/bs";
import Divider from "../../../common/Divider/Divider";
import { Item } from "../../../data/models/lectureModel";
import { getDuration } from "../../../pages/LectureOverview/LectureOverviewTree";
import styles from "./LectureChapters.module.scss";
type Props = {
	value: Item;
};
const LectureChapters: FC<Props> = ({ value }) => {
	return (
		<div className={styles.chapters}>
			<span>Chapters</span>
			<Divider />
			{value.description}
			<Tree
				value={value.data}
				className={styles["course-list"]}
				nodeTemplate={nodeTemplate}
			/>
		</div>
	);
};

export default LectureChapters;

const nodeTemplate = (node: TreeNode, options) => {
	let label = <b>{node.label}</b>;

	return (
		<div className={options.className}>
			{label}
			<div>
				<BsPlayCircle />
				{getDuration(node)}
			</div>
		</div>
	);
};
