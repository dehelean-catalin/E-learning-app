import { Rating } from "primereact/rating";
import { FC } from "react";
import { Review } from "../../../../data/models/createdLecture.model";
import "./LectureReviewCard.scss";

type Props = Review & { className?: string };

const LectureReviewCard: FC<Props> = ({
	date,
	author,
	message,
	rating,
	className,
}) => {
	return (
		<article className={`review-card ${className ? className : ""}`}>
			<Rating value={rating} cancel={false} readOnly />
			<h3>{author}</h3>
			<i>{message}</i>
		</article>
	);
};

export default LectureReviewCard;
