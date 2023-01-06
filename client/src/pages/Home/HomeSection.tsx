import { FC } from "react";
import Divider from "../../common/Divider";
import LectureList from "../../components/Home/LectureList";
import { LectureModel } from "../../data/models/lectureModel";
import styles from "./Home.module.scss";

type Props = {
	title: string;
	value: LectureModel[];
	showDivider?: boolean;
};
const HomeSection: FC<Props> = ({ value, title, showDivider }) => {
	return (
		<>
			<div className={styles["section-title"]}>{title}</div>
			<div className={styles["lecture-list"]}>
				<LectureList value={value} />
			</div>
			{showDivider && (
				<Divider color="#272727" borderWidth="2px" margin="30px " />
			)}
		</>
	);
};

export default HomeSection;
