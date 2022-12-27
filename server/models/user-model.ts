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

export type UserDataModel = Omit<UserModel, "savedLectures,watchingLectures">;
