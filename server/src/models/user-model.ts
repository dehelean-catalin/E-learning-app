export type UserModel = {
	email: string;
	displayName: string;
	phoneNumber: string;
	address: string;
	aboutYou: string;
	bannerPicture: string;
	profilePicture: string;
	links: LinkModel[] | [];
	favoriteTopics: string[];
	connections: ConnectionItem[];
	savedLectures: string[];
	watchingLectures: WatchingLectureModel[] | [];
	createdLectures: [];
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

export type ConnectionItem = {
	device: string;
	location: string;
	date: string;
};
