export type LoginModel = {
	email: string;
	password: string;
	device: string;
};

export type ProviderAuthModel = {
	displayName: string;
	email: string;
	device: string;
	photoURL?: string;
	uid: string;
};
export type RegisterModel = {
	email: string;
	password: string;
	lastName: string;
	firstName: string;
};
