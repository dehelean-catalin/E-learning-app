import { Category } from "./creator.model";

export type RatingParams = "9g" | "8-9b" | "8u";
export type LangParams = "English" | "French" | "Romanian";
export type DurationParams = "4u" | "4-16b" | "16-40b" | "40g";
export type DateParams = "lh" | "td" | "lw" | "lm" | "ly";

export type QueryFilterParams = {
	rating?: RatingParams;
	language?: LangParams;
	date?: DateParams;
	duration?: DurationParams;
	searchQuery: string;
};

export type LectureCard = {
	id: string;
	title: string;
	caption: string;
	author: string;
	rating: number;
	numberOfRatings: number;
	enrolledUsers: number;
	description?: string;
};

export type SearchCard = LectureCard & {
	category: Category;
	language: LangParams;
	duration: number;
	lastUpdate: number;
};
