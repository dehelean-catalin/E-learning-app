import { RequestHandler } from "express";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import db from "../config/firebase";
import { ValidatedRequest } from "../models/genericModels";
import { VideoProgress } from "../models/user-model";
import {
	createLectureProgressData,
	getLectureProgressData,
	getMonitoringHistoryListData,
	updateLectureProgressData,
} from "../services/monitoringService";

export const getMonitoringHistoryList: RequestHandler = async (req, res) => {
	const validatedReq = req as ValidatedRequest;
	const { userId } = validatedReq.userData;

	try {
		const data = await getMonitoringHistoryListData(userId);

		res.status(200).json(data);
	} catch (err: any) {
		return res.status(400).json({ code: 400, message: err.message });
	}
};

export const getLectureProgress: RequestHandler = async (req, res) => {
	const validatedReq = req as ValidatedRequest;
	const { userId } = validatedReq.userData;

	try {
		const id = req.params.id;
		if (!id) throw new Error("Lecture not found");

		const data = await getLectureProgressData(id, userId);

		res.status(200).json(data);
	} catch (err: any) {
		res.status(400).json({ code: 400, message: err.message });
	}
};

export const createLectureProgress: RequestHandler<
	any,
	any,
	{ items: string[]; lastName: string }
> = async (req, res) => {
	const validatedReq = req as ValidatedRequest;
	const { userId } = validatedReq.userData;

	try {
		const id = req.params.id;
		if (!id) throw new Error("Lecture not found");

		const data = await createLectureProgressData(id, userId, req.body);

		res.status(200).json(data);
	} catch (err: any) {
		res.status(400).json({ code: 400, message: err.message });
	}
};

export const updateLectureProgress: RequestHandler<
	any,
	any,
	{ chapterId: string; progress: number }
> = async (req, res) => {
	const validatedReq = req as ValidatedRequest;
	const { userId } = validatedReq.userData;

	try {
		const id = req.params.id;
		if (!id) throw new Error("Lecture not found");

		const data = await updateLectureProgressData(id, userId, req.body);

		res.status(200).json(data);
	} catch (err: any) {
		res.status(400).json({ code: 400, message: err.message });
	}
};

// AICI AM RAMAS

export const putLectureLastChapter: RequestHandler = async (req, res, next) => {
	const validatedReq = req as ValidatedRequest;
	const { userId } = validatedReq.userData;
	const { id } = req.params;

	const userRef = doc(db, "users", userId);

	try {
		const userSnap = await getDoc(userRef);

		const history = userSnap.get("history") as {
			id: string;
			videoProgress: VideoProgress;
		}[];

		for (const key in history) {
			if (history[key].id === id) {
				history[key].videoProgress.lastChapter = req.body.lastChapter;
				history[key].videoProgress.lastName = req.body.lastName;
			}
		}

		await updateDoc(userRef, { history });

		res.status(200).json("Success");
	} catch (err) {
		next(err);
	}
};

export const putLectureLastDate: RequestHandler<
	any,
	any,
	{ chapterId: string; progress: number }
> = async (req, res, next) => {
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

interface Params {
	id: string;
}

export const getLastChapter: RequestHandler = async (req, res, next) => {
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
