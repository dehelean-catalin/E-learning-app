import { FC, useEffect, useRef } from "react";
import { OnProgressProps } from "react-player/base";
import ReactPlayer from "react-player/lazy";
import { useLocation, useParams } from "react-router";
import { useAxios } from "../../config/axiosInstance";
import styles from "./LectureOverview.module.scss";

type Props = {
	url: string;
	progress: number;
};
const LectureOverviewVideo: FC<Props> = ({ url, progress }) => {
	const { id } = useParams();
	const axiosInstance = useAxios();
	const playerRef = useRef(null);
	const search = useLocation().search;
	const page = new URLSearchParams(search).get("page");

	useEffect(() => {
		playerRef.current.seekTo(progress);
	}, [progress]);

	const handleProgress = (e: OnProgressProps) => {
		axiosInstance.put(
			`/user/watching-lectures/${id}/time`,
			{ time: e.playedSeconds },
			{
				params: {
					page,
				},
			}
		);
	};
	console.log(url);
	return (
		<div className={styles.video}>
			<ReactPlayer
				ref={playerRef}
				url={url}
				controls
				style={{
					flex: "1",
				}}
				muted={false}
				height="600px"
				onProgress={(e) => handleProgress(e)}
				playing={url ? true : false}
				loop
			/>
		</div>
	);
};

export default LectureOverviewVideo;
