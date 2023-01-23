import { FC } from "react";
import Divider from "../../../common/Divider/Divider";
import { Description } from "../../../data/models/lectureModel";
import styles from "./LectureDescription.module.scss";
type Props = {
	value: Description;
};
const LectureDescription: FC<Props> = ({ value }) => {
	return (
		<div className={styles["lecture-description"]}>
			<span>Description</span>
			<Divider />
			{value.data}
		</div>
	);
};

export default LectureDescription;
