import {
	Tree,
	TreeExpandedKeysType,
	TreeNodeClickParams,
} from "primereact/tree";
import TreeNode from "primereact/treenode";
import { FC, useCallback } from "react";
import { BsPlayCircle } from "react-icons/bs";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import { useNavigate, useParams } from "react-router";
import { useAxios } from "../../hooks/useAxios";
import styles from "./LectureOverview.module.scss";

type Props = {
	data: TreeNode[];
	page: string;
};
const LectureOverviewTree: FC<Props> = ({ data, page }) => {
	const navigate = useNavigate();
	const { id } = useParams();
	const axios = useAxios();

	const getExpendedKey: () => TreeExpandedKeysType = useCallback(() => {
		let currentKey: TreeExpandedKeysType = {};
		data.forEach((i: TreeNode) =>
			i.children.forEach((o) => {
				if (o.key === page) {
					currentKey = { [i.key]: true };
				}
			})
		);
		return currentKey;
	}, [data, page]);

	const expandedKey = getExpendedKey();

	const nodeTemplate = (node: TreeNode, options) => {
		let label = <b>{node.label}</b>;

		return (
			<div className={options.className}>
				<div style={node.data && node.key === page ? { color: "#16b87f" } : {}}>
					{node.data &&
					node.data.confirmedProgress >= node.data.duration - 8 ? (
						<MdCheckBox />
					) : (
						<MdCheckBoxOutlineBlank />
					)}
					{label}
				</div>

				<div style={node.data && node.key === page ? { color: "#16b87f" } : {}}>
					<BsPlayCircle />
					{getDuration(node)}
				</div>
			</div>
		);
	};
	const onNodeClick = (e: TreeNodeClickParams) => {
		if (!e.node.children && page !== e.node.key) {
			navigate(`/lecture/${id}/overview?page=${e.node.key}`);
			axios.put(`/user/watching-lectures/${id}/last-entry`, {
				date: new Date().toISOString().split("T")[0],
				page: e.node.key,
				time: new Date().toTimeString().split(" ")[0],
			});
		}
	};

	return (
		<div className={styles.content}>
			<span>Lecture content</span>
			{!!expandedKey && (
				<Tree
					value={data}
					nodeTemplate={nodeTemplate}
					className={styles["course-list"]}
					contentClassName={styles.container}
					onNodeClick={(e) => onNodeClick(e)}
					expandedKeys={expandedKey}
				/>
			)}
		</div>
	);
};

export default LectureOverviewTree;

export const getDuration = (node: TreeNode) => {
	if (node?.children) {
		const valueInMin = Math.ceil(
			node.children.reduce((a, b) => Math.round(a) + b.data.duration, 0) / 60
		);

		if (valueInMin >= 60) {
			return valueInMin / 60 + " h";
		}
		return valueInMin + " min";
	}
	const value = Math.round(node.data.duration / 60);
	if (value >= 60) {
		return value / 60 + " h";
	}
	return value + " min";
};
