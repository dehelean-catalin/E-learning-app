import { AxiosResponse } from "axios";
import TreeNode from "primereact/treenode";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import { useAxios } from "../../resources/axiosInstance";
import styles from "./LectureOverview.module.scss";
import LectureOverviewTree from "./LectureOverviewTree";
import LectureOverviewVideo from "./LectureOverviewVideo";

const LectureOverview = () => {
	const { id } = useParams();
	const axiosInstance = useAxios();
	const search = useLocation().search;
	const page = new URLSearchParams(search).get("page");

	const [data, setData] = useState<TreeNode[]>([]);

	useEffect(() => {
		axiosInstance
			.get(`/user/watching-lectures/${id}`)
			.then((res: AxiosResponse<any, TreeNode[]>) => {
				setData(res.data.items);
			});
	}, [id]);

	return (
		<div className={styles["lecture-overview"]}>
			<LectureOverviewVideo page={page} />
			<LectureOverviewTree data={data} page={page} />
		</div>
	);
};
export default LectureOverview;
