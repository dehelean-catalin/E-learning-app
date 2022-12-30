import { FC } from "react";
import styles from "./CustomRating.module.scss";
import { Rating } from "primereact/rating";

type Props = {
	rating: number;
	numberOfRates?: number;
	numberOfUsers?: number;
	showOnlyStars?: boolean;
};
export const CustomRating: FC<Props> = ({
	rating,
	numberOfRates,
	numberOfUsers,
	showOnlyStars,
}) => {
	return (
		<div className={styles.rating}>
			{!showOnlyStars && <div className={styles["rating-score"]}>{rating}</div>}
			<Rating value={rating / 2} cancel={false} readOnly />
			{/* <Rating
				className={styles.stars}
				value={rating / 2}
				precision={0.1}
				icon={<StarIcon fontSize="inherit" className={styles.star} />}
				emptyIcon={
					<StarBorderIcon fontSize="inherit" className={styles.emptyStar} />
				}
				size={"small"}
				readOnly
			/> */}
			{!showOnlyStars && `(${numberOfRates} ratings)`}
			{numberOfUsers && (
				<div className={styles.users}>,{numberOfUsers} students</div>
			)}
		</div>
	);
};
