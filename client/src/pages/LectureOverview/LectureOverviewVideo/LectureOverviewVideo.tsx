import { FC, useEffect, useRef, useState } from "react";
import { OnProgressProps } from "react-player/base";
import ReactPlayer from "react-player/lazy";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Content, Publish } from "../../../data/models/creatorModel";
import { VideoProgressItem } from "../../../data/models/usersModel";
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
		if (playerReady)
			playerRef.current.seekTo(
				progress.find((p) => p.id === chapterId).current
			);
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
	}, [chapterId]);

	const handleProgress = async ({ playedSeconds }: OnProgressProps) => {
		if (!playerReady) return;

		await axios
			.put(`lecture/${id}/progress`, {
				chapterId,
				progress: playedSeconds,
			})
			.then((res) => dispatch(ProgressActions.setProgress(res.data)));
	};

	return (
		<div className="lecture-video">
			<ReactPlayer
				ref={playerRef}
				url={contentData?.content}
				controls
				progressInterval={2000}
				onProgress={handleProgress}
				onReady={handleReady}
				playing={false}
				muted={false}
			/>
			<h3>{publish.title}</h3>
			{publish.author}
		</div>
	);
};

export default LectureOverviewVideo;
