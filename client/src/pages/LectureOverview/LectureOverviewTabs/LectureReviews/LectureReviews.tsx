import { FC } from "react";
import { Review } from "../../../../data/models/creatorModel";
import LectureReviewCard from "../LectureReviewCard/LectureReviewCard";
import "./LectureReviews.scss";

const LectureReviews: FC<{ value: Review[] }> = ({ value }) => {
	if (!value.length) return;

	return (
		<>
			<h2 className="title mt-3">Reviews</h2>
			<div className="review-list">
				{value.map((val, index) => (
					<LectureReviewCard key={index} value={val} />
				))}
			</div>
		</>
	);
};

export default LectureReviews;
