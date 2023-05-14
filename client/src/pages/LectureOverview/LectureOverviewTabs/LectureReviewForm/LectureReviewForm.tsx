import { FC } from "react";
import { Review } from "../../../../data/models/createdLecture.model";
import LectureReviewCard from "../LectureReviewCard/LectureReviewCard";
import "./LectureReviewForm.scss";

const LectureReviewForm: FC<{ value: Review }> = ({ value }) => {
	if (!value) return;

	return (
		<div className="review-form">
			<h2>Your feedback</h2>
			<LectureReviewCard value={value} canEdit />
		</div>
	);
};

export default LectureReviewForm;
