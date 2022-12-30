import { Request, Response } from "express";
import {
	collection,
	doc,
	getDoc,
	query,
	updateDoc,
	where,
} from "firebase/firestore";
import db from "../firebase";
import { LectureItem, LectureModel } from "../models/lecture-model";
import { ValidatedRequest } from "../models/request";
import { UserModel, WatchingLectureModel } from "../models/user-model";

export const getWatchingLectureList = async (req: Request, res: Response) => {
	try {
		const validatedReq = req as ValidatedRequest;
		const userRef = doc(db, "users", validatedReq.userData.userId);
		const userSnap = await getDoc(userRef);

		if (!userSnap.exists()) {
			throw new Error("Try again! Something went wrong");
		}

		let { watchingLectures } = userSnap.data() as UserModel;
		let loadedIds: string[] = [];
		watchingLectures.map((i: WatchingLectureModel) => loadedIds.push(i.id));
		let loadedLectures: any[] = [];
		for (const key in loadedIds) {
			const lectureRef = doc(db, "lectures", loadedIds[key]);
			const lectureSnap = await getDoc(lectureRef);
			if (!lectureSnap.exists()) {
				throw new Error("Try again! Something went wrong");
			}
			const { thumbnail, createdBy, title, numberOfRates, rating } =
				lectureSnap.data() as LectureModel;
			loadedLectures.push({
				thumbnail,
				createdBy,
				title,
				numberOfRates,
				rating,
			});
		}
		res.status(200).json(loadedLectures);
	} catch (err: any) {
		return res.status(400).json({ code: 400, message: err.message });
	}
};
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
export const addWatchingLecture = async (req: Request, res: Response) => {
	try {
		const validatedReq = req as ValidatedRequest;
		const userRef = doc(db, "users", validatedReq.userData.userId);
		const userSnap = await getDoc(userRef);
		if (!userSnap.exists()) {
			throw new Error("Try again! Something went wrong");
		}

		let watchingLectures = userSnap.get("watchingLectures");

		const lectureRef = doc(db, "lectures", req.params.id);
		const lectureSnap = await getDoc(lectureRef);
		if (!lectureSnap.exists()) {
			throw new Error("Try again! Something went wrong");
		}
		const items = lectureSnap.get("items") as LectureItem[];
		const a = items.find((i) => i.courseContent);
		a?.courseContent &&
			a?.courseContent.forEach((c) => {
				c.children?.forEach((z) => {
					Object.assign(z.data, {
						currentProgress: 0,
						confirmedProgress: 0,
					});
				});
			});

		const id = lectureSnap.get("id") as string;
		if (watchingLectures.find((i: any) => i.id === id)) {
			throw new Error("Lecture is already saved");
		}
		watchingLectures.push({ id, items: a?.courseContent });

		await updateDoc(userRef, {
			watchingLectures,
		});
		res.status(200).json({ code: 200, message: "Succes" });
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

		let watchingLectures = userSnap.get("watchingLectures");
		const lectureRef = doc(db, "users", expReq.userData.userId);
		const docSnap = await getDoc(lectureRef);
		watchingLectures.forEach((i: any) => {
			console.log(i);
			// if (i.id === req.query.id) {
			// 	i.progress.forEach((p: any) => {
			// 		if (p.page == req.query.page) {
			// 			p.value = req.body.value;
			// 		}
			// 	});
			// }
		});

		// await updateDoc(docRef, { watchingLectures: req.body });

		res.status(200).json("succes");
	} catch (err: any) {
		return res.status(400).json({ code: 400, message: err.message });
	}
};
