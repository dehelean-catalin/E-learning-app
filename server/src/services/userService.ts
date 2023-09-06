import { randomUUID } from "crypto";
import { WriteResult } from "firebase-admin/firestore";
import { adminAuth, firestoreDb, storageDb } from "../config/firebase-admin";
import { HttpError } from "../middleware/tokenAuth";
import {
	AccountData,
	ConnectionItem,
	CreateAccount,
	UserModel,
} from "../models/userModels";

export const getUserByIdData = async (userId: string) => {
	const userRef = firestoreDb.collection("users").doc(userId);
	const userSnap = await userRef.get();
	if (!userSnap.exists) throw new HttpError(404, "User not found");

	const { displayName, profilePicture } = userSnap.data() as AccountData;

	return {
		displayName,
		profilePicture,
	};
};

export const getAccountData = async (userId: string) => {
	const userRef = firestoreDb.collection("users").doc(userId);
	const userSnap = await userRef.get();
	if (!userSnap.exists) throw new Error("This user don't exist");

	const { email, displayName, phoneNumber, profilePicture, aboutYou, address } =
		userSnap.data() as AccountData;

	return {
		email,
		displayName,
		profilePicture,
		phoneNumber,
		address,
		aboutYou,
	};
};

export const createAccountData = async (
	userId: string,
	data: CreateAccount
) => {
	const { email, displayName, device, location } = data;

	const userRef = firestoreDb.collection("users").doc(userId);
	const connections = [
		{
			location,
			date: new Date().toISOString(),
			device,
		},
	];
	const user: UserModel = {
		email,
		displayName,
		phoneNumber: "",
		address: "",
		aboutYou: "",
		profilePicture: "",
		connections,
		savedLectures: [],
		history: [],
	};

	await userRef.set(user);

	return "Regiser succesfuly";
};

export const deleteAccountData = async (userId: string) => {
	const deleteUserPromises: Promise<WriteResult | void | any>[] = [];
	const userRef = firestoreDb.collection("users").doc(userId);
	const [file] = await storageDb.getFiles({
		prefix: `users/${userId}`,
	});

	deleteUserPromises.push(adminAuth.deleteUser(userId));
	deleteUserPromises.push(userRef.delete());

	if (!!file.length)
		file.forEach((file) => {
			deleteUserPromises.push(file.delete());
		});

	await Promise.all(deleteUserPromises);

	return "Succesfully deleted";
};

export const uploadProfilePictureData = async (
	userId: string,
	buffer: Buffer
) => {
	const id = randomUUID();
	const file = storageDb.file(`users/${userId}/${id}`);
	await file.save(buffer);

	const [url] = await file.getSignedUrl({
		action: "read",
		expires: "9999-10-10",
	});

	await firestoreDb
		.collection("users")
		.doc(userId)
		.update({ profilePicture: url });

	return url;
};

export const updateConnectionListData = async (
	userId: string,
	data: Omit<ConnectionItem, "date">
) => {
	const { device, location } = data;
	const usersRef = firestoreDb.collection("users").doc(userId);

	const userSnap = await usersRef.get();
	const connections: ConnectionItem[] = userSnap.get("connections");
	const filter = connections?.find(
		(doc) => doc.location === location && doc.device === device
	);

	if (!filter) {
		connections.push({
			device,
			date: new Date().toISOString(),
			location,
		});
	} else {
		connections.forEach((doc) => {
			if (doc.device === device && doc.location === location) {
				doc.date = new Date().toISOString();
			}
		});
	}

	await usersRef.update({ connections });

	return "Login success";
};
