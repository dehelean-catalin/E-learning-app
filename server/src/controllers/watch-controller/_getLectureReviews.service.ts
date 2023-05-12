import { NextFunction, Request, Response } from "express";
import { collection, getDocs } from "firebase/firestore";
import db from "../../config/firebase";
import { Review } from "../../models/creator.model";
import { ValidatedRequest } from "../../models/request";

export const getLectureReviews = async (
	req: Request,
	res: Response<Review[]>,
	next: NextFunction
) => {
	const validatedReq = req as ValidatedRequest;
	const { userId } = validatedReq.userData;
	const { id } = req.params;

	try {
		const docSnap = await getDocs(collection(db, `lectures/${id}/reviews`));
		const reviews: Review[] = [];
		const yourReview: Review[] = [];

		docSnap.forEach((doc) => {
			if (doc.id !== userId) {
				reviews.push(doc.data() as Review);
			} else {
				reviews.splice(1, 0, doc.data() as Review);
			}
		});

		res.status(200).json(reviews);
	} catch (err) {
		next(err);
	}
};
