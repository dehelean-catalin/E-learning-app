import { NextFunction, Request, Response } from "express";
import { doc, getDoc } from "firebase/firestore";
import db from "../../config/firebase";
import { ValidatedRequest } from "../../models/request";

export const getWatchingLecture = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const validatedReq = req as ValidatedRequest;
	const { userId } = validatedReq.userData;
	const { id } = req.params;

	const userRef = doc(db, `users/${userId}/watching`, id);

	try {
		const userSnap = await getDoc(userRef);

		if (!userSnap.exists()) throw new Error("Try again! Something went wrong");

		res.status(200).json(userSnap.get("content"));
	} catch (err) {
		next(err);
	}
};
