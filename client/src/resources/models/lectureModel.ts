import TreeNode from "primereact/treenode";

export type LectureModel = {
	id: string;
	title: string;
	thumbnail: string;
	createdBy: string;
	rating: number;
	numberOfRates: number;
	description: string;
	category: ICategory;
	subCategory: string;
	createdAt: string;
	lastUpdate: string;
	numberOfUsers: string[];
	language: string;
	items: LectureItem[];
};
// export interface ILecture extends BasicLecture {
// 	description: string;
// 	category: ICategory;
// 	subCategory: string;
// 	createdAt: string;
// 	lastUpdate: string;
// 	numberOfUsers: number;
// 	language: string;
// 	items: LectureItem[];
// }

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

export type LectureItem = {
	title: string;
	description: string;
	courseContent?: TreeNode[];
	items?: Review[];
};

export type Review = {
	firstName: string;
	lastName: string;
	comment: string;
	rating: number;
	date: string;
};
