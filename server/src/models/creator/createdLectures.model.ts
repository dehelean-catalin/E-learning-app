import { ICategory } from "../lecture-model";

export type CreatedLecturesModel = {
	id: string;
	title: string;
	language: string;
	category: ICategory;
	lastUpdate: number;
	status: LectureStatus;
	plan: {
		goals: {};
		requirements: {};
	};
};

export type LectureStatus = "Draft" | "Public" | "Private" | "Unlisted";
