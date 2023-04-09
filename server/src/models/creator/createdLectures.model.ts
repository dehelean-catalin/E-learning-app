import { ICategory } from "../lecture-model";

export type CreatedLecturesModel = {
	id: string;
	title: string;
	language: string;
	category: ICategory;
	lastUpdate: number;
	status: LectureStatus;
	goals: InputModel[];
	requirements: InputModel[];
};

export type LectureStatus = "Draft" | "Public" | "Private" | "Unlisted";
export type InputModel = {
	value: string;
	placeholder: string;
};
