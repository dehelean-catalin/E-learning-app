import { formattedDate } from "data/helpers";
import { ContentData, CreatedLectureModel } from "data/models/creatorModel";
import { useFormikContext } from "formik";
import { classNames } from "primereact/utils";
import { FC, useEffect, useRef, useState } from "react";
import useDragAndDropContent from "../../hooks/useUploadContent";
import "./ChildrenItem.scss";

const ChildrenItem: FC<{
	subIndex: number;
	index: number;
	arrayHelpers: any;
	value: {
		label: string;
		data: ContentData;
	};
}> = ({ index, arrayHelpers, value, subIndex }) => {
	const { setFieldValue } = useFormikContext<CreatedLectureModel>();

	const {
		data: { content, status, track, date, duration, type },
		label,
	} = value;

	const {
		handleDragStart,
		handleDragEnd,
		handleDragLeave,
		handleDragOver,
		handleDrop,
	} = useDragAndDropContent();

	const [trackUrl, setTrackUrl] = useState("");

	const videoRef = useRef<HTMLVideoElement>(null);

	const statusClassName = classNames({
		"text-primary": status === "Success",
		"font-semibold": true,
	});

	const displayedDate = formattedDate(date);

	const handleLoadedMetadata = () => {
		const video = videoRef.current;

		if (duration === Math.round(video?.duration)) return;

		setFieldValue(
			`content.${index}.children.${subIndex}.data.duration`,
			Math.round(video?.duration) ?? 0
		);
	};

	const getTrackUrl = async (track) => {
		try {
			const response = await fetch(track);

			if (!response.ok) {
				throw new Error("Error retrieving VTT file: " + response.status);
			}

			const blob = await response.blob();

			setTrackUrl(URL.createObjectURL(blob));
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getTrackUrl(track);
	}, []);

	useEffect(() => {
		const video = videoRef.current;
		if (video) {
			video.load();
		}
	}, [content]);

	function handleDelete() {
		arrayHelpers.remove(subIndex);
	}

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
				controls={true}
				muted={false}
				ref={videoRef}
				onLoadedMetadata={handleLoadedMetadata}
			>
				<source src={content} type="video/mp4" />
				<source src={content} type="video/webm" />
				{trackUrl && (
					<track
						label="English"
						kind="captions"
						src={trackUrl}
						srcLang="en"
						default
					/>
				)}
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
						<td>{type.replace("video/", "") ?? "-"}</td>
						<td className={statusClassName}>{status ?? "-"}</td>

						<td>
							{displayedDate !== "Invalid Date" ? <>{displayedDate}</> : "-"}
						</td>
					</tr>
				</tbody>
			</table>
			<i
				className="pi pi-trash align-self-center cursor-pointer"
				onClick={handleDelete}
			/>
		</div>
	);
};

export default ChildrenItem;
