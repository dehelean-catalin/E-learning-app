import { NextFunction, Request, Response } from "express";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import db from "../../config/firebase";
import { VideoProgress } from "../../models/creator.model";
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

	const userRef = doc(db, "users", userId);

	try {
		const userSnap = await getDoc(userRef);

		const history = userSnap.get("history") as {
			id: string;
			videoProgress: VideoProgress;
		}[];

		let currentLecture = history.find((h) => h.id === id)?.videoProgress;
		if (!currentLecture) throw new Error("Lecture not found");

		currentLecture.lastDate = new Date().toISOString();

		currentLecture.items.forEach((i) => {
			if (i.id === chapterId) {
				i.current = progress;

				if (i.total < i.current) i.total = i.current;
			}
		});

		await updateDoc(userRef, {
			history,
		});

		res.status(200).json(currentLecture.items);
	} catch (err) {
		next(err);
	}
};
