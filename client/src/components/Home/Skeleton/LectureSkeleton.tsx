import { Skeleton } from "primereact/skeleton";
import { FC } from "react";
import styles from "./LectureSkeleton.module.scss";

const SKELETONLIST = [0, 1, 2, 3, 4, 5, 6, 7];

const LectureSkeleton: FC = () => {
	return (
		<>
			{SKELETONLIST.map((i, k) => (
				<SkeletonCard key={k} />
			))}
		</>
	);
};

export default LectureSkeleton;

const SkeletonCard: FC = () => {
	return (
		<div className={styles["skeleton-card"]}>
			<Skeleton className={styles.thumbnail} width="100%" />
			<div className={styles.details}>
				<Skeleton className={styles.circle} shape="circle" />
				<div className={styles.right}>
					<Skeleton className={styles.row} />
					<Skeleton className={styles.row} />
				</div>
			</div>
		</div>
	);
};
