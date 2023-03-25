import { ICategory } from "../lecture-model";

export type CreateLecture = {
	title: string;
	language: string;
	category: ICategory;
};
