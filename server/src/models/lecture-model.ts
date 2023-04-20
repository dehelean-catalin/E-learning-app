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
	createdAt: Date;
	language: Language;
	numberOfUsers: string[];
	items: Item;
	reviews: ReviewList;
};

export type Language = "english" | "french" | "romanian";

export type LectureCardModel = Pick<
	LectureModel,
	"title" | "thumbnail" | "createdBy" | "createdAt" | "id" | "reviews"
>;

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

export interface TreeNode {
	key: string;
	label: string;
	children: TreeChild[];
}
export interface TreeChild {
	key: string;
	label: string;
	data: {
		url: string;
		lastUpdate: Date;
		duration: number;
	};
}
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
	date: string;
	page: string;
	chapterName: string;
};
