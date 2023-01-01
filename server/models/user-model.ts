import { TreeNode } from "./lecture-model";

export type UserModel = {
	email: string;
	firstName: string;
	lastName: string;
	phoneNumber: string;
	address: string;
	aboutYou: string;
	profilePicture: string;
	savedLectures: string[];
	watchingLectures: WatchingLectureModel[] | [];
};

export type UserDataModel = Omit<
	UserModel,
	"savedLectures" | "watchingLectures" | "email" | "profilePicture"
>;

export type AppInitModel = Omit<
	UserModel,
	"savedLectures" | "watchingLectures" | "phoneNumber" | "address" | "aboutYou"
>;

export type WatchingLectureModel = {
	id: string;
	lastEntry: LastEntry;
	items: WatchingLectureItem[];
};

export type LastEntry = {
	date: Date;
	time: string;
	page: string;
};

export interface WatchingLectureItem {
	key: string | number;
	label: string;
	children: {
		key: string;
		label: string;
		data: {
			url: string;
			currentProgress: number;
			duration: number;
			confirmedProgress: number;
		};
	}[];
}
