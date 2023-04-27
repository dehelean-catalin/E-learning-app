import { Status } from "data/models/createdLecture.model";

export const itemStatus = (status: Status) => {
	if (status === "Public") return "bg-primary-400";
	return "surface-400";
};
