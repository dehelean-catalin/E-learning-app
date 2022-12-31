import { AxiosResponse } from "axios";
import TreeNode from "primereact/treenode";
import { FC, useEffect, useRef } from "react";
import ReactPlayer from "react-player/lazy";
import { useParams } from "react-router";
import { useAxios } from "../../resources/axiosInstance";
import video from "../../video.mp4";

type Props = {
	page: string;
};
const LectureOverviewVideo: FC<Props> = ({ page }) => {
	const { id } = useParams();
	const axiosInstance = useAxios();
	const playerRef = useRef(null);
	useEffect(() => {
		axiosInstance
			.get(`/user/watching-lectures/${id}`)
			.then((res: AxiosResponse<any, TreeNode[]>) => {
				let currentProgress = 0;
				res.data.items.map((i: TreeNode) =>
					i.children.map((i) => {
						if (i.key === page) {
							currentProgress = i.data.currentProgress;
						}
					})
				);
				playerRef.current.seekTo(currentProgress, "seconds");
			});
	}, [page]);
	return (
		<ReactPlayer
			ref={playerRef}
			url={video}
			controls={true}
			style={{
				display: "flex",
				flex: "2",
				background: "gray",
			}}
			height="auto"
			width="70%"
			onProgress={(e) => {
				axiosInstance.put(
					`/user/watching-lectures/${id}/time`,
					{ time: e.playedSeconds },
					{
						params: {
							page,
						},
					}
				);
			}}
			playing={false}
		/>
	);
};

export default LectureOverviewVideo;
