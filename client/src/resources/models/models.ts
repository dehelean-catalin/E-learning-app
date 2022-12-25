export interface IUser {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	address: string;
	favoriteTopics: string;
	degree: string;
	institution: string;
	institutionKey: string;
	jobTitle: string;
	profilePicture: string;
	aboutYou: string;
	links: string;
	role: string;
}
export type UserDetails = {
	phone?: string;
	address?: string;
	favoriteTopics?: string;
	degree?: string;
	institution?: string;
	institutionKey?: string;
	jobTitle?: string;
	profilePicture?: Blob | File;
	aboutYou?: string;
	links?: string;
};
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
