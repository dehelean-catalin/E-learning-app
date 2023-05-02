import { Skeleton } from "primereact/skeleton";
import Divider from "../../Divider/Divider";
import styles from "./LectureSectionCard.module.scss";

const items = [0, 1];
const LectureSectionSkeleton = () => {
	return (
		<>
			{items.map((i) => (
				<div key={i} className={styles.skeleton}>
					<Skeleton className={styles.title} />
					<Divider margin="10px" />
					<Skeleton className={styles.section} />
				</div>
			))}
		</>
	);
};

export default LectureSectionSkeleton;
