export type LectureCard = {
	id: string;
	title: string;
	caption: string;
	promoVideo: string;
	author: string;
	rating: number;
	numberOfRatings: number;
	enrolledUsers: number;
	description?: string;
};

export type HistoryModel = {
	id: string;
	title: string;
	thumbnail: string;
	createdBy: string;
	rating: number;
	numberOfRates: number;
	progress: number;
	page: string;
	date: Date;
	chapterName: string;
};
