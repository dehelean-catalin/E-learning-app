import { FC } from "react";
import { useNavigate } from "react-router";
import { CustomRating } from "../../components/common/CustomRating/CustomRating";
import { HistoryModel } from "../../resources/models/lectureModel";
import styles from "./HistoryCard.module.scss";

type Props = {
	value: HistoryModel;
};

const HistoryCard: FC<Props> = ({ value }) => {
	const navigate = useNavigate();
	const { id, thumbnail, title, createdBy, progress } = value;

	return (
		<div className={styles["history-card"]}>
			<div className={styles.thumbnail}>
				<img src={thumbnail} alt="" />
			</div>

			<div className={styles.container}>
				<div className={styles.title}>
					<span>{title}</span>
				</div>
				<div className={styles.author}>{createdBy}</div>

				<CustomRating
					rating={value.rating}
					numberOfRates={value.numberOfRates}
					hideUsers={true}
				/>
			</div>

			<div
				className={styles.hover}
				onClick={() => navigate(`/lecture/${id}/overview?page=${value.page}`)}
			>
				<div>{value.chapterName}</div>
				<span
					style={{
						background: "green",
						width: `${progress}%`,
						height: "4px",
					}}
				></span>
			</div>
		</div>
	);
};

export default HistoryCard;
