import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import AuthContext from "../../store/context/auth-context";
import styles from "./LectureOverview.module.scss";

import ReactPlayer from "react-player/lazy";
import { Axios } from "../../resources/routes";
import video from "../../video.mp4";

const LectureOverview = () => {
	const { id } = useParams();
	const [url, setUrl] = useState(null);
	const [chapter, setChapter] = useState(null);
	const { token } = useContext(AuthContext);
	const search = useLocation().search;
	const page = new URLSearchParams(search).get("page");
	const navigate = useNavigate();

	const playerRef = useRef(null);

	useEffect(() => {
		Axios.get("/watching-lectures", {
			headers: {
				authorization: "Bearer " + token,
			},
			params: {
				id,
				page,
			},
		}).then((res: any) => {
			playerRef.current.seekTo(res.data, "seconds");
		});
	}, [id, page, token]);

	useEffect(() => {
		Axios.get(`/lecture/${id}/overview`, {
			headers: { authorization: "Bearer " + token },
			params: {
				page: page,
			},
		})
			.then((res) => setUrl(res.data))
			.catch((err) => console.log(err.response.data));

		Axios.get(`/lecture/${id}`, {
			headers: { authorization: "Bearer " + token },
		})
			.then((res) => setUrl(res.data))
			.catch((err) => console.log(err.response.data));
	}, [page]);

	useEffect(() => {
		Axios.get(`/lecture/${id}/chapters`, {
			headers: { authorization: "Bearer " + token },
		})
			.then((res) => setChapter(res.data))
			.catch((err) => console.log(err.response.data));
	}, [id, token]);

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
				width="60%"
				onProgress={(e) =>
					Axios.put(
						"/watching-lectures",
						{ value: e.playedSeconds },
						{
							headers: {
								authorization: "Bearer " + token,
							},
							params: {
								id,
								page,
							},
						}
					)
				}
				fallback={<>lala</>}
				playing={false}
			/>
			<div className={styles.content}>
				<span>Lecture content</span>
				{chapter?.map((i) => (
					<div
						className={styles.chapter}
						onClick={() => navigate(`/lecture/${id}/overview?page=${i.page}`)}
					>
						{i.title}
						{playerRef.current.duration}
					</div>
				))}
			</div>
		</div>
	);
};
export default LectureOverview;
