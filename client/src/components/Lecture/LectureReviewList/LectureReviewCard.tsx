import { FC } from "react";
import ProfilePicture from "../../../common/ProfilePicture/ProfilePicture";
import { ReviewItem } from "../../../data/models/lectureModel";
import styles from "./LectureReviewList.module.scss";
type Props = {
	value: ReviewItem;
};

const LectureReviewCard: FC<Props> = ({ value }) => {
	const { firstName, lastName, comment, rating } = value;
	return (
		<div className={styles.review}>
			<div className={styles.picture}>
				<ProfilePicture initials={"AC"} />
			</div>

			<div className={styles.content}>
				<div className={styles.name}>
					{firstName} {lastName}
				</div>
				<div>{/* <CustomRating reviews={rating} hideUsers /> */}</div>
			</div>

			<div className={styles.comment}>{comment}</div>
		</div>
	);
};

export default LectureReviewCard;
