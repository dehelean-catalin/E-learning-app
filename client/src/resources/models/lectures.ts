export interface BasicLecture {
	id: string;
	title: string;
	thumbnail: string;
	createdBy: string;
	rating: number;
	numberOfRates: number;
}
export interface ILecture extends BasicLecture {
	description: string;
	category: ICategory;
	subCategory: string;
	createdAt: string;
	lastUpdate: string;
	numberOfUsers: number;
	numberOfChapters: number;
	totalHours: number;
	language: string;
	items: LectureItem[];
	details?: any[];
}

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
	courseContent?: Capitol[];
	items?: Review[];
};

type Capitol = {
	title: string;
	items: {
		title: string;
		time: string;
	}[];
};

export type Review = {
	firstName: string;
	lastName: string;
	comment: string;
	rating: number;
	date: string;
};
