import { FC, useEffect, useRef, useState } from "react";
import { FaUserAltSlash } from "react-icons/fa";
import { OnProgressProps } from "react-player/base";
import ReactPlayer from "react-player/lazy";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import GridCardIcon from "../../../components/Cards/GridCard/GridCardIcon";
import ProfilePicture from "../../../components/ProfilePicture/ProfilePicture";
import Spinner from "../../../components/Spinner/Spinner";
import { useAxios } from "../../../data/hooks/useAxios";
import { useFetchData } from "../../../data/hooks/useFetchData";
import { Content, Publish } from "../../../data/models/creatorModel";
import { VideoProgressItem } from "../../../data/models/usersModel";
import { ProgressActions } from "../../../data/redux/progressReducer";
import { RootState } from "../../../data/redux/store";
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

	const { data, isLoading, isError } = useFetchData("getUserById", async () => {
		return await axios.get(`/user/${publish.authorId}`).then((res) => res.data);
	});

	useEffect(() => {
		if (playerReady)
			playerRef.current.seekTo(
				progress.find((p) => p.id === chapterId)?.current ?? 0
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
		<>
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
			</div>
			<div className="flex justify-content-between">
				<h2>{publish.title}</h2>
				<GridCardIcon id={id} />
			</div>

			{isLoading ? (
				<Spinner />
			) : isError ? (
				<div>
					<ProfilePicture
						initials={publish.author}
						icon={<FaUserAltSlash color="gray" />}
					/>
					{publish.author}
				</div>
			) : (
				<div className="flex gap-2 align-items-center">
					<ProfilePicture
						size="medium"
						initials={data.displayName}
						picture={data.profilePicture}
					/>

					<h3>{data.displayName}</h3>
				</div>
			)}
		</>
	);
};

export default LectureOverviewVideo;
