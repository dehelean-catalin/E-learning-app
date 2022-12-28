import { Skeleton } from "primereact/skeleton";
import { FC } from "react";
import Divider from "../../common/Divider";
import styles from "./LectureSkeleton.module.scss";

const SKELETONLIST = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const LectureSkeleton: FC = () => {
	return (
		<>
			<div className={styles["filter-list"]}>
				{SKELETONLIST.map((i, k) => (
					<Skeleton key={k} className={styles["filter-card"]} />
				))}
			</div>
			<div className={styles["lecture-list"]}>
				{SKELETONLIST.map((i, k) => (
					<SkeletonCard key={k} />
				))}
			</div>
			<Divider margin="20px" borderWidth="2px" color="#272727" />
			<div className={styles["lecture-list"]}>
				{SKELETONLIST.map((i, k) => (
					<SkeletonCard key={k} />
				))}
			</div>
		</>
	);
};

export default LectureSkeleton;

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
