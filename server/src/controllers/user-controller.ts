import { Request, Response } from "express";
import {
	collection,
	doc,
	getDoc,
	getDocs,
	query,
	where,
} from "firebase/firestore";
import db from "../config/firebase";
import { CreatedLectureModel } from "../models/creator.model";
import { ValidatedRequest } from "../models/request";
import { UserModel } from "../models/user-model";

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
