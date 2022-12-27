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

export interface ITeam {
	id: string;
	name: string;
	privacy: string;
	description: string;
	status: string;
	avatar: any;
	roles: Roles;
	requests: string[];
	channels: string[];
}
type Roles = {
	members: string[];
	owners: string[];
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

export interface IOption {
	name: string | null;
	authorized: string;
	isOpened: boolean;
	id: string | null;
}
export interface IAuthContext {
	userId: string;
	token: string;
	isLogin: boolean;
	login: (token: string, userId: string, expirationDate?: Date) => void;
	logout: () => void;
}

export enum ProfileIconSize {
	Small = "small",
	Medium = "medium",
	Large = "large",
}
export interface IProfilePicture {
	picture?: string;
	initials: string;
	size?: ProfileIconSize;
}

export enum BannerNotificationType {
	Info = "info",
	Warning = "warning",
}
