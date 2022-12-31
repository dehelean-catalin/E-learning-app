import { FC } from "react";
import { LectureItem } from "../../../resources/models/lectureModel";
import LectureSectionCard from "./LectureSectionCard";

type Props = {
	items: LectureItem[];
	className: string;
};

const LectureSectionList: FC<Props> = ({ items, className }) => {
	return (
		<div className={className}>
			{items &&
				items.map((item) => (
					<LectureSectionCard key={item.title} item={item} />
				))}
		</div>
	);
};

export default LectureSectionList;
