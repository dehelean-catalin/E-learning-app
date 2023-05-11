import { useParams } from "react-router";
import Spinner from "../../../components/Spinner/Spinner";
import { getLectureReviews } from "../../../data/services/lecture.service";
import { useAxios } from "../../../hooks/useAxios";
import { useFetchData } from "../../../hooks/useFetchData";
import LectureReviews from "./LectureReviews/LectureReviews";

const LectureOverviewTabs = () => {
	const axios = useAxios();
	const { id } = useParams();

	const { data, isLoading } = useFetchData("getLectureReview", () =>
		getLectureReviews(axios, id)
	);

	if (isLoading) return <Spinner />;

	return (
		<>
			<LectureReviews value={data} />
		</>
	);
};

export default LectureOverviewTabs;
