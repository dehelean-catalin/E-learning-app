import { NextFunction, Request, Response } from "express";
import { arrayUnion, doc, setDoc, updateDoc } from "firebase/firestore";
import db from "../../config/firebase";
import { ValidatedRequest } from "../../models/request";

export const postWatchingLecture = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const validatedReq = req as ValidatedRequest;
	const { userId } = validatedReq.userData;
	const { id } = req.params;

	const userRef = doc(db, `users/${userId}/watching`, id);

	const lectureRef = doc(db, `lectures/${id}`);

	try {
		await updateDoc(lectureRef, { enrolledUsers: arrayUnion(userId) });
		await setDoc(userRef, {
			lastView: {
				page: 0,
				date: new Date().toLocaleString(),
			},
			content: req.body,
		});

		res.status(200).json("Successfully enrolled");
	} catch (err) {
		next(err);
	}
};
