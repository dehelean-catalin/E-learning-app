import { Skeleton } from "primereact/skeleton";
import { FC } from "react";
import styles from "./HomeSkeleton.module.scss";

const SKELETONLIST = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 14, 15];

const HomeSkeleton: FC = () => {
	return (
		<>
			<div className={styles["lecture-list"]}>
				{SKELETONLIST.map((k) => (
					<SkeletonCard key={k} />
				))}
			</div>
		</>
	);
};

export default HomeSkeleton;

const SkeletonCard: FC = () => {
	return (
		<div className={styles["skeleton-card"]}>
			<Skeleton className={styles.thumbnail} width="100%" />
			<div className={styles.details}>
				<Skeleton className={styles.circle} />
				<div className={styles.right}>
					<Skeleton className={styles.row} />
					<Skeleton className={styles.row} />
				</div>
			</div>
		</div>
	);
};
