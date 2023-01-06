import { FC } from "react";
import styles from "./CustomRating.module.scss";
import { Rating } from "primereact/rating";

type Props = {
	rating: number;
	numberOfRates?: number;
	numberOfUsers?: number;
	hideUsers?: boolean;
};
export const CustomRating: FC<Props> = ({
	rating,
	numberOfUsers = undefined,
	numberOfRates = undefined,
	hideUsers = false,
}) => {
	const getUsers = () => {
		if (hideUsers) return <></>;
		return <div className={styles.users}>{numberOfUsers} students</div>;
	};
	return (
		<div className={styles.rating}>
			<div className={styles["rating-score"]}>{rating}</div>
			<Rating value={rating / 2} cancel={false} readOnly />
			{typeof numberOfRates !== "undefined" && (
				<div> ({numberOfRates} ratings)</div>
			)}
			{getUsers()}
		</div>
	);
};
