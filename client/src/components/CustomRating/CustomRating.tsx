import { Rating } from "primereact/rating";
import { FC } from "react";
import styles from "./CustomRating.module.scss";
import { convertToRelativeNumber } from "./helpers/customRating.helper";

type Props = {
	rating: number;
	numberOfRates: number;
	enrolledUsers?: number;
};

export const CustomRating: FC<Props> = ({
	rating,
	numberOfRates,
	enrolledUsers,
}) => {
	if (!numberOfRates) return <>No reviews</>;
	const averageRating = rating / numberOfRates;
	return (
		<div className={styles.rating}>
			<div className={styles["rating-score"]}>{averageRating}</div>
			<Rating value={averageRating} cancel={false} readOnly />
			{numberOfRates && <div> ({convertToRelativeNumber(numberOfRates)})</div>}
			{typeof enrolledUsers !== "undefined" ? (
				<span>{convertToRelativeNumber(enrolledUsers)} students</span>
			) : (
				""
			)}
		</div>
	);
};
