import { Tree } from "primereact/tree";
import TreeNode from "primereact/treenode";
import { FC } from "react";
import { BsPlayCircle } from "react-icons/bs";
import { LectureItem } from "../../../resources/models/lectureModel";
import ReviewList from "../ReviewList/ReviewList";
import styles from "./LectureSectionCard.module.scss";
type Props = {
	item: LectureItem;
};
const LectureSectionCard: FC<Props> = ({ item }) => {
	const { title, description } = item;

	const nodeTemplate = (node: TreeNode, options) => {
		let label = <b>{node.label}</b>;

		return (
			<div className={options.className}>
				{label}
				<div>
					<BsPlayCircle />
					{node?.children
						? Math.round(
								node.children.reduce((a, b) => a + b.data.duration, 0) / 60
						  ) + " min"
						: Math.round(node.data.duration / 60) + " min"}
				</div>
			</div>
		);
	};

	return (
		<div className={styles["lecture-item"]}>
			<div className={styles["section-title"]}>{title}</div>
			<div>{description}</div>

			{item?.courseContent && (
				<Tree
					value={item.courseContent}
					className={styles["course-list"]}
					nodeTemplate={nodeTemplate}
				/>
			)}
			{item.items && <ReviewList items={item.items} />}
		</div>
	);
};

export default LectureSectionCard;
