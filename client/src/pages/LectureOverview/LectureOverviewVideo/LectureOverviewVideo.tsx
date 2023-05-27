import { FC, useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player/lazy";
import { useParams } from "react-router";
import { Content, Publish } from "../../../data/models/createdLecture.model";
import { useAxios } from "../../../hooks/useAxios";
import "./LectureOverviewVideo.scss";
import { getChapterVideoWithProgress } from "./lectureOverview.helper";

type LectureOverviewVideoProps = {
	value: Content[];
	publish: Publish;
	id: string;
};

const LectureOverviewVideo: FC<LectureOverviewVideoProps> = ({
	value,
	publish,
}) => {
	const { chapterId, id } = useParams();
	const axios = useAxios();
	const playerRef = useRef<ReactPlayer>(null);

	const [playerReady, setPlayerReady] = useState(false);

	const handleReady = () => setPlayerReady(true);

	const contentData = getChapterVideoWithProgress(value, chapterId);

	useEffect(() => {
		axios.get(`lecture/${id}/progress/${chapterId}`).then((res) => {
			if (playerReady) playerRef.current.seekTo(res.data.current);
		});
	}, [chapterId, playerReady]);

	useEffect(() => {
		const fetchVTTFile = async () => {
			try {
				const response = await fetch(contentData.track);
				if (!response.ok) {
					throw new Error("Error retrieving VTT file: " + response.status);
				}

				const data = await response.blob();
				const url = URL.createObjectURL(data);

				const trackElement = document.createElement("track");
				trackElement.src = url;
				trackElement.kind = "captions";
				trackElement.srclang = "en";
				trackElement.label = "English";
				trackElement.default = true;

				const videoElement = document.querySelector("video");
				videoElement.appendChild(trackElement);
			} catch (error) {
				console.error(error);
			}
		};

		fetchVTTFile();
	}, [chapterId, contentData.track]);

	return (
		<div className="lecture-video">
			<ReactPlayer
				ref={playerRef}
				url={contentData?.content}
				controls
				progressInterval={5000}
				onProgress={(e) => {
					if (!playerReady) return;
					axios.put(`lecture/${id}/progress`, {
						chapterId,
						progress: e.playedSeconds,
					});
				}}
				onReady={handleReady}
				playing={false}
			/>
			<p>
				<h2>{publish.title}</h2>
				{publish.author}
			</p>
		</div>
	);
};

export default LectureOverviewVideo;
