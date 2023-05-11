import Spinner from "components/Spinner/Spinner";
import { useFetchData } from "hooks/useFetchData";
import NotFoundError from "pages/NotFound/NotFoundError/NotFoundError";
import { useParams } from "react-router";
import { getLecture } from "../../data/services/lecture.service";
import { useAxios } from "../../hooks/useAxios";
import "./LectureOverview.scss";
import LectureOverviewChapters from "./LectureOverviewChapters/LectureOverviewChapters";
import LectureOverviewTabs from "./LectureOverviewTabs/LectureOverviewTabs";
import LectureOverviewVideo from "./LectureOverviewVideo/LectureOverviewVideo";

const LectureOverview = () => {
	const axios = useAxios();
	const { id } = useParams();

	const { data, isLoading, isError } = useFetchData("getLectureOverview", () =>
		getLecture(axios, id)
	);

	if (isLoading) return <Spinner />;
	if (isError) return <NotFoundError />;

	return (
		<div className="lecture-overview">
			<LectureOverviewVideo id={id} value={data.content} />
			<LectureOverviewChapters id={id} data={data.content} />
			<LectureOverviewTabs />
		</div>
	);
};

export default LectureOverview;
