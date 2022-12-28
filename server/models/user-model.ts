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
	items: WatchingLectureItem[];
};
export type WatchingLectureItem = {
	title: string;
	url: string;
	page: string;
	duration: number;
	currentProgress: number;
	confirmedProgress: number;
};
