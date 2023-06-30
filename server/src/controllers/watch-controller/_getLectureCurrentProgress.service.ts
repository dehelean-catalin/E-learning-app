import { Request, Response } from "express";
import { doc, getDoc } from "firebase/firestore";
import db from "../../config/firebase";
import { tryAgainError } from "../../constant";
import { VideoProgress } from "../../models/creator.model";
import { ValidatedRequest } from "../../models/request";

export const getLectureCurrentProgress = async (
	req: Request,
	res: Response
) => {
	const validatedReq = req as ValidatedRequest;
	const { userId } = validatedReq.userData;
	const { id, chapterId } = req.params;

	const userRef = doc(db, "users", userId);

	try {
		const userSnap = await getDoc(userRef);

		if (!userSnap.exists()) throw new Error("Try again! Something went wrong");

		const history = userSnap.get("history") as {
			id: string;
			videoProgress: VideoProgress;
		}[];

		const currentProgress = history.find((d) => d.id === id);

		if (!currentProgress) throw new Error(tryAgainError);

		const progress = currentProgress.videoProgress.items.find(
			(i) => i.id === chapterId
		);

		res.status(200).json(progress);
	} catch (err) {
		res.status(400).json(err);
	}
};
