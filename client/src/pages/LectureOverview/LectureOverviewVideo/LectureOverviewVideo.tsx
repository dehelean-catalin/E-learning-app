import { FC, useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player/lazy";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import {
	Content,
	Publish,
	VideoProgressItem,
} from "../../../data/models/createdLecture.model";
import { ProgressActions } from "../../../data/redux/ProgressReducer";
import { RootState } from "../../../data/redux/reducers";
import { useAxios } from "../../../hooks/useAxios";
import "./LectureOverviewVideo.scss";
import { getChapterVideoWithProgress } from "./lectureOverview.helper";

type LectureOverviewVideoProps = {
	value: Content[];
	publish: Publish;
};

const LectureOverviewVideo: FC<LectureOverviewVideoProps> = ({
	value,
	publish,
}) => {
	const { chapterId, id } = useParams();
	const axios = useAxios();
	const dispatch = useDispatch();
	const playerRef = useRef<ReactPlayer>(null);

	const progress = useSelector<RootState, VideoProgressItem[]>(
		(s) => s.progressReducer.data
	);

	const [playerReady, setPlayerReady] = useState(false);

	const handleReady = () => setPlayerReady(true);

	const contentData = getChapterVideoWithProgress(value, chapterId);

	useEffect(() => {
		axios.get(`lecture/${id}/progress/${chapterId}`).then((res) => {
			if (playerReady) {
				playerRef.current.seekTo(res.data.current);
			}
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
					const updatedArray = [...progress];
					const index = updatedArray.findIndex((item) => item.id === chapterId);
					updatedArray[index] = {
						id: chapterId,
						current: e.playedSeconds,
						total: e.playedSeconds,
					};
					dispatch(ProgressActions.setProgress(updatedArray));
				}}
				onReady={handleReady}
				playing={false}
			/>

			<h3>{publish.title}</h3>
			{publish.author}
		</div>
	);
};

export default LectureOverviewVideo;
