import axios from "axios";
import { Request, Response } from "express";
import { FirebaseError } from "firebase/app";
import { sendPasswordResetEmail, updatePassword } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import db, { auth } from "../config/firebase";
import { LoginWithCutsomProvider } from "../interfaces/auth-interface";
import { ValidatedRequest } from "../models/request";
import { ConnectionItem, UserModel } from "../models/user-model";
import { tryAgainError } from "./../constant";
import { signToken } from "./../helpers/signToken";

export const login = async (req: Request, res: Response) => {
	const { email, device, uid } = req.body;
	try {
		const token = signToken(uid, email);

		const docRef = doc(db, "users", uid);
		const userSnap = await getDoc(docRef);

		if (!userSnap.exists()) {
			throw new Error("User not found");
		}

		const connections = userSnap.get("connections") as ConnectionItem[];

		const loc = await axios.get("https://ipapi.co/json/");
		const location = loc.data.city;

		const filter = connections.filter(
			(con) => con.location === location && con.device === device
		);

		if (!filter.length) {
			connections.push({
				device,
				date: new Date().toISOString(),
				location,
			});
		} else {
			connections.forEach((data) => {
				if (data.device === device && data.location === location) {
					data.date = new Date().toISOString();
				}
			});
		}
		updateDoc(docRef, { connections });

		res.status(200).json(token);
	} catch (err) {
		console.log(err);
		res
			.status(400)
			.json({ code: 400, message: "Try again something went wrong" });
	}
};

export const register: LoginWithCutsomProvider = async (req, res) => {
	try {
		const { email, uid, displayName, device } = req.body;

		const loc = await axios.get("https://ipapi.co/json/");
		const connections = [
			{
				location: loc.data.city,
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
		const token = signToken(uid, email);

		const docRef = doc(db, "users", uid);
		await setDoc(docRef, data);

		res.status(200).json(token);
	} catch (err: any) {
		res
			.status(400)
			.json({ code: 400, message: "Try again something went wrong" });
	}
};

export const forgotPassword = async (req: Request, res: Response) => {
	try {
		if (!req.body?.email) {
			throw new Error("Email is required");
		}
		await sendPasswordResetEmail(auth, req.body.email);
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

export const loginWithProvider: LoginWithCutsomProvider = async (req, res) => {
	try {
		const { email, device, uid, displayName, photoURL } = req.body;

		const token = signToken(uid, email);

		const docRef = doc(db, "users", uid);
		const userSnap = await getDoc(docRef);
		const location = await axios.get("https://ipapi.co/json/");
		const { city } = location.data;

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
				(con) => city === location && con.device === device
			);

			if (!filter.length) {
				connections.push({
					device,
					date: new Date().toISOString(),
					location: city,
				});
			} else {
				connections.forEach((data) => {
					if (data.device === device && city === location) {
						data.date = new Date().toISOString();
					}
				});
			}
			updateDoc(docRef, { connections });
		}

		res.status(200).json(token);
	} catch (err) {
		console.log(err);
		res
			.status(400)
			.json({ code: 400, message: "Try again something went wrong" });
	}
};
