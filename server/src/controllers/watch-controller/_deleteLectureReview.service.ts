import { NextFunction, Request, Response } from "express";
import { deleteDoc, doc, increment, updateDoc } from "firebase/firestore";
import db from "../../config/firebase";
import { ValidatedRequest } from "../../models/request";

export const deleteLectureReview = async (
	req: Request<any, any, { rating: number }>,
	res: Response,
	next: NextFunction
) => {
	const validatedReq = req as ValidatedRequest;
	const { userId } = validatedReq.userData;
	const { id } = req.params;

	const lectureReviewsRef = doc(db, `lectures/${id}/reviews`, userId);
	const lectureRef = doc(db, `lectures`, id);
	try {
		await deleteDoc(lectureReviewsRef);
		await updateDoc(lectureRef, {
			rating: increment(-req.body.rating),
			numberOfRatings: increment(-1),
		});
		res.status(200).json("Success");
	} catch (err) {
		next(err);
	}
};
