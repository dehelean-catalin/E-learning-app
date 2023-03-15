import Spinner from "common/Spinner/Spinner";
import { _getWatchingLectures } from "data/services/lectureOverview/_getWatchingLectures";
import { useFetchData } from "hooks/useFetchData";
import NotFoundError from "pages/NotFound/NotFoundError/NotFoundError";
import TreeNode from "primereact/treenode";
import { useState } from "react";
import { useLocation, useParams } from "react-router";
import { useAxios } from "../../config/axiosInstance";
import styles from "./LectureOverview.module.scss";
import LectureOverviewTree from "./LectureOverviewTree";
import LectureOverviewVideo from "./LectureOverviewVideo";

const LectureOverview = () => {
	const { id } = useParams();
	const axios = useAxios();
	const search = useLocation().search;
	const page = new URLSearchParams(search).get("page");
	const [progress, setProgress] = useState({ index: 0, url: "" });

	const onSuccess = (e) => {
		e.map((i: TreeNode) =>
			i.children.map((o) => {
				if (o.key === page) {
					setProgress({
						index: o.data.currentProgress,
						url: o.data.url,
					});
				}
			})
		);
	};

	const { data, isLoading, isError } = useFetchData<TreeNode[]>(
		["watching-lectures", id, page],
		() => _getWatchingLectures(axios, id),
		{
			onSuccess,
		}
	);

	if (isLoading) {
		return <Spinner />;
	}

	if (isError) {
		return <NotFoundError />;
	}

	return (
		<div className={styles["lecture-overview"]}>
			<LectureOverviewVideo url={progress.url} progress={progress.index} />
			{data?.length && <LectureOverviewTree data={data} page={page} />}
		</div>
	);
};
export default LectureOverview;
