import { ICategory } from "../lectureModel";

export type CreatedLecturesModel = {
	id: string;
	title: string;
	language: string;
	category: ICategory;
	lastUpdate: number;
	status: LectureStatus;
	goals: PlanFieldModel[];
	requirements: PlanFieldModel[];
};

export type LectureStatus = "Draft" | "Public" | "Private" | "Unlisted";

export type PlanFieldModel = {
	value: string;
	placeholder: string;
};
