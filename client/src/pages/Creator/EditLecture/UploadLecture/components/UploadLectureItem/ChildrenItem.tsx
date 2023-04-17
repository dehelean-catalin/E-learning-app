import TreeNode from "primereact/treenode";
import { FC } from "react";
import "./ChildrenItem.scss";

const ChildrenItem: FC<{
	index: number;
	arrayHelpers: any;
	data: TreeNode;
}> = ({ index, arrayHelpers, data }) => {
	return (
		<div className="children-item">
			<video controls muted={false}>
				<source src={data.data.content} type="video/mp4" />
				<source src={data.data.content} type="video/webm" />
				Your browser does not support the video tag.
			</video>
			<div className="flex flex-1 justify-content-between">
				<div>
					<h3>{data.label}</h3>
					<p>{data.data.description}</p>
				</div>

				<i
					className="pi pi-trash align-self-center"
					onClick={() => arrayHelpers.remove(index)}
				/>
			</div>
		</div>
	);
};

export default ChildrenItem;
