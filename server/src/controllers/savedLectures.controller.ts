import { Request, Response } from "express";
import {
	arrayRemove,
	arrayUnion,
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

export const getSavedLectures = async (req: any, res: Response) => {
	const docRef = doc(db, "users", req.userData.userId);

	try {
		const docSnap = await getDoc(docRef);
		if (!docSnap.exists()) throw new Error("This Lecture dont exist");

		const { savedLectures: savedLecturesIds } = docSnap.data();
		if (savedLecturesIds.length) {
			const q = query(
				collection(db, "lectures"),
				where("id", "in", savedLecturesIds)
			);
			const querySnapshot = await getDocs(q);

			const savedLectures = querySnapshot.docs.map((doc) =>
				doc.data()
			) as CreatedLectureModel[];
			res.status(200).json(
				savedLectures.map((s) => ({
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
		res.status(400).json({ code: 400, message: err.message });
	}
};

export const postSavedLecture = async (req: Request, res: Response) => {
	const validatedReq = req as ValidatedRequest;
	const { userId } = validatedReq.userData;
	const { id } = req.params;
	const docRef = doc(db, `users/${userId}`);

	try {
		await updateDoc(docRef, {
			savedLectures: arrayUnion(id),
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
		await updateDoc(docRef, { savedLectures: arrayRemove(id) });
		res.status(200).json("Success");
	} catch (err: any) {
		return res.status(400).json({ code: 400, message: err.message });
	}
};
