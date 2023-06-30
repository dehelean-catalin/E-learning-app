import { NextFunction, Request, RequestHandler, Response } from "express";
import { doc, getDoc } from "firebase/firestore";
import db from "../config/firebase";
import { VideoProgress } from "../models/creator.model";
import { ValidatedRequest } from "../models/request";

interface Params {
	id: string;
}

export const getLectureById = async (req: Request, res: Response) => {
	try {
		const docRef = doc(db, "lectures", req.params.id);
		const docSnap = await getDoc(docRef);
		if (!docSnap.exists()) {
			throw new Error("This Lecture dont exist");
		}
		res.status(200).json(docSnap.data());
	} catch (err: any) {
		res.status(400).json({ code: 400, message: err.message });
	}
};

export const getLectureChapterUrl: RequestHandler<
	Params,
	any,
	unknown,
	{ page: string }
> = async (req, res) => {
	try {
		const { page } = req?.query;
		const { id } = req.params;
		const docRef = doc(db, "lectures", id);
		const docSnap = await getDoc(docRef);
		if (!docSnap.exists()) {
			throw new Error("This Lecture dont exist");
		}
		const { details } = docSnap.data();
		res.status(200).json(details[page]);
	} catch (err: any) {
		res.status(400).json({ code: 400, message: err.message });
	}
};

export const getLectureChapterList = async (
	req: Request<Params, any, any, any>,
	res: Response
) => {
	try {
		const { id } = req.params;
		const docRef = doc(db, "lectures", id);
		const docSnap = await getDoc(docRef);
		if (!docSnap.exists()) {
			throw new Error("This Lecture dont exist");
		}
		const { details } = docSnap.data();
		res.status(200).json(details);
	} catch (err: any) {
		res.status(400).json({ code: 400, message: err.message });
	}
};
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
