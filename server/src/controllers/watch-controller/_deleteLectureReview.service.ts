import { NextFunction, Request, Response } from "express";
import { deleteDoc, doc } from "firebase/firestore";
import db from "../../config/firebase";
import { ValidatedRequest } from "../../models/request";

export const deleteLectureReview = async (
	req: Request<any, any, { message: string; rating: number }>,
	res: Response,
	next: NextFunction
) => {
	const validatedReq = req as ValidatedRequest;
	const { userId } = validatedReq.userData;
	const { id } = req.params;

	const lectureRef = doc(db, `lectures/${id}/reviews`, userId);

	try {
		await deleteDoc(lectureRef);

		res.status(200).json("Success");
	} catch (err) {
		next(err);
	}
};
