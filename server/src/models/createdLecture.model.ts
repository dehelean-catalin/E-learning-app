export type CreatedLectureModel = {
	id: string;
	lastUpdate: number;
	publish: Publish;
	content: any;
	goals: PlanFieldModel[];
	requirements: PlanFieldModel[];
};

export type Publish = {
	title: string;
	category: Category;
	description?: string;
	language: string;
	status: Status;
	level?: Level;
	tags?: string[];
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
	None = "",
}
