import TreeNode from "primereact/treenode";

export type CreatedLectureModel = {
	id: string;
	lastUpdate: number;
	publish: Publish;
	content: TreeNode[];
	goals: PlanFieldModel[];
	requirements: PlanFieldModel[];
	reviews: any;
	comments: any;
	enrolledUsers: string[];
};

export type Publish = {
	title: string;
	category: Category;
	language: Language;
	status: Status;
	description: string;
	level?: Level;
	caption?: any;
	promoVideo?: any;
};
export type PlanFieldModel = {
	value: string;
	placeholder: string;
};

export enum Category {
	ALL = "All",
	Design = "Design",
	DataScience = "Data science",
	Web = "Web development",
	Architecture = "Architecture",
	Electronics = "Electronics",
	Psychology = "Psychology",
	History = "History",
	Policy = "Policy",
	None = "",
}

export enum Language {
	Romanian = "Romanian",
	English = "English",
	French = "French",
}

export type Status = "Draft" | "Public" | "Private" | "Unlisted";
export enum Level {
	Beginner = "Beginner",
	Intermediate = "Intermediate",
	Advanced = "Advanced",
	Expert = "Expert",
}
export type CreateLecturePayload = {
	title: string;
	category: Category;
	language: string;
};
