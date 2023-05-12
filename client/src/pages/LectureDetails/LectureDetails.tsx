import { ProgressSpinner } from "primereact/progressspinner";
import { useParams } from "react-router";
import {
	getLecture,
	getLectureReviews,
} from "../../data/services/lecture.service";
import { useAxios } from "../../hooks/useAxios";
import { useFetchData } from "../../hooks/useFetchData";
import ReviewChart from "../LectureOverview/ReviewChart/ReviewChart";
import NotFoundError from "../NotFound/NotFoundError/NotFoundError";
import LectureContent from "./LectureContent/LectureContent";
import "./LectureDetails.scss";
import LecturePreview from "./LecturePreview/LecturePreview";
import VideoDialog from "./VideoDialog/VideoDialog";

const LectureDetails = () => {
	const { id } = useParams();
	const axios = useAxios();
	const { data, isLoading, isError } = useFetchData("get-lecture", () =>
		getLecture(axios, id)
	);
	const { data: reviews, isLoading: isReviewLoading } = useFetchData(
		"getLectureReviews",
		() => getLectureReviews(axios, id)
	);

	if (isLoading || isReviewLoading)
		return (
			<div className="lecture-details-spinner">
				<ProgressSpinner />
			</div>
		);

	if (isError) return <NotFoundError />;

	const { content } = data;

	return (
		<>
			<div className="lecture-details">
				<LecturePreview value={data} />
				<LectureContent value={content} />

				<div className="flex-1">
					<h2>Reviews</h2>
					<ReviewChart value={reviews} />
				</div>
			</div>
			<VideoDialog />
		</>
	);
};

export default LectureDetails;
