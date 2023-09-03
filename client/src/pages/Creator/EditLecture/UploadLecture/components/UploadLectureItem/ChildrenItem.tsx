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

	const videoRef = useRef<HTMLVideoElement>(null);

	const statusClassName = classNames({
		"text-primary": status === "Success",
		"font-semibold": true,
	});

	useEffect(() => {
		const video = videoRef.current;
		if (video) video.load();
		console.log(track);
	}, [content]);

	const displayedDate = formattedDate(date);
	const handleLoadedMetadata = () => {
		const video = videoRef.current;

		if (duration === Math.round(video?.duration)) return;
		setFieldValue(
			`content.${index}.children.${subIndex}.data.duration`,
			Math.round(video?.duration) ?? 0
		);
	};

	const [trackUrl, setTrackUrl] = useState("");

	useEffect(() => {
		const fetchVTTFile = async () => {
			try {
				const response = await fetch(track);
				if (!response.ok) {
					throw new Error("Error retrieving VTT file: " + response.status);
				}

				const data = await response.blob();
				const url = URL.createObjectURL(data);

				let trackElement = document.querySelector("track");

				if (!trackElement) trackElement = document.createElement("track");
				trackElement.src = url;
				trackElement.kind = "captions";
				trackElement.srclang = "en";
				trackElement.label = "English";
				trackElement.default = false;

				const videoElement = document.querySelector("video");
				videoElement.appendChild(trackElement);
			} catch (error) {
				console.error(error);
			}
		};

		fetchVTTFile();
		fetch(track)
			.then((response) => {
				if (response.ok) {
					return response.blob();
				} else {
					throw new Error("Error retrieving VTT file: " + response.status);
				}
			})
			.then((data) => {
				const url = URL.createObjectURL(data);
				console.log(url);
				setTrackUrl(url);
			})
			.catch((error) => {
				console.error(error);
			});
	}, [track]);

	const handleDelete = () => {
		arrayHelpers.remove(subIndex);
	};
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
				controls
				muted={false}
				ref={videoRef}
				onLoadedMetadata={handleLoadedMetadata}
			>
				<source src={content} type="video/mp4" />
				<source src={content} type="video/webm" />
				<track
					kind="captions"
					src={trackUrl}
					label="English"
					srcLang="en"
					default
				/>
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
						<td>{type ?? "-"}</td>
						<td className={statusClassName}>
							{status ? (
								<>
									<i className="pi pi-check-circle mr-2" />
									{status}
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
				className="pi pi-trash align-self-center cursor-pointer"
				onClick={handleDelete}
			/>
		</div>
	);
};

export default ChildrenItem;
