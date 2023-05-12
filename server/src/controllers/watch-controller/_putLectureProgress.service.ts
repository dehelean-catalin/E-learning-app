import { NextFunction, Request, Response } from "express";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import db from "../../config/firebase";
import { VideoProgressItem } from "../../models/creator.model";
import { ValidatedRequest } from "../../models/request";

export const putLectureProgress = async (
	req: Request<any, any, { chapterId: string; progress: number }>,
	res: Response,
	next: NextFunction
) => {
	const validatedReq = req as ValidatedRequest;
	const { userId } = validatedReq.userData;
	const { id } = req.params;
	const { chapterId, progress } = req.body;

	const lectureRef = doc(db, `lectures/${id}/enrolledUsers`, userId);

	try {
		const docSnap = await getDoc(lectureRef);

		const items: VideoProgressItem[] = docSnap.get("items");
		const indexToUpdate = items.findIndex((i) => i.id === chapterId);

		if (typeof indexToUpdate === "undefined")
			throw new Error("Chapter not found");

		const updatedTask: VideoProgressItem = {
			id: req.body.chapterId,
			current: progress,
			total:
				items[indexToUpdate].total < progress
					? progress
					: items[indexToUpdate].total,
		};

		items[indexToUpdate] = updatedTask;

		await updateDoc(lectureRef, {
			lastChapter: req.body.chapterId,
			lastDate: new Date().toLocaleString(),
			items,
		});

		res.status(200).json("Successfully updated");
	} catch (err) {
		next(err);
	}
};
