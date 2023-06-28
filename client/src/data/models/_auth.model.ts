export type LoginModel = {
	email: string;
	password: string;
	device: string;
};

export type AuthModel = {
	displayName?: string;
	email?: string;
	device: string;
	photoURL?: string;
	uid: string;
	city?: string;
};
export type RegisterModel = {
	email: string;
	password: string;
	displayName: string;
};
