export type UserModel = {
	email: string;
	firstName: string;
	lastName: string;
	phoneNumber: string;
	address: string;
	aboutYou: string;
	bannerPicture: string;
	profilePicture: string;
	links: LinkModel[] | [];
	favoriteTopics: string[];
	savedLectures: string[];
	watchingLectures: WatchingLectureModel[] | [];
};

export type UserDataModel = Omit<
	UserModel,
	"savedLectures" | "watchingLectures"
>;
export type LinkModel = {
	name: string;
	link: string;
};
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
