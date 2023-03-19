import { ICategory } from "../lectureModel";

export type CreateLecture = {
	title: string;
	language: string;
	category: ICategory;
};
