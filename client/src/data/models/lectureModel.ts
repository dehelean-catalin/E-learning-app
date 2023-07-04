export type BasicLecture = {
	id: string;
	title: string;
	caption: string;
	author: string;
	rating: number;
	numberOfRatings: number;
	enrolledUsers: string[];
	progress: number;
	lastChapter: string;
	lastName: string;
	description?: string;
};
