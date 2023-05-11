import { FC } from "react";
import { CreatedLectureModel } from "../../../data/models/createdLecture.model";
import LectureArticle from "./LectureArticle/LectureArticle";
import LectureGoals from "./LectureGoals/LectureGoals";
import "./LecturePreview.scss";

type LecturePreviewProps = {
	value: CreatedLectureModel;
};

const LecturePreview: FC<LecturePreviewProps> = ({ value }) => {
	const { goals, requirements } = value;

	return (
		<div className="lecture-preview">
			<LectureArticle value={value} />
			<LectureGoals goals={goals} requirements={requirements} />
		</div>
	);
};

export default LecturePreview;
