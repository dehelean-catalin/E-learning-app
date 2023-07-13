export type UserModel = {
	email: string;
	displayName: string;
	phoneNumber: string;
	address: string;
	aboutYou: string;
	profilePicture: string;
	connections: ConnectionItem[];
	savedLectures: string[];
	history: HistoryModel[];
};

export type ConnectionItem = {
	device: string;
	location: string;
	date: string;
};

export type HistoryModel = {
	id: string;
	videoProgress: VideoProgress;
};

export type VideoProgress = {
	lastChapter: string;
	lastDate: string;
	lastName: string;
	items: VideoProgressItem[];
};

export type VideoProgressItem = { id: string; current: number; total: number };

export type AccountData = Omit<
	UserModel,
	"savedLectures" | "history" | "connections"
>;

export type CreateAccount = {
	displayName: string;
	email: string;
	device: string;
	location: string;
};

export interface ProviderAccount extends CreateAccount {
	photoURL: string;
}

export type AuthModel = {
	displayName: string;
	email: string;
	device: string;
	photoURL?: string;
	uid?: string;
	location: string;
};
export type LoginModel = {
	email: string;
	password: string;
	device: string;
};
