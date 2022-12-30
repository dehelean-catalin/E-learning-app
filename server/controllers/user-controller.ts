import { Request, Response } from "express";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import db from "../firebase";
import { TreeNode } from "../models/lecture-model";
import { ValidatedRequest } from "../models/request";
import {
	UserDataModel,
	UserModel,
	// WatchingLectureItem,
	WatchingLectureModel,
} from "../models/user-model";

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

// export const addUserData = async (req: any, res: Response) => {
// 	try {
// 		const docRef = doc(db, "users", req.userData.userId);
// 		await setDoc(docRef, req.body);
// 		res.status(200).json("Succesfully saved");
// 	} catch (err: any) {
// 		res.status(400).json({ code: 400, message: err.message });
// 	}
// };

export const updateUserData = async (req: Request, res: Response) => {
	try {
		const validatedReq = req as ValidatedRequest;
		const docRef = doc(db, "users", validatedReq.userData.userId);
		await updateDoc(docRef, req.body);
		res.status(200).json("Succesfully saved");
	} catch (err: any) {
		res.status(400).json({ code: 400, message: err.message });
	}
};

export const saveLecture = async (req: Request, res: Response) => {
	try {
		const validatedReq = req as ValidatedRequest;
		const docRef = doc(db, "users", validatedReq.userData.userId);
		const docSnap = await getDoc(docRef);

		if (!docSnap.exists()) {
			throw new Error("Try again! Something went wrong");
		}
		const { savedLectures } = docSnap.data();
		if (savedLectures?.includes(req.params.id)) {
			throw new Error("Lecture is already saved");
		}

		savedLectures.push(req.params.id);

		await updateDoc(docRef, {
			savedLectures,
		});

		res.status(200).json({ code: 200, message: "Succesfully saved" });
	} catch (err: any) {
		return res.status(400).json({ code: 400, message: err.message });
	}
};

export const deleteSavedLecture = async (req: Request, res: Response) => {
	try {
		const validatedReq = req as ValidatedRequest;
		const docRef = doc(db, "users", validatedReq.userData.userId);
		const docSnap = await getDoc(docRef);
		if (!docSnap.exists()) {
			throw new Error("Try again! Something went wrong");
		}

		let { savedLectures } = docSnap.data();
		savedLectures = savedLectures.filter(
			(lectureId: string) => lectureId !== req.params.id
		);
		await updateDoc(docRef, { savedLectures });
		res.status(200).json(savedLectures);
	} catch (err: any) {
		return res.status(400).json({ code: 400, message: err.message });
	}
};

export const updatetWatchingLectureCurrenTime = async (
	req: Request,
	res: Response
) => {
	try {
		const validatedReq = req as ValidatedRequest;
		const userRef = doc(db, "users", validatedReq.userData.userId);
		const userSnap = await getDoc(userRef);
		if (!userSnap.exists()) {
			throw new Error("This Lecture dont exist");
		}
		const watchingLectures = userSnap.get(
			"watchingLectures"
		) as WatchingLectureModel[];

		watchingLectures.forEach((i) => {
			if (i.id === req.params.id) {
				i.items.forEach((p) => {
					p.children?.forEach((c) => {
						if (c.data && c.key === req.query.page) {
							if (req.body.time > c.data.duration) {
								req.body.time = c.data.duration;
							}
							if (req.body.time > c.data.confirmedProgress) {
								c.data.confirmedProgress = req.body.time;
								c.data.currentProgress = c.data.confirmedProgress;
							} else {
								c.data.currentProgress = req.body.time;
							}
						}
					});
				});
			}
		});

		await updateDoc(userRef, { watchingLectures });

		res.status(200).json(watchingLectures);
	} catch (err: any) {
		res.status(400).json({ code: 400, message: err.message });
	}
};

// export const getWatchingLectureUrl = async (req: Request, res: Response) => {
// 	try {
// 		const validatedReq = req as ValidatedRequest;
// 		const userRef = doc(db, "users", validatedReq.userData.userId);
// 		const userSnap = await getDoc(userRef);
// 		if (!userSnap.exists()) {
// 			throw new Error("This Lecture dont exist");
// 		}

// 		res.status(200).json(userSnap);
// 	} catch (err: any) {
// 		res.status(400).json({ code: 400, message: err.message });
// 	}
// };
