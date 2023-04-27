import { ContentChildren } from "data/models/createdLecture.model";
import { formattedDate } from "helpers";
import { classNames } from "primereact/utils";
import { FC, useRef, useState } from "react";
import useDragAndDropContent from "../../hooks/useUploadContent";
import "./ChildrenItem.scss";

const ChildrenItem: FC<{
	subIndex: number;
	index: number;
	arrayHelpers: any;
	value: ContentChildren;
}> = ({ index, arrayHelpers, value, subIndex }) => {
	const { data, label } = value;
	const {
		handleDragStart,
		handleDragEnd,
		handleDragLeave,
		handleDragOver,
		handleDrop,
	} = useDragAndDropContent();
	const [duration, setDuration] = useState<number>(0);
	const videoRef = useRef<HTMLVideoElement>(null);

	const statusClassName = classNames({
		"text-primary": data.status === "Success",
		"font-semibold": true,
	});

	const handleLoadedMetadata = () => {
		setDuration(videoRef.current?.duration || 0);
	};

	const displayedDate = formattedDate(data.date);

	return (
		<div
			className="children-item"
			draggable
			onDragStart={(e) => handleDragStart(e, subIndex, "children")}
			onDragEnd={handleDragEnd}
			onDragOver={handleDragOver}
			onDragLeave={handleDragLeave}
			onDrop={(e) => handleDrop(e, index, "children", subIndex)}
		>
			<i className="pi pi-bars" />
			<video
				muted={false}
				ref={videoRef}
				onLoadedMetadata={handleLoadedMetadata}
			>
				<source src={data?.content} type="video/mp4" />
				<source src={data?.content} type="video/webm" />
				Your browser does not support the video tag.
			</video>
			<table className="flex-1">
				<thead className="h-2rem font-semibold text-color-secondary">
					<tr>
						<td className="w-3">Title</td>
						<td className="w-3">Type</td>
						<td className="w-3">Status</td>
						<td className="w-3">Date</td>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>{label ?? "-"}</td>
						<td>{data.type ?? "-"}</td>
						<td className={statusClassName}>
							{data.status ? (
								<>
									<i className="pi pi-check-circle mr-2" />
									{data.status}
								</>
							) : (
								"-"
							)}
						</td>

						<td>
							{displayedDate !== "Invalid Date" ? (
								<>
									<i className="pi pi-calendar mr-2" />
									{displayedDate}
								</>
							) : (
								"-"
							)}
						</td>
					</tr>
				</tbody>
			</table>
			<i
				className="pi pi-trash align-self-center cursor-pointer mr-2"
				onClick={() => arrayHelpers.remove(subIndex)}
			/>
		</div>
	);
};

export default ChildrenItem;
