export type CreatedLectureModel = {
	id: string;
	lastUpdate: number;
	publish: Publish;
	content: Content[];
	goals: PlanFieldModel[];
	requirements: PlanFieldModel[];
	reviews: any;
	comments: any;
	enrolledUsers: string[];
};

export type Publish = {
	author: string;
	authorId: string;
	title: string;
	category: Category;
	description?: string;
	language: string;
	status: Status;
	level?: Level;
	caption?: string;
	promoVideo?: string;
};

export type Content = {
	label: string;
	data: {
		description: string;
		date: string;
		duration: number;
		content: string;
		type: string;
		status: VideoStatus;
	};
	children: Omit<Content, "children">[];
};

export type PlanFieldModel = {
	value: string;
	placeholder: string;
};

export type CreateLecturePayload = {
	title: string;
	category: Category;
	language: string;
	author: string;
};

export type Language = "english" | "french" | "romanian";
export type VideoStatus = "Success" | "Failed";
export type Status = "Draft" | "Public" | "Private" | "Unlisted";
export type Level = "Beginner" | "Intermediate" | "Advanced" | "Expert";

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

export type Authorization = "CanEditLecture";
