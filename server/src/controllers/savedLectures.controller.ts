import { Request, Response } from "express";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import db from "../config/firebase";
import { ValidatedRequest } from "../models/request";

export const postSavedLecture = async (req: Request, res: Response) => {
	const validatedReq = req as ValidatedRequest;
	const { userId } = validatedReq.userData;
	const { id } = req.params;
	const docRef = doc(db, `users/${userId}/savedLecture`, id);

	try {
		await updateDoc(docRef, {
			savedLectures: arrayUnion(req.params.id),
		});

		res.status(200).json({ code: 200, message: "Succesfully saved" });
	} catch (err: any) {
		return res.status(400).json({ code: 400, message: err.message });
	}
};

export const deleteSavedLecture = async (req: Request, res: Response) => {
	const validatedReq = req as ValidatedRequest;
	const docRef = doc(db, "users", validatedReq.userData.userId);
	const { id } = req.params;
	try {
		await updateDoc(docRef, { savedLectures: arrayRemove() });
		res.status(200).json("Success");
	} catch (err: any) {
		return res.status(400).json({ code: 400, message: err.message });
	}
};
