import { ProgressSpinner } from "primereact/progressspinner";
import { useParams } from "react-router";
import {
	getLecture,
	getLectureReviews,
} from "../../data/services/lecture.service";
import { useAxios } from "../../hooks/useAxios";
import { useFetchData } from "../../hooks/useFetchData";
import LectureReviewCard from "../LectureOverview/LectureOverviewTabs/LectureReviewCard/LectureReviewCard";
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
				<LecturePreview value={data} reviews={reviews} />
				<LectureContent value={content} />

				<div className="lecture-reviews">
					<h2>Reviews</h2>
					{!!reviews.length ? (
						<>
							<ReviewChart value={reviews} chartClassName="details-chart" />
							{reviews.map((r) => (
								<LectureReviewCard key={r.authorId} value={r} />
							))}
						</>
					) : (
						<h3 className="mx-auto mt-5">No reviews yet</h3>
					)}
				</div>
			</div>
			<VideoDialog />
		</>
	);
};

export default LectureDetails;
