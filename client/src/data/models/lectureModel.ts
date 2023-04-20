import TreeNode from "primereact/treenode";
import { Category } from "./createdLecture.model";

export type LectureModel = {
	id: string;
	title: string;
	details: string;
	thumbnail: string;
	description: Description;
	category: Category;
	subCategory: string;
	createdBy: string;
	createdAt: string;
	language: string;
	numberOfUsers: string[];
	items: Item;
	reviews: ReviewList;
};
export type Description = {
	data: string;
};
export type Item = {
	description: string;
	data: TreeNode[];
};
export type ReviewList = {
	description: string;
	data: ReviewItem[];
};

export type ReviewItem = {
	firstName: string;
	lastName: string;
	comment: string;
	rating: number;
	date: Date;
};

export type HistoryModel = {
	id: string;
	title: string;
	thumbnail: string;
	createdBy: string;
	rating: number;
	numberOfRates: number;
	progress: number;
	page: string;
	date: Date;
	chapterName: string;
};
