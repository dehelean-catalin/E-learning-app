import { RequestHandler } from "express";
import { firestoreDb } from "../config/firebase-admin";
import { FileRequest, ValidatedRequest } from "../models/genericModels";
import {
	AccountData,
	ConnectionItem,
	CreateAccount,
	ProviderAccount,
} from "../models/userModels";
import {
	createAccountData,
	deleteAccountData,
	getAccountData,
	updateConnectionListData,
	uploadProfilePictureData,
} from "../services/userService";

export const getAccount: RequestHandler = async (req, res) => {
	const validatedReq = req as ValidatedRequest;
	const { userId } = validatedReq.userData;

	try {
		const data = await getAccountData(userId);
		res.status(200).json(data);
	} catch (err: any) {
		res.status(200).json({ code: 400, message: err.message });
	}
};

export const createAccount: RequestHandler<any, any, CreateAccount> = async (
	req,
	res
) => {
	const validatedReq = req as ValidatedRequest;
	const { userId } = validatedReq.userData;

	try {
		const data = await createAccountData(userId, req.body);
		res.status(200).json(data);
	} catch (err: any) {
		res.status(400).json({ code: 400, message: err.message });
	}
};

export const updateAccount: RequestHandler<
	any,
	any,
	Omit<AccountData, "email" | "profilePicture">
> = async (req, res) => {
	const validatedReq = req as ValidatedRequest;
	const { userId } = validatedReq.userData;

	try {
		const userRef = firestoreDb.collection("users").doc(userId);
		await userRef.update(req.body);

		res.status(200).json("Succesfully saved");
	} catch (err: any) {
		res.status(400).json({ code: 400, message: err.message });
	}
};

export const deleteAccount: RequestHandler = async (req, res) => {
	const validatedReq = req as ValidatedRequest;
	const { userId } = validatedReq.userData;

	try {
		const data = await deleteAccountData(userId);

		res.status(200).json(data);
	} catch (err: any) {
		res.status(400).json({ code: 400, message: err.message });
	}
};

export const uploadProfilePicture: RequestHandler = async (req, res, next) => {
	const fileReq = req as FileRequest;
	const { userId } = fileReq.userData;
	const { buffer } = fileReq.file;

	try {
		const url = await uploadProfilePictureData(userId, buffer);

		res.status(200).json(url);
	} catch (err: any) {
		res.status(400).json({ code: 400, message: err.message });
	}
};

export const getConnectionList: RequestHandler = async (req, res) => {
	const validatedReq = req as ValidatedRequest;
	const { userId } = validatedReq.userData;

	try {
		const userRef = firestoreDb.collection("users").doc(userId);
		const userSnap = await userRef.get();
		if (!userSnap.exists) throw new Error("User not found");

		const connections = userSnap.get("connections");
		res.status(200).json(connections);
	} catch (err: any) {
		res.status(400).json({ code: 400, message: err.message });
	}
};

export const updateConnectionList: RequestHandler<
	any,
	any,
	Omit<ConnectionItem, "date">
> = async (req, res) => {
	const validatedReq = req as ValidatedRequest;
	const { userId } = validatedReq.userData;

	try {
		const data = await updateConnectionListData(userId, req.body);
		res.status(200).json(data);
	} catch (err: any) {
		console.log(err);
		res.status(400).json({ code: 400, message: err.message });
	}
};

export const loginWithProvider: RequestHandler<
	any,
	any,
	ProviderAccount
> = async (req, res) => {
	const validatedReq = req as ValidatedRequest;
	const { userId } = validatedReq.userData;

	try {
		const useRef = firestoreDb.collection("users").doc(userId);
		const userSnap = await useRef.get();

		if (!userSnap.exists) {
			await createAccountData(userId, req.body);
		} else {
			const { device, location } = req.body;
			await updateConnectionListData(userId, { device, location });
		}

		res.status(200).json("Login succesfully");
	} catch (err: any) {
		res.status(400).json({ code: 400, message: err.message });
	}
};
