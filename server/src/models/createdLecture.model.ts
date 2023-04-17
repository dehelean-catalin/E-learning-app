export type CreatedLectureModel = {
	id: string;
	lastUpdate: number;
	publish: Publish;
	content: any;
	goals: PlanFieldModel[];
	requirements: PlanFieldModel[];
	reviews: any;
	comments: any;
	enrolledUsers: string[];
};

export type Publish = {
	title: string;
	category: Category;
	description?: string;
	language: string;
	status: Status;
	level?: Level;
	caption?: any;
	promoVideo?: any;
};

export type CreateLecturePayload = {
	title: string;
	category: Category;
	language: string;
};

export type Status = "Draft" | "Public" | "Private" | "Unlisted";
export type Level = "Beginner" | "Intermediate" | "Advanced" | "Expert";

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
