import { NextFunction, Request, Response } from "express";
import { doc, getDoc } from "firebase/firestore";
import db from "../config/firebase";
import { VideoProgress } from "../models/creator.model";
import { ValidatedRequest } from "../models/request";

interface Params {
	id: string;
}

export const getLastChapter = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const validatedReq = req as ValidatedRequest;
	const { id } = req.params;
	const { userId } = validatedReq.userData;
	const userRef = doc(db, "users", userId);
	let lastChapter;
	try {
		const userSnap = await getDoc(userRef);
		if (!userSnap.exists()) throw new Error("Something went wrong");
		const history = userSnap.get("history") as {
			id: string;
			videoProgress: VideoProgress;
		}[];

		for (const key in history) {
			if (history[key].id === id) {
				lastChapter = history[key].videoProgress.lastChapter;
			}
		}
		res.status(200).json(lastChapter);
	} catch (err: any) {
		next(err);
	}
};
