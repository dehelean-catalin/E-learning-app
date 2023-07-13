import Spinner from "components/Spinner/Spinner";
import { ProgressActions } from "data/redux/progressReducer";
import { useFetchData } from "hooks/useFetchData";
import NotFoundError from "pages/NotFound/NotFoundError/NotFoundError";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import {
	getLecture,
	getLectureProgress,
} from "../../data/services/lectureService";
import { useAxios } from "../../hooks/useAxios";
import "./LectureOverview.scss";
import LectureOverviewChapters from "./LectureOverviewChapters/LectureOverviewChapters";
import LectureOverviewReviews from "./LectureOverviewTabs/LectureOverviewReviews";
import LectureOverviewVideo from "./LectureOverviewVideo/LectureOverviewVideo";

const LectureOverview = () => {
	const axios = useAxios();
	const dispatch = useDispatch();
	const { id } = useParams();

	const { data, isLoading, isError } = useFetchData("getLectureOverview", () =>
		getLecture(axios, id)
	);

	useEffect(() => {
		return () => {
			console.log("hi");
		};
	}, []);

	const { isLoading: isProgressLoading, isError: isProgressError } =
		useFetchData("getLectureProgress", () => getLectureProgress(axios, id), {
			initialData: [],
			onSuccess: (res) => dispatch(ProgressActions.setProgress(res.items)),
		});

	if (isLoading || isProgressLoading) return <Spinner />;
	if (isError || isProgressError) return <NotFoundError />;

	return (
		<div className="lecture-overview">
			<div className="left">
				<LectureOverviewVideo value={data.content} publish={data.publish} />
				<LectureOverviewReviews />
			</div>
			<LectureOverviewChapters id={id} data={data.content} />
		</div>
	);
};

export default LectureOverview;
