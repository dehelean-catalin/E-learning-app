import { AiOutlineFile } from "react-icons/ai";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { LectureStatus } from "../../../data/models/creator/createdLectures.model";

export const iconBasedOnStatus = (status: LectureStatus): JSX.Element => {
	if (status === "Draft") return <AiOutlineFile />;
	if (status === "Public") return <BsEye />;
	if (status === "Private") return <BsEyeSlash />;
};
