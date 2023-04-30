import { Request, Response } from "express";
import { collection, getDocs, query, where } from "firebase/firestore";
import db from "../../config/firebase";
import { tryAgainError } from "../../constant";
import { ValidatedRequest } from "../../models/request";

export const getCreatedLectures = async (req: Request, res: Response) => {
	const validatedReq = req as ValidatedRequest;
	const createdLectureRef = collection(
		db,
		`users/${validatedReq.userData.userId}/createdLectures`
	);
	const lectureRef = collection(db, `lectures`);

	try {
		const snapshot = await getDocs(createdLectureRef);

		const q = query(
			lectureRef,
			where("publish.authorId", "==", validatedReq.userData.userId)
		);

		const lectureSnapshot = await getDocs(q);

		const items = snapshot.docs.map((doc) => doc.data());
		lectureSnapshot.docs.forEach((doc) => items.push(doc.data()));

		res.status(200).json(items.sort((a, b) => b.lastUpdate - a.lastUpdate));
	} catch (err) {
		console.error(err);
		res.status(400).json(tryAgainError);
	}
};
