import axios from "axios";
import { Request, Response } from "express";
import {
	createUserWithEmailAndPassword,
	GoogleAuthProvider,
	sendPasswordResetEmail,
	signInWithEmailAndPassword,
	signInWithPopup,
	updatePassword,
} from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import jwt from "jsonwebtoken";
import db, { auth } from "../config/firebase";
import { ValidatedRequest } from "../models/request";
import { ConnectionItem, UserModel } from "../models/user-model";

export const login = async (req: Request, res: Response) => {
	try {
		const { email, password, device } = req.body;
		const response = await signInWithEmailAndPassword(auth, email, password);
		const token = await response.user.getIdToken();

		const { uid } = response.user;
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

		res.status(200).json({
			uid,
			token,
		});
	} catch (err: any) {
		console.log(err);
		const { code } = err;
		if (
			code === "auth/wrong-password" ||
			code === "auth/invalid-email" ||
			code === "auth/user-not-found"
		) {
			console.log(code);
			return res
				.status(400)
				.json({ code: 400, message: "Invalid email or password" });
		}
		if (code === "auth/too-many-requests") {
			return res.status(400).json({
				code: 400,
				message:
					"Access to this account has been temporarily disabled due to many failed login attempts",
			});
		}
		res
			.status(400)
			.json({ code: 400, message: "Try again something went wrong" });
	}
};

export const register = async (req: Request, res: Response) => {
	try {
		const { email, password, firstName, lastName, device } = req.body;
		const response = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		);
		const loc = await axios.get("https://ipapi.co/json/");

		const { uid } = response.user;
		const docRef = doc(db, "users", uid);
		const connections = [
			{
				location: loc.data.city,
				date: new Date().toISOString(),
				device,
			},
		];
		const data: UserModel = {
			email,
			firstName,
			lastName,
			phoneNumber: "",
			address: "",
			aboutYou: "",
			profilePicture: "",
			bannerPicture: "",
			links: [],
			favoriteTopics: [],
			connections,
			savedLectures: [],
			watchingLectures: [],
		};
		await setDoc(docRef, data);

		const token = await jwt.sign({ userId: uid, email: email }, "code", {
			expiresIn: "4h",
		});
		res.status(200).json({
			uid,
			token,
		});
	} catch (err: any) {
		if (err.code === "auth/weak-password") {
			return res
				.status(400)
				.json({ code: 400, message: "Password is too weak" });
		}
		if (err.code === "auth/invalid-email") {
			return res.status(400).json({ code: 400, message: "Invalid email" });
		}
		if (err.code === "auth/email-already-in-use") {
			return res
				.status(400)
				.json({ code: 400, message: "Email already in use" });
		}
		res.status(400).json({ code: 400, message: err });
	}
};

export const forgotPassword = async (req: Request, res: Response) => {
	try {
		const response = await sendPasswordResetEmail(auth, req.body.email);

		res.status(200).json({
			response,
		});
	} catch (err) {
		res
			.status(400)
			.json({ code: 400, message: "Try again! Something went wrong" });
	}
};

export const changePassword = async (req: any, res: Response) => {
	const validatedReq = req as ValidatedRequest;
	try {
		if (!auth.currentUser) {
			throw new Error("User not found");
		}

		await updatePassword(auth.currentUser, validatedReq.body.newPassword);

		res.status(200).json("Success");
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

export const loginWithGoogle = async (req: Request, res: Response) => {
	const provider = new GoogleAuthProvider();
	try {
		console.log("salut");
		const result = await signInWithPopup(auth, provider);
		const credential = GoogleAuthProvider.credentialFromResult(result);
		if (!credential) {
			return;
		}
		console.log(credential);
		const token = credential.accessToken;
		const user = result.user;

		res.status(200).json("succes");
	} catch (err: any) {
		res.status(400).json({ code: 400, message: err.message });
	}
};
