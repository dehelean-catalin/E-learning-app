import { Skeleton } from "primereact/skeleton";
import { FC } from "react";
import styles from "./HomeSkeleton.module.scss";

const SKELETONLIST = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const HomeFilterSkeleton: FC = () => {
	return (
		<>
			<div className={styles["filter-list"]}>
				{SKELETONLIST.map((i, k) => (
					<Skeleton key={k} className={styles["filter-card"]} />
				))}
			</div>
		</>
	);
};

export default HomeFilterSkeleton;
