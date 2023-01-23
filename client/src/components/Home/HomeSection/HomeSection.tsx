import { FC } from "react";
import Divider from "../../../common/Divider/Divider";
import { LectureModel } from "../../../data/models/lectureModel";
import LectureList from "../LectureList";
import styles from "./HomeSection.module.scss";

type Props = {
	title: string;
	value: LectureModel[];
	showDivider?: boolean;
};
const HomeSection: FC<Props> = ({ value, title, showDivider }) => {
	return (
		<div className={styles["home-section"]}>
			<div className={styles.title}>{title}</div>
			<div className={styles["lecture-list"]}>
				<LectureList value={value} />
			</div>
			{showDivider && (
				<Divider color="#272727" borderWidth="2px" margin="30px " />
			)}
		</div>
	);
};

export default HomeSection;
