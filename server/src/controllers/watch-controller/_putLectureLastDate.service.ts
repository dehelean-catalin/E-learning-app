import { NextFunction, Request, Response } from "express";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import db from "../../config/firebase";
import { VideoProgress } from "../../models/creator.model";
import { ValidatedRequest } from "../../models/request";

export const putLectureLastDate = async (
	req: Request<any, any, { chapterId: string; progress: number }>,
	res: Response,
	next: NextFunction
) => {
	const validatedReq = req as ValidatedRequest;
	const { userId } = validatedReq.userData;
	const { id } = req.params;

	const userRef = doc(db, "users", userId);
	let lastChapter;

	try {
		const userSnap = await getDoc(userRef);

		const history = userSnap.get("history") as {
			id: string;
			videoProgress: VideoProgress;
		}[];
		for (const key in history) {
			if (history[key].id === id) {
				history[key].videoProgress.lastDate = new Date().toISOString();
				lastChapter = history[key].videoProgress.lastChapter;
			}
		}

		await updateDoc(userRef, { history });

		res.status(200).json(lastChapter);
	} catch (err) {
		next(err);
	}
};
