import { NextFunction, Request, Response } from "express";
import { doc, updateDoc } from "firebase/firestore";
import db from "../../config/firebase";
import { ValidatedRequest } from "../../models/request";

export const putLectureLastDate = async (
	req: Request<any, any, { chapterId: string; progress: number }>,
	res: Response,
	next: NextFunction
) => {
	const validatedReq = req as ValidatedRequest;
	const { userId } = validatedReq.userData;
	const { id } = req.params;

	const lectureRef = doc(db, `lectures/${id}/enrolledUsers`, userId);

	try {
		await updateDoc(lectureRef, {
			lastDate: new Date().toLocaleString(),
		});

		res.status(200).json("Date has been updated");
	} catch (err) {
		next(err);
	}
};
