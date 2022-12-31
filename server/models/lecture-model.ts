export type LectureModel = {
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

export interface TreeNode {
	id?: string;
	key?: string | number;
	label?: string;
	data?: any;
	children?: TreeNode[];
}

export type Review = {
	firstName: string;
	lastName: string;
	comment: string;
	rating: number;
	date: string;
};
