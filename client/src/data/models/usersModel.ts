export type UserModel = {
	email: string;
	firstName: string;
	lastName: string;
	phoneNumber: string;
	address: string;
	aboutYou: string;
	profilePicture: string;
	savedLectures: string[];
	watchingLectures: [];
};

export type UserDataModel = Omit<
	UserModel,
	"savedLectures" | "watchingLectures"
>;
export type AcountDataModel = Omit<UserDataModel, "email" | "profilePicture">;
export type HeaderDataModel = Omit<
	UserDataModel,
	"aboutYou" | "phoneNumber" | "address"
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

export interface IMessage {
	roomId?: string;
	message: string;
	userId: string;
	firstName: string;
	avatar: string;
	messageDate: {
		minutes: number;
		hours: number;
		day: string;
	};
}

export interface IAuthContext {
	userId: string;
	token: string;
	isLogin: boolean;
	login: (token: string, userId: string, expirationDate?: Date) => void;
	logout: () => void;
}
