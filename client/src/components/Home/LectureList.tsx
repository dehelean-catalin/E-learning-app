import { FC } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { LectureModel } from "../../data/models/lectureModel";
import LectureCard from "../../common/LectureCard/LectureCard";
type Props = {
	value: LectureModel[];
};
const LectureList: FC<Props> = ({ value }) => {
	return (
		<>
			{value.map((lecture, key) => (
				<LectureCard
					key={key}
					value={lecture}
					icon={<BiDotsVerticalRounded size="24px" />}
				/>
			))}
		</>
	);
};

export default LectureList;
