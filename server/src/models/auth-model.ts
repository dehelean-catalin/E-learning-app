export type LoginModel = {
	city: string;
	uid: string;
	device: string;
};

export type ProviderAuthModel = {
	displayName: string;
	email: string;
	emailVerified?: string;
	photoURL?: string;
	device: string;
	uid: string;
	city?: string;
};
