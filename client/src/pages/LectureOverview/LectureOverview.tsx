import { useEffect, useRef, useState } from "react";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import { RiVideoLine } from "react-icons/ri";
import ReactPlayer from "react-player/lazy";
import { useLocation, useNavigate, useParams } from "react-router";
import { WatchingLectureItem } from "../../resources/models/watchingLecturesModel";
import { Axios } from "../../resources/routes";
import video from "../../video.mp4";
import styles from "./LectureOverview.module.scss";
import LectureOverviewNavTab from "./LectureOverviewNavTab";

const LectureOverview = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const search = useLocation().search;
	const page = new URLSearchParams(search).get("page");
	const playerRef = useRef(null);
	const [data, setData] = useState([]);

	useEffect(() => {
		Axios.get(`/user/watching-lectures/${id}`).then((res: any) => {
			setData(res.data.items);
			let currentPage = res.data.items.find((i) => i.page === page);
			playerRef.current.seekTo(currentPage.currentProgress, "seconds");
		});
	}, [page, id]);

	// const currentPage = data?.find((i) => i.page === page);

	return (
		<div className={styles["lecture-overview"]}>
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
					Axios.put(
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
			<div className={styles.content}>
				<span>Lecture content</span>
				{data?.map((i: WatchingLectureItem) => (
					<LectureOverviewNavTab key={i.title} value={i} id={id} page={page} />
				))}
			</div>
		</div>
	);
};
export default LectureOverview;
