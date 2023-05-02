import { FC } from "react";
import { CreatedLectureModel } from "../../../data/models/createdLecture.model";
import LectureGoals from "./LectureGoals/LectureGoals";
import LectureHeader from "./LectureHeader/LectureHeader";
import "./LecturePreview.scss";

type LecturePreviewProps = {
	value: CreatedLectureModel;
};

const LecturePreview: FC<LecturePreviewProps> = ({ value }) => {
	const { goals, requirements } = value;
	return (
		<div className="lecture-preview">
			<LectureHeader value={value} />
			<LectureGoals goals={goals} requirements={requirements} />
		</div>
	);
};

export default LecturePreview;
