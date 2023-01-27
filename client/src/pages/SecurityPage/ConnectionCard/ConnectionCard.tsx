import { FC } from "react";
import { IoLocationOutline } from "react-icons/io5";
import styles from "./ConnectionCard.module.scss";

export type ConnectionItem = {
	device: string;
	location: string;
	date: string;
};

const ConnectionCard: FC<ConnectionItem> = ({ date, device, location }) => {
	return (
		<div className={styles["activity-card"]}>
			<IoLocationOutline fontSize="20px" />
			<div className={styles.content}>
				<div className={styles.title}>{location}</div>
				<div>
					<span>{date.split("T")[0]}</span> - {device}
				</div>
			</div>
		</div>
	);
};
export default ConnectionCard;
