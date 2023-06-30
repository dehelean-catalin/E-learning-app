import { NextFunction, Request, Response } from "express";
import { doc, getDoc } from "firebase/firestore";
import db from "../../config/firebase";
import { tryAgainError } from "../../constant";
import { ValidatedRequest } from "../../models/request";
import { VideoProgress } from "./../../models/creator.model";

export const getLectureProgress = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const validatedReq = req as ValidatedRequest;
	const { userId } = validatedReq.userData;
	const { id } = req.params;

	const userRef = doc(db, "users", userId);

	try {
		const userSnap = await getDoc(userRef);

		if (!userSnap.exists()) throw new Error("Try again! Something went wrong");

		const history = userSnap.get("history") as {
			id: string;
			videoProgress: VideoProgress;
		}[];

		const historyItem = history.find((i) => i.id === id);

		if (!historyItem) {
			res.status(200).json([]);
		} else {
			res.status(200).json(historyItem?.videoProgress.items);
		}
	} catch (err) {
		res.status(400).json(tryAgainError);
	}
};
