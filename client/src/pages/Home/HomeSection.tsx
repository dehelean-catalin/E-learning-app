import { FC } from "react";
import Divider from "../../components/common/Divider";
import LectureList from "../../components/Home/LectureCard/LectureList";
import LectureSkeleton from "../../components/Home/Skeleton/LectureSkeleton";
import { BasicLecture } from "../../resources/models/lectures";
import styles from "./Home.module.scss";

type Props = {
	title: string;
	value: BasicLecture[];
	isLoading: boolean;
	showDivider?: boolean;
};
const HomeSection: FC<Props> = ({ isLoading, value, title, showDivider }) => {
	const getLoadedLectures = () => {
		if (isLoading) return <LectureSkeleton />;
		return <LectureList value={value} />;
	};
	return (
		<>
			<div className={styles["section-title"]}>{title}</div>
			<div className={styles["lecture-list"]}>{getLoadedLectures()}</div>
			{showDivider && <Divider color="#272727" borderWidth="2px" />}
		</>
	);
};

export default HomeSection;
