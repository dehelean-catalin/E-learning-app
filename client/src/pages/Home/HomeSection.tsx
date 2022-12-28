import { FC } from "react";
import Divider from "../../components/common/Divider";
import LectureList from "../../components/Home/LectureList";
import { BasicLecture } from "../../resources/models/lectures";
import styles from "./Home.module.scss";

type Props = {
	title: string;
	value: BasicLecture[];
	showDivider?: boolean;
};
const HomeSection: FC<Props> = ({ value, title, showDivider }) => {
	return (
		<>
			<div className={styles["section-title"]}>{title}</div>
			<div className={styles["lecture-list"]}>
				<LectureList value={value} />
			</div>
			{showDivider && <Divider color="#272727" borderWidth="2px" />}
		</>
	);
};

export default HomeSection;
