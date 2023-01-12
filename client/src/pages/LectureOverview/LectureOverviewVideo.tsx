import { FC, useCallback } from "react";
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
	const search = useLocation().search;
	const page = new URLSearchParams(search).get("page");

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
	const ref = useCallback(
		(node) => {
			if (node) {
				node.seekTo(progress, "seconds");
				node.url = url;
			}
		},
		[progress, url]
	);
	return (
		<div className={styles.video}>
			<ReactPlayer
				ref={ref}
				url={url}
				controls
				muted={false}
				style={{
					flex: "1",
				}}
				playing={true}
				height="600px"
				progressInterval={3000}
				onProgress={(e) => handleProgress(e)}
			/>
		</div>
	);
};

export default LectureOverviewVideo;
