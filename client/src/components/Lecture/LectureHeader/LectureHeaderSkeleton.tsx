import { Skeleton } from "primereact/skeleton";
import styles from "./LectureHeader.module.scss";

const LectureHeaderSkeleton = () => {
	return (
		<div className={styles["lecture-header"]}>
			<Skeleton className={styles.skeleton} />
		</div>
	);
};

export default LectureHeaderSkeleton;
