export type CreatedLectureModel = {
	id: string;
	lastUpdate: number;
	publish: Publish;
	content: Content[];
	goals: PlanFieldModel[];
	requirements: PlanFieldModel[];
	reviews: Review[];
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
	data: ContentData;
	children: ContentChildren[];
};

export type ContentData = {
	id: string;
	description: string;
	date: string;
	duration: number;
	content: string;
	type: string;
	status: VideoStatus;
};

export type ContentChildren = Omit<Content, "children">;

export type PlanFieldModel = {
	value: string;
	placeholder: string;
};

export type Review = {
	author: string;
	date: string;
	message: string;
	rating: number;
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

export type VideoProgress = {
	lastChapter: string;
	lastDate: string;
	items: VideoProgressItem[];
};

export type VideoProgressItem = { id: string; current: number; total: number };
