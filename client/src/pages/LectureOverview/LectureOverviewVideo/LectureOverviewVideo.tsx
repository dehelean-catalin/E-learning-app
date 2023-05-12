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

	const handleReady = () => {
		setPlayerReady(true);
	};

	const contentData = getChapterVideoWithProgress(value, chapterId);

	useEffect(() => {
		axios.get(`lecture/${id}/progress/${chapterId}`).then((res) => {
			if (playerReady) playerRef.current.seekTo(res.data.current);
		});
	}, [chapterId, playerReady]);

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
