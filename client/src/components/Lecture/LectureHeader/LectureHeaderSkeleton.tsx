import { Skeleton } from "primereact/skeleton";
import styles from "./LectureHeader.module.scss";

const LectureHeaderSkeleton = () => {
	return <Skeleton className={styles.skeleton} />;
};

export default LectureHeaderSkeleton;
