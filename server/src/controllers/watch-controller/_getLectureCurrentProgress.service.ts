import { NextFunction, Request, Response } from "express";
import { doc, getDoc } from "firebase/firestore";
import db from "../../config/firebase";
import { VideoProgressItem } from "../../models/creator.model";
import { ValidatedRequest } from "../../models/request";

export const getLectureCurrentProgress = async (
	req: Request,
	res: Response<Omit<VideoProgressItem, "id">>,
	next: NextFunction
) => {
	const validatedReq = req as ValidatedRequest;
	const { userId } = validatedReq.userData;
	const { id, chapterId } = req.params;

	const lectureRef = doc(db, `lectures/${id}/enrolledUsers`, userId);

	try {
		const lectureSnap = await getDoc(lectureRef);

		if (!lectureSnap.exists())
			throw new Error("Try again! Something went wrong");

		const data = lectureSnap.get("items") as VideoProgressItem[];
		const index = data.findIndex((d) => d.id === chapterId);

		res.status(200).json({
			total: data[index].total,
			current: data[index].current,
		});
	} catch (err) {
		next(err);
	}
};
