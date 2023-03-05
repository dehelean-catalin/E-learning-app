export type LectureModel = {
	id: string;
	title: string;
	details: string;
	thumbnail: string;
	description: Description;
	category: ICategory;
	subCategory: string;
	createdBy: string;
	createdAt: Date;
	language: string;
	numberOfUsers: string[];
	items: Item;
	reviewList: ReviewList;
};

export type LectureCardModel = Pick<
	LectureModel,
	"title" | "thumbnail" | "createdBy" | "createdAt" | "reviewList"
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
export enum ICategory {
	ALL = "all",
	UTCN = "utcn",
	Design = "design",
	DataSience = "dataSience",
	Web = "web",
	Arhitecture = "arhitecture",
	Electronics = "electronics",
	Psychology = "psychology",
	History = "history",
	Policy = "policy",
}
export const FILTERS = [
	ICategory.ALL,
	ICategory.UTCN,
	ICategory.Design,
	ICategory.DataSience,
	ICategory.Web,
	ICategory.Electronics,
	ICategory.Arhitecture,
	ICategory.History,
	ICategory.Psychology,
	ICategory.Policy,
];

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
