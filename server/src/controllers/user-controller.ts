import { NextFunction, Request, Response } from "express";
import {
	collection,
	doc,
	getDoc,
	getDocs,
	query,
	updateDoc,
	where,
} from "firebase/firestore";
import db from "../config/firebase";
import { CreatedLectureModel } from "../models/creator.model";
import { ValidatedRequest } from "../models/request";
import { UserModel, WatchingLectureModel } from "../models/user-model";

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

export const updateWatchingLectureLastEntry = async (
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
				i.lastEntry = req.body;
			}
		});

		await updateDoc(userRef, { watchingLectures });

		res.status(200).json({ code: 200, message: "Success" });
	} catch (err: any) {
		res.status(400).json({ code: 400, message: err.message });
	}
};

export const getHistoryLectureList = async (req: Request, res: Response) => {
	const validatedReq = req as ValidatedRequest;
	const userRef = doc(db, "users", validatedReq.userData.userId);

	try {
		const userSnap = await getDoc(userRef);

		if (!userSnap.exists()) throw new Error("This user don't exists");

		const { history: historyIds } = userSnap.data();

		if (historyIds.length) {
			const q = query(
				collection(db, "lectures"),
				where("id", "in", historyIds)
			);
			const querySnapshot = await getDocs(q);

			const queryPSnapshot = await getDocs(q);

			const historyLectures = querySnapshot.docs.map((doc) =>
				doc.data()
			) as CreatedLectureModel[];

			res.status(200).json(
				historyLectures.map((s) => ({
					id: s.id,
					title: s.publish.title,
					description: s.publish.description,
					caption: s.publish.caption,
					promoVideo: s.publish.promoVideo,
					author: s.publish.author,
					rating: s.rating,
					numberOfRatings: s.numberOfRatings,
					enrolledUsers: s.enrolledUsers,
				}))
			);
		} else {
			res.status(200).json([]);
		}
	} catch (err: any) {
		return res.status(400).json({ code: 400, message: err.message });
	}
};

export const getLastChapter = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const validatedReq = req as ValidatedRequest;
	const { id } = req.params;
	const { userId } = validatedReq.userData;

	try {
		const lectureRef = doc(db, `lectures/${id}/enrolledUsers`, userId);

		const lectureSnap = await getDoc(lectureRef);
		if (!lectureSnap.exists()) throw new Error("Something went wrong");

		res.status(200).json(lectureSnap.get("lastChapter"));
	} catch (err: any) {
		next(err);
	}
};
