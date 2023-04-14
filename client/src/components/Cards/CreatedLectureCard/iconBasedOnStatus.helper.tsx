import { AiOutlineFile } from "react-icons/ai";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { Status } from "../../../data/models/createdLecture.model";

export const iconBasedOnStatus = (status: Status): JSX.Element => {
	if (status === "Draft") return <AiOutlineFile />;
	if (status === "Public") return <BsEye />;
	if (status === "Private") return <BsEyeSlash />;
};
