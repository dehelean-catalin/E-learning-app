export type RatingParams = "9g" | "8-9b" | "8u";
export type LangParams = "English" | "French" | "Romanian";
export type DurationParams = "4u" | "4-16b" | "16-40b" | "40g";
export type DateParams = "lh" | "td" | "lw" | "lm" | "ly";

export type QueryFilterParams = {
	searchQuery?: string;
	rating?: RatingParams;
	language?: LangParams;
	date?: DateParams;
	duration?: DurationParams;
};
