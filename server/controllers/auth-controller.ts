import { UserModel } from "./../models/user-model";
import jwt from "jsonwebtoken";
import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	sendPasswordResetEmail,
	signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";
import { Request, Response } from "express";
import db from "../firebase";
import { doc, setDoc } from "firebase/firestore";

export const login = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;
		const response = await signInWithEmailAndPassword(auth, email, password);
		const { uid } = response.user;
		let token = jwt.sign({ userId: uid, email: email }, "code", {
			expiresIn: `4h`,
		});
		res.status(200).json({
			uid,
			token,
		});
	} catch ({ code }) {
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
			.json({ code: 400, message: "Try again! Something went wrong" });
	}
};

export const register = async (req: Request, res: Response) => {
	try {
		const { email, password, firstName, lastName } = req.body;
		const response = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		);

		const { uid } = response.user;
		const docRef = doc(db, "users", uid);
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
			savedLectures: [],
			watchingLectures: [],
		};
		await setDoc(docRef, data);
		await onAuthStateChanged(auth, (user) => {
			if (user) {
				console.log(user);
			} else {
				console.log("No user found");
			}
		});
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
				.json({ code: "password", message: "Password is too weak" });
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
