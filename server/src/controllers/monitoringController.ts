import { RequestHandler } from "express";
import { ValidatedRequest } from "../models/genericModels";
import {
	createLectureProgressData,
	getLastChapterIdData,
	getLectureProgressData,
	getMonitoringHistoryListData,
	updateLastChapterData,
	updateLectureProgressData,
} from "../services/monitoringService";

export const getMonitoringHistoryList: RequestHandler = async (
	req,
	res,
	next
) => {
	const validatedReq = req as ValidatedRequest;
	const { userId } = validatedReq.userData;
	try {
		const data = await getMonitoringHistoryListData(userId);

		res.status(200).json(data);
	} catch (err) {
		next(err);
	}
};

export const getLectureProgress: RequestHandler = async (req, res) => {
	const validatedReq = req as ValidatedRequest;
	const { userId } = validatedReq.userData;
	const { id } = req.params;

	try {
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
	const { id } = req.params;

	try {
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
	const { id } = req.params;

	try {
		const data = await updateLectureProgressData(id, userId, req.body);

		res.status(200).json(data);
	} catch (err: any) {
		res.status(400).json({ code: 400, message: err.message });
	}
};

export const getLastChapterId: RequestHandler = async (req, res) => {
	const validatedReq = req as ValidatedRequest;
	const { userId } = validatedReq.userData;
	const { id } = req.params;

	try {
		const data = await getLastChapterIdData(id, userId);

		res.status(200).json(data);
	} catch (err: any) {
		res.status(400).json({ code: 400, message: err.message });
	}
};

export const updateLastChapter: RequestHandler<
	any,
	any,
	{ lastChapter: string; lastName: string }
> = async (req, res) => {
	const validatedReq = req as ValidatedRequest;
	const { userId } = validatedReq.userData;
	const { id } = req.params;

	try {
		const data = await updateLastChapterData(id, userId, req.body);

		res.status(200).json(data);
	} catch (err: any) {
		res.status(400).json({ code: 400, message: err.message });
	}
};
