import Spinner from "common/Spinner/Spinner";
import { useFetchData } from "hooks/useFetchData";
import NotFoundError from "pages/NotFound/NotFoundError/NotFoundError";
import TreeNode from "primereact/treenode";
import { useState } from "react";
import { useLocation, useParams } from "react-router";
import { getWatchingLecture } from "../../data/services/watching.service";
import { useAxios } from "../../hooks/useAxios";
import styles from "./LectureOverview.module.scss";
import LectureOverviewTree from "./LectureOverviewTree";
import LectureOverviewVideo from "./LectureOverviewVideo";

const LectureOverview = () => {
	const axios = useAxios();
	const { id } = useParams();
	const { search } = useLocation();
	const searchParams = new URLSearchParams(search);
	const page = searchParams.get("page");

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

	const { data, isLoading, isError } = useFetchData(
		["watching", id, page],
		() => getWatchingLecture(axios, id),
		{
			onSuccess,
		}
	);

	if (isLoading) return <Spinner />;
	if (isError) return <NotFoundError />;

	return (
		<div className={styles["lecture-overview"]}>
			<LectureOverviewVideo url={progress.url} progress={progress.index} />
			{data?.length && <LectureOverviewTree data={data} page={page} />}
		</div>
	);
};
export default LectureOverview;
