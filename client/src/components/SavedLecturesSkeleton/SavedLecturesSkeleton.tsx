import { Skeleton } from "primereact/skeleton";
import styles from "./SavedLecturesSkeleton.module.scss";

const SavedLecturesSkeleton = () => {
	const arrayList = new Array(5).fill("0");
	return (
		<div className={styles["saved-lectures-skeleton"]}>
			<Skeleton />
			{arrayList.map((i, k) => (
				<Skeleton key={k} />
			))}
		</div>
	);
};

export default SavedLecturesSkeleton;
