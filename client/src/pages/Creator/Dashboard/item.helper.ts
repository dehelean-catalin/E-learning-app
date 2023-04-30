import { Status } from "data/models/createdLecture.model";

export const itemStatus = (status: Status) => {
	if (status === "Public") return "bg-primary-400";
	return "surface-400";
};

export const itemIcon = (status: Status) => {
	if (status === "Public") return "pi pi-eye";
	if (status === "Private") return "pi pi-eye-slash";
	return "pi pi-file";
};
