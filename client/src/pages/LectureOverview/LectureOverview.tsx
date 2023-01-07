import { AxiosResponse } from "axios";
import TreeNode from "primereact/treenode";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import { useAxios } from "../../config/axiosInstance";
import styles from "./LectureOverview.module.scss";
import LectureOverviewTree from "./LectureOverviewTree";
import LectureOverviewVideo from "./LectureOverviewVideo";

const LectureOverview = () => {
	const { id } = useParams();
	const axiosInstance = useAxios();
	const search = useLocation().search;
	const page = new URLSearchParams(search).get("page");
	const [progress, setProgress] = useState({ index: 0, url: "" });
	const [data, setData] = useState<TreeNode[]>([]);
	useEffect(() => {
		axiosInstance
			.get(`/user/watching-lectures/${id}`)
			.then((res: AxiosResponse<any, TreeNode[]>) => {
				setData(res.data.items);
				res.data.items.map((i: TreeNode) =>
					i.children.map((o) => {
						if (o.key === page) {
							setProgress({
								index: o.data.currentProgress,
								url: o.data.url,
							});
						}
					})
				);
			});
	}, [id, page]);

	return (
		<div className={styles["lecture-overview"]}>
			<LectureOverviewVideo url={progress.url} progress={progress.index} />
			<LectureOverviewTree data={data} page={page} />
		</div>
	);
};
export default LectureOverview;
