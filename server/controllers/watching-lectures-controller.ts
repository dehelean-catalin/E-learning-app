import { Request, Response } from "express";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ValidatedRequest } from "../models/request";
import db from "../firebase";

export const getWatchingLectureByID = async (req: Request, res: Response) => {
	try {
		const validatedReq = req as ValidatedRequest;
		const userRef = doc(db, "users", validatedReq.userData.userId);
		const userSnap = await getDoc(userRef);

		if (!userSnap.exists()) {
			throw new Error("Try again! Something went wrong");
		}

		let { watchingLectures } = userSnap.data();
		const value = watchingLectures.find((i: any) => i.id == req.params.id);
		res.status(200).json(value);
	} catch (err: any) {
		return res.status(400).json({ code: 400, message: err.message });
	}
};
export const addWatchingLectures = async (req: Request, res: Response) => {
	try {
		const validatedReq = req as ValidatedRequest;
		const userRef = doc(db, "users", validatedReq.userData.userId);
		const userSnap = await getDoc(userRef);
		if (!userSnap.exists()) {
			throw new Error("Try again! Something went wrong");
		}

		let { watchingLectures } = userSnap.data();

		watchingLectures.push(req.body);

		await updateDoc(userRef, {
			watchingLectures,
		});

		res.status(200).json({ code: 200, message: "Succesfully saved" });
	} catch (err: any) {
		return res.status(400).json({ code: 400, message: err.message });
	}
};

export const updateWatchingLectures = async (req: Request, res: Response) => {
	try {
		const expReq = req as ValidatedRequest;
		const usersRef = doc(db, "users", expReq?.userData.userId);
		const userSnap = await getDoc(usersRef);
		if (!userSnap.exists()) {
			throw new Error("Try again! Something went wrong");
		}

		let { watchingLectures } = userSnap.data();
		const lectureRef = doc(db, "users", expReq.userData.userId);
		const docSnap = await getDoc(lectureRef);
		// watchingLectures.forEach((i: any) => {
		// 	if (i.id === req.query.id) {
		// 		i.progress.forEach((p: any) => {
		// 			if (p.page == req.query.page) {
		// 				p.value = req.body.value;
		// 			}
		// 		});
		// 	}
		// });

		// await updateDoc(docRef, { watchingLectures: req.body });

		res.status(200).json("succes");
	} catch (err: any) {
		return res.status(400).json({ code: 400, message: err.message });
	}
};
