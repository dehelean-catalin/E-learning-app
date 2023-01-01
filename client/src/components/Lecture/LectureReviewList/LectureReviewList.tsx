import { FC } from "react";
import { ReviewList } from "../../../resources/models/lectureModel";
import Divider from "../../common/Divider";
import LectureReviewCard from "./LectureReviewCard";
import styles from "./LectureReviewList.module.scss";

type Props = {
	value: ReviewList;
};
const LectureReviewList: FC<Props> = ({ value }) => {
	return (
		<div className={styles["review-list"]}>
			<span>Reviews</span>
			<Divider />
			{value.description}
			<div className={styles.list}>
				{value.data.map((value, key) => (
					<LectureReviewCard key={key} value={value} />
				))}
			</div>
		</div>
	);
};

export default LectureReviewList;
