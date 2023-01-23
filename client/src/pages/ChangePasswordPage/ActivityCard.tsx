import { IoLocationOutline } from "react-icons/io5";
import styles from "./ActivityCard.module.scss";
const ActivityCard = () => {
	return (
		<div className={styles["activity-card"]}>
			<IoLocationOutline />
			<div className={styles.content}>
				<div className={styles.title}>Cluj Napoca</div>
				<div>
					<span>Acum</span> S88PRO
				</div>
			</div>
		</div>
	);
};
export default ActivityCard;
