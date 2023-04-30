export type CreatedLectureModel = {
	id: string;
	lastUpdate: number;
	publish: Publish;
	content: Content[];
	goals: PlanFieldModel[];
	requirements: PlanFieldModel[];
	reviews: any[];
	comments: any;
	enrolledUsers: string[];
};

export type Publish = {
	author: string;
	authorId: string;
	title: string;
	description: string;
	category: Category;
	language: Language;
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
	children: ContentChildren[];
};

export type ContentChildren = Omit<Content, "children">;

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
}

export enum Language {
	Romanian = "Romanian",
	English = "English",
	French = "French",
}

export type VideoStatus = "Success" | "Failed";

export enum Status {
	Draft = "Draft",
	Public = "Public",
	Private = "Private",
	Unlisted = "Unlisted",
}
export enum Privacy {
	Public = "Public",
	Private = "Private",
	Unlisted = "Unlisted",
}

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
	author: string;
};
