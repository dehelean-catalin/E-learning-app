import Spinner from "components/Spinner/Spinner";
import { useFetchData } from "data/hooks/useFetchData";
import { ProgressActions } from "data/redux/progressReducer";
import NotFoundError from "pages/NotFound/NotFoundError/NotFoundError";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { useAxios } from "../../data/hooks/useAxios";
import {
	getLecture,
	getLectureProgress,
} from "../../data/services/lectureService";
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

	const {
		data: progress,
		isLoading: isProgressLoading,
		isError: isProgressError,
	} = useFetchData("getLectureProgress", () => getLectureProgress(axios, id), {
		onSuccess: (res) => {
			if (!!res.items) {
				dispatch(ProgressActions.setProgress(res.items));
			}
		},
	});

	if (isLoading) return <Spinner />;
	if (isProgressLoading) return <Spinner />;

	if (isError || isProgressError) return <NotFoundError />;
	if (!progress) return <>Not authorized</>;

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
