import { Request, Response } from "express";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import db from "../firebase";
import { ValidatedRequest } from "../models/request";
import { UserDataModel, UserModel } from "../models/user-model";

export const getUserByID = async (req: Request, res: Response) => {
	try {
		const validatedReq = req as ValidatedRequest;
		const userRef = doc(db, "users", validatedReq.userData.userId);
		const userSnap = await getDoc(userRef);
		if (!userSnap.exists()) {
			throw new Error("This user don't exist");
		}
		const userData = userSnap.data() as UserModel;
		res.status(200).json(userData);
	} catch (err: any) {
		res.status(400).json({ code: 400, message: err.message });
	}
};

export const getUserData = async (req: Request, res: Response) => {
	try {
		const validatedReq = req as ValidatedRequest;
		const userRef = doc(db, "users", validatedReq.userData.userId);
		const userSnap = await getDoc(userRef);
		if (!userSnap.exists()) {
			throw new Error("This user don't exist");
		}
		const userData = userSnap.data() as UserDataModel;
		const { firstName, lastName, phoneNumber, address, aboutYou } = userData;
		res
			.status(200)
			.json({ firstName, lastName, phoneNumber, address, aboutYou });
	} catch (err: any) {
		res.status(400).json({ code: 400, message: err.message });
	}
};

export const addUserData = async (req: any, res: Response) => {
	try {
		const docRef = doc(db, "users", req.userData.userId);
		await setDoc(docRef, req.body);
		res.status(200).json("Succesfully saved");
	} catch (err: any) {
		res.status(400).json({ code: 400, message: err.message });
	}
};

export const updateUserData = async (req: any, res: Response) => {
	try {
		const docRef = doc(db, "users", req.userData.userId);
		await updateDoc(docRef, req.body);
		res.status(200).json("Succesfully saved");
	} catch (err: any) {
		res.status(400).json({ code: 400, message: err.message });
	}
};

export const addUserSavedLecture = async (req: any, res: Response) => {
	try {
		const docRef = doc(db, "users", req.userData.userId);
		const docSnap = await getDoc(docRef);

		if (!docSnap.exists()) {
			throw new Error("Try again! Something went wrong");
		}
		const { savedLectures } = docSnap.data();
		if (savedLectures?.includes(req.body.id)) {
			throw new Error("Lecture is already saved");
		}

		savedLectures.push(req.body.id);

		await updateDoc(docRef, {
			savedLectures,
		});

		res.status(200).json({ code: 200, message: "Succesfully saved" });
	} catch (err: any) {
		return res.status(400).json({ code: 400, message: err.message });
	}
};

export const deleteUserSavedLecture = async (req: any, res: Response) => {
	try {
		const docRef = doc(db, "users", req.userData.userId);
		const docSnap = await getDoc(docRef);
		if (!docSnap.exists()) {
			throw new Error("Try again! Something went wrong");
		}

		let { savedLectures } = docSnap.data();
		savedLectures = savedLectures.filter(
			(lectureId: string) => lectureId !== req.body.id
		);
		await updateDoc(docRef, { savedLectures });
		res.status(200).json(savedLectures);
	} catch (err: any) {
		return res.status(400).json({ code: 400, message: err.message });
	}
};

// export const getAllUserSavedLectures = async (req: any, res: Response) => {
// 	try {
// 		const docRef = doc(db, "users", req.userData.userId);
// 		const docSnap = await getDoc(docRef);
// 		if (!docSnap.exists()) {
// 			throw new Error("Try again! Something went wrong");
// 		}
// 		const { savedLectures } = docSnap.data();
// 		console.log(savedLectures);
// 		res.status(200).json(savedLectures);
// 	} catch (err: any) {
// 		return res.status(400).json({ code: 401, message: err.message });
// 	}
// };
