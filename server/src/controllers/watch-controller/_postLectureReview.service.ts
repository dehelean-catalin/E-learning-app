import { NextFunction, Request, Response } from "express";
import { doc, setDoc } from "firebase/firestore";
import db from "../../config/firebase";
import { ValidatedRequest } from "../../models/request";

export const postLectureReview = async (
	req: Request<any, any, { message: string; rating: number }>,
	res: Response,
	next: NextFunction
) => {
	const validatedReq = req as ValidatedRequest;
	const { userId } = validatedReq.userData;
	const { id } = req.params;

	const lectureRef = doc(db, `lectures/${id}/reviews`, userId);

	try {
		await setDoc(lectureRef, {
			...req.body,
			authorId: userId,
			date: new Date().toISOString(),
		});

		res.status(200).json("Success");
	} catch (err) {
		next(err);
	}
};
