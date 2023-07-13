import { FC } from "react";
import { CreatedLectureModel, Review } from "../../../data/models/creatorModel";
import LectureArticle from "./LectureArticle/LectureArticle";
import LectureGoals from "./LectureGoals/LectureGoals";
import "./LecturePreview.scss";

type LecturePreviewProps = {
	value: CreatedLectureModel;
	reviews: Review[];
};

const LecturePreview: FC<LecturePreviewProps> = ({ value, reviews }) => {
	const { goals, requirements } = value;

	return (
		<div className="lecture-preview">
			<LectureArticle value={value} reviews={reviews} />
			<LectureGoals goals={goals} requirements={requirements} />
		</div>
	);
};

export default LecturePreview;
