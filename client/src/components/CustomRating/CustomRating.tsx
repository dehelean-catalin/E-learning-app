import { Rating } from "primereact/rating";
import { FC } from "react";
import { Review } from "../../data/models/createdLecture.model";
import styles from "./CustomRating.module.scss";
import { convertToRelativeNumber } from "./helpers/customRating.helper";

type Props = {
	reviews: Review[];
	enrolledUsers?: number;
};

export const CustomRating: FC<Props> = ({ reviews, enrolledUsers }) => {
	if (!reviews.length) return <>No reviews yet</>;

	const rating = reviews.reduce((a, b) => b.rating + a, 0) / reviews.length;

	return (
		<div className={styles.rating}>
			<div className={styles["rating-score"]}>{rating}</div>
			<Rating value={rating / 2} cancel={false} readOnly />
			{reviews.length && <div> ({reviews.length} ratings)</div>}
			{typeof enrolledUsers !== "undefined" ? (
				<span>{convertToRelativeNumber(enrolledUsers)} students</span>
			) : (
				""
			)}
		</div>
	);
};
