import TreeNode from "primereact/treenode";
import { FC, useRef, useState } from "react";
import "./ChildrenItem.scss";

const ChildrenItem: FC<{
	index: number;
	arrayHelpers: any;
	data: TreeNode;
}> = ({ index, arrayHelpers, data }) => {
	const [duration, setDuration] = useState<number>(0);
	const videoRef = useRef<HTMLVideoElement>(null);

	const handleLoadedMetadata = () => {
		setDuration(videoRef.current?.duration || 0);
	};
	return (
		<div className="children-item">
			<video
				controls
				muted={false}
				ref={videoRef}
				onLoadedMetadata={handleLoadedMetadata}
			>
				<source src={data.data.content} type="video/mp4" />
				<source src={data.data.content} type="video/webm" />
				Your browser does not support the video tag.
			</video>
			<div className="flex flex-1 justify-content-between">
				<div>
					<h3>{data.label}</h3>
					<p>{data.data.description}</p>
				</div>
				{duration}
				<i
					className="pi pi-trash align-self-center"
					onClick={() => arrayHelpers.remove(index)}
				/>
			</div>
		</div>
	);
};

export default ChildrenItem;
