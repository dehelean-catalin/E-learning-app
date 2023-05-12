import { NextFunction, Request, Response } from "express";
import { doc, getDoc } from "firebase/firestore";
import db from "../../config/firebase";
import { VideoProgressItem } from "../../models/creator.model";
import { ValidatedRequest } from "../../models/request";

export const getLectureProgress = async (
	req: Request,
	res: Response<VideoProgressItem[]>,
	next: NextFunction
) => {
	const validatedReq = req as ValidatedRequest;
	const { userId } = validatedReq.userData;
	const { id } = req.params;

	const lectureRef = doc(db, `lectures/${id}/enrolledUsers`, userId);

	try {
		const lectureSnap = await getDoc(lectureRef);

		if (!lectureSnap.exists())
			throw new Error("Try again! Something went wrong");

		const data = lectureSnap.get("items") as VideoProgressItem[];

		res.status(200).json(data);
	} catch (err) {
		next(err);
	}
};
