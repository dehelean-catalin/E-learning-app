import React, { FC } from "react";
import { Description } from "../../../resources/models/lectureModel";
import Divider from "../../common/Divider";
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
