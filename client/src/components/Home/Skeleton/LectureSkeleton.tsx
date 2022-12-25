import { Skeleton } from "@mui/material";
import { FC } from "react";
import styles from "./LectureSkeleton.module.scss";

const SKELETONLIST = [0, 1, 2, 3, 4, 5, 6, 7];

const LectureSkeleton: FC = () => {
	return (
		<>
			{SKELETONLIST.map((i, k) => (
				<div key={k} className={styles["skeleton-card"]}>
					<Skeleton
						className={styles.image}
						width="100%"
						variant="rectangular"
					/>
					<div className={styles.details}>
						<Skeleton className={styles.field} />
						<Skeleton className={styles.field} />
						<Skeleton className={styles.field} />
					</div>
				</div>
			))}
		</>
	);
};

export default LectureSkeleton;
