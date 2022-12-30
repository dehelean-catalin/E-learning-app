import { AxiosResponse } from "axios";
import { Tree } from "primereact/tree";
import TreeNode from "primereact/treenode";
import { useEffect, useRef, useState } from "react";
import { BsPlayCircle } from "react-icons/bs";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import ReactPlayer from "react-player/lazy";
import { useLocation, useNavigate, useParams } from "react-router";
import { useAxios } from "../../resources/axiosInstance";
import video from "../../video.mp4";
import styles from "./LectureOverview.module.scss";

const LectureOverview = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const axiosInstance = useAxios();
	const search = useLocation().search;
	const page = new URLSearchParams(search).get("page");
	const playerRef = useRef(null);
	const [data, setData] = useState<TreeNode[]>([]);

	useEffect(() => {
		axiosInstance
			.get(`/user/watching-lectures/${id}`)
			.then((res: AxiosResponse<any, TreeNode[]>) => {
				setData(res.data.items);
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
	}, [id, page]);

	// const currentPage = data?.find((i) => i.page === page);
	const nodeTemplate = (node: TreeNode, options) => {
		let label = <b>{node.label}</b>;

		const getDuration = () => {
			if (node?.children) {
				const value = Math.round(
					node.children.reduce((a, b) => a + b.data.duration, 0) / 60
				);
				if (value >= 60) {
					return { value: Math.round(value / 60), unit: " h" };
				}
				return { value, unit: " min" };
			}
			const value = Math.round(node.data.duration / 60);
			if (value >= 60) {
				return { value: Math.round(value / 60), unit: " h" };
			}
			return { value, unit: " min" };
		};

		return (
			<div className={options.className}>
				<div>
					{node.data &&
					node.data.confirmedProgress >= node.data.duration - 10 ? (
						<MdCheckBox />
					) : (
						<MdCheckBoxOutlineBlank />
					)}
					{label}
				</div>

				<div>
					<BsPlayCircle />
					{getDuration().value + getDuration().unit}
				</div>
			</div>
		);
	};
	const [expandedKeys, setExpandedKeys] = useState({ [page]: true });
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
			<div className={styles.content}>
				<span>Lecture content</span>
				<Tree
					value={data}
					nodeTemplate={nodeTemplate}
					className={styles["course-list"]}
					onNodeClick={(e) => {
						if (!e.node.children && page !== e.node.key) {
							navigate(`/lecture/${id}/overview?page=${e.node.key}`);
						}
					}}
					onToggle={(e) => setExpandedKeys(e.value)}
					expandedKeys={expandedKeys}
				/>
			</div>
		</div>
	);
};
export default LectureOverview;
