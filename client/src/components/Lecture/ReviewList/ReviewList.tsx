import { FC } from "react";
import { Review } from "../../../resources/models/lectures";
import ReviewCard from "./ReviewCard";
import styles from "./ReviewList.module.scss";

type Props = {
	items: Review[];
};
const ReviewList: FC<Props> = ({ items }) => {
	return (
		<div className={styles["review-list"]}>
			{items.map((item, key) => (
				<ReviewCard key={key} item={item} />
			))}
		</div>
	);
};

export default ReviewList;
