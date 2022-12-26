import { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import AuthContext from "../../store/context/auth-context";
import styles from "./LectureOverview.module.scss";

import ReactPlayer from "react-player/lazy";
import { Axios } from "../../resources/routes";
import video from "../../video.mp4";
import { ProgressBar } from "primereact/progressbar";
import {
	WatchingLecture,
	WatchingLectureItem,
} from "../../resources/models/watchingLecturesModel";

const LectureOverview = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const search = useLocation().search;
	const page = new URLSearchParams(search).get("page");
	const { token } = useContext(AuthContext);
	const playerRef = useRef(null);
	const [lecture, setLecture] = useState<WatchingLectureItem[]>(null);

	useEffect(() => {
		Axios.get<WatchingLecture>("/watching-lectures", {
			headers: {
				authorization: "Bearer " + token,
			},
			params: {
				id,
			},
		}).then((res) => {
			setLecture(res.data.items);
			let currentPage = lecture?.find((i) => i.page === page);
			playerRef.current.seekTo(currentPage.currentProgress, "seconds");
		});
	}, [id, page, token]);

	const currentPage = lecture?.find((i) => i.page === page);

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
				onProgress={(e) => console.log(e)}
				playing={false}
			/>
			<div className={styles.content}>
				<span>Lecture content</span>
				{lecture?.map((i: WatchingLectureItem) => (
					<div
						key={i.title}
						className={
							i.page === page ? styles["active-chapter"] : styles.chapter
						}
						onClick={() => navigate(`/lecture/${id}/overview?page=${i.page}`)}
					>
						{i.title}

						<ProgressBar
							value={(i.confirmedProgress * 100) / i.duration}
							showValue={false}
						/>
					</div>
				))}
			</div>
		</div>
	);
};
export default LectureOverview;
