import { FC } from "react";
import { Review } from "../../../../data/models/createdLecture.model";
import LectureReviewCard from "../LectureReviewCard/LectureReviewCard";
import "./LectureReviews.scss";

const LectureReviews: FC<{ value: Review[] }> = ({ value }) => {
	return (
		<div className="review-list">
			{value.map((val, index) => (
				<LectureReviewCard key={index} value={val} />
			))}
		</div>
	);
};

export default LectureReviews;
