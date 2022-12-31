import React, { FC } from "react";
import { Review } from "../../../resources/models/lectureModel";
import { CustomRating } from "../../common/CustomRating/CustomRating";
import ProfilePicture from "../../common/ProfilePicture/ProfilePicture";
import styles from "./ReviewList.module.scss";
type Props = {
	item: Review;
};

const ReviewCard: FC<Props> = ({ item }) => {
	const { firstName, lastName, rating, comment } = item;
	return (
		<div className={styles.review}>
			<header>
				<ProfilePicture initials={"AC"} />
				<div className={styles.content}>
					<div className={styles.name}>
						<div>{firstName}</div>

						<div>{lastName}</div>
					</div>
					<div>{/* <CustomRating rating={rating} showOnlyStars /> */}</div>
				</div>
			</header>

			<div className={styles.comment}>"{comment}"</div>
		</div>
	);
};

export default ReviewCard;
