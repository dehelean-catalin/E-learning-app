export type DashboardLecture = {
	id: string;
	lastUpdate: number;
	publish: Publish;
	rating: number;
	enrolledUsers: string[];
	numberOfRatings: number;
};

export type CreatedLectureModel = DashboardLecture & {
	content: Content[];
	goals: string[];
	requirements: string[];
	duration: number;
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
	s;
	promoVideo?: string;
};
export type Content = {
	label: string;
	data: string;
	children: ContentChildren[];
};

export type ContentData = {
	id: string;
	description: string;
	date: string;
	duration: number;
	content: string;
	track: string;
	type: string;
	status: VideoStatus;
};

export type ContentChildren = {
	label: string;
	data: ContentData;
};

export type Review = {
	authorId: string;
	profilePicture: string;
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
	lastName: string;
	lastDate: string;
	items: VideoProgressItem[];
};

export type VideoProgressItem = { id: string; current: number; total: number };
