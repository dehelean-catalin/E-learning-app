import { NextFunction, Request, Response } from "express";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
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

	const lectureProgressRef = doc(db, `lectures/${id}/enrolledUsers`, userId);
	const userRef = doc(db, "users", userId);

	try {
		await updateDoc(lectureProgressRef, {
			lastDate: new Date().toLocaleString(),
		});
		await updateDoc(userRef, { history: arrayUnion(id) });

		res.status(200).json("Date has been updated");
	} catch (err) {
		next(err);
	}
};
