import { Request, RequestHandler, Response } from "express";
import { FirebaseError } from "firebase/app";
import { sendPasswordResetEmail, updatePassword } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import db, { auth } from "../config/firebase";
import { adminAuth } from "../config/firebase-admin";
import { ValidatedRequest } from "../models/request";
import { ConnectionItem, UserModel } from "../models/user-model";
import { tryAgainError } from "./../constant";

export type LoginReq = {
	device: string;
	uid: string;
	city: string;
};

export const login: RequestHandler<any, any, LoginReq> = async (
	req,
	res,
	next
) => {
	const { device, uid, city } = req.body;
	const docRef = doc(db, "users", uid);

	try {
		const userSnap = await getDoc(docRef);
		const connections = userSnap.get("connections") as ConnectionItem[];

		const filter = connections.filter(
			(con) => con.location === city && con.device === device
		);

		if (!filter.length) {
			connections.push({
				device,
				date: new Date().toISOString(),
				location: city,
			});
		} else {
			connections.forEach((data) => {
				if (data.device === device && data.location === city) {
					data.date = new Date().toISOString();
				}
			});
		}

		await updateDoc(docRef, { connections });

		res.status(200).json("Login success");
	} catch (err) {
		console.log(err);
		res
			.status(400)
			.json({ code: 400, message: "Try again something went wrong" });
	}
};

export const register: RequestHandler<
	any,
	any,
	{
		email: string;
		uid: string;
		displayName: string;
		device: string;
		city: string;
	}
> = async (req, res) => {
	const { email, uid, displayName, device, city } = req.body;
	const docRef = doc(db, "users", uid);
	const connections = [
		{
			location: city,
			date: new Date().toISOString(),
			device,
		},
	];
	const data: UserModel = {
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

	try {
		await setDoc(docRef, data);
		res.status(200).json("Register succesfuly");
	} catch (err: any) {
		res
			.status(400)
			.json({ code: 400, message: "Try again something went wrong" });
	}
};

export const forgotPassword: RequestHandler<
	any,
	any,
	{ email: string }
> = async (req, res, next) => {
	try {
		if (!req.body?.email) throw new Error("Email is required");
		const { email } = req.body;

		await sendPasswordResetEmail(auth, email);

		res.status(200).json("Success");
	} catch (err) {
		if (err instanceof FirebaseError) {
			return res.status(400).json({ code: 400, message: "User not found" });
		}
		res.status(400).json({ code: 400, message: tryAgainError });
	}
};

export const changePassword = async (req: any, res: Response) => {
	const validatedReq = req as ValidatedRequest;
	try {
		if (!auth.currentUser) throw new Error("User not found");

		await updatePassword(auth.currentUser, validatedReq.body.newPassword);

		res.status(200).json("Password changed successfully.");
	} catch (err: any) {
		res.status(400).json({ code: 400, message: err.message });
	}
};

export const getConnectionsList = async (req: Request, res: Response) => {
	const validatedReq = req as ValidatedRequest;
	try {
		const userRef = doc(db, "users", validatedReq.userData.userId);
		const userSnap = await getDoc(userRef);
		if (!userSnap.exists()) {
			throw new Error("User not found");
		}
		const connections = userSnap.get("connections");
		res.status(200).json(connections);
	} catch (err: any) {
		res.status(400).json({ code: 400, message: err.message });
	}
};

export const loginWithProvider: RequestHandler<
	any,
	any,
	{
		email: string;
		uid: string;
		displayName: string;
		device: string;
		city: string;
		photoURL: string;
	}
> = async (req, res) => {
	try {
		const { email, device, uid, displayName, photoURL, city } = req.body;

		const docRef = doc(db, "users", uid);
		const userSnap = await getDoc(docRef);

		if (!userSnap.exists()) {
			const connections = [
				{
					location: city,
					date: new Date().toISOString(),
					device,
				},
			];
			const data: UserModel = {
				email,
				displayName,
				phoneNumber: "",
				address: "",
				aboutYou: "",
				profilePicture: photoURL ?? "",
				connections,
				savedLectures: [],
				history: [],
			};
			await setDoc(docRef, data);
		} else {
			const connections = userSnap.get("connections") as ConnectionItem[];

			const filter = connections.filter(
				(con) => city === con.location && con.device === device
			);

			if (!filter.length) {
				connections.push({
					device,
					date: new Date().toISOString(),
					location: city,
				});
			} else {
				connections.forEach((data) => {
					if (data.device === device && city === data.location) {
						data.date = new Date().toISOString();
					}
				});
			}
			updateDoc(docRef, { connections });
		}

		res.status(200).json("Login succesfully");
	} catch (err) {
		console.log(err);
		res
			.status(400)
			.json({ code: 400, message: "Try again something went wrong" });
	}
};

export const deleteUser: RequestHandler = async (req, res, next) => {
	const validatedReq = req as ValidatedRequest;
	const { userId } = validatedReq.userData;

	try {
		await adminAuth.deleteUser(userId);
		res.status(200).json("Success");
	} catch (error) {
		res.json(400).json(tryAgainError);
	}
};
