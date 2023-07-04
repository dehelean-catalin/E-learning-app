import { RequestHandler } from "express";
import { tryAgainError } from "../constant";
import { Category } from "../models/creator.model";
import { ValidatedRequest } from "../models/request";
import { QueryFilterParams } from "../models/search-model";
import {
	addLectureReviewData,
	addSavedLectureIdData,
	deleteLectureReviewData,
	deleteSavedLectureIdData,
	getAllLecturesData,
	getAllSearchedLecturesData,
	getLectureByIdData,
	getLectureReviewsData,
	getSavedLecturesData,
} from "../services/lectureService";

export const getAllLectures: RequestHandler = async (req, res) => {
	const validatedRequest = req as ValidatedRequest;
	const { userId } = validatedRequest.userData;

	try {
		if (!req.query?.category) throw new Error("Empty category");

		const category = req.query.category as Category;

		if (!Object.values(Category).includes(category))
			throw new Error("Invalid category");

		const data = await getAllLecturesData(userId, category);

		res.status(200).json(data);
	} catch (err: any) {
		res.status(400).json({ code: 400, message: err.message });
	}
};

export const getLectureById: RequestHandler = async (req, res) => {
	try {
		const lectureId = req.params.id;
		if (!lectureId) throw new Error("Lecture id not found");

		const data = await getLectureByIdData(lectureId);
		res.status(200).json(data);
	} catch (err: any) {
		res.status(400).json({ code: 400, message: err.message });
	}
};

export const getSavedLectures: RequestHandler = async (req, res) => {
	const validatedRequest = req as ValidatedRequest;
	const { userId } = validatedRequest.userData;

	try {
		const data = await getSavedLecturesData(userId);
		res.status(200).json(data);
	} catch (err: any) {
		res.status(400).json({ code: 400, message: err.message });
	}
};

export const addSavedLectureId: RequestHandler = async (req, res) => {
	const validatedRequest = req as ValidatedRequest;
	const { userId } = validatedRequest.userData;

	try {
		const lectureId = req.params.id;
		if (!lectureId) throw new Error("Lecture id not found");

		const data = await addSavedLectureIdData(userId, lectureId);
		res.status(200).json(data);
	} catch (err: any) {
		res.status(400).json({ code: 400, message: err.message });
	}
};

export const deleteSavedLectureId: RequestHandler = async (req, res) => {
	const validatedRequest = req as ValidatedRequest;
	const { userId } = validatedRequest.userData;

	try {
		const lectureId = req.params.id;
		if (!lectureId) throw new Error("Lecture id not found");

		const data = await deleteSavedLectureIdData(userId, lectureId);
		res.status(200).json(data);
	} catch (err: any) {
		res.status(400).json({ code: 400, message: err.message });
	}
};

export const getAllSearchedLectures: RequestHandler<
	any,
	any,
	any,
	QueryFilterParams
> = async (req, res) => {
	try {
		if (!req.query?.searchQuery) throw new Error("Search query can't be empty");

		const data = await getAllSearchedLecturesData(req.query);
		res.status(200).json(data);
	} catch (err: any) {
		res.status(400).json({ code: 400, message: err.message });
	}
};

export const getLectureReviews: RequestHandler = async (req, res) => {
	const validatedReq = req as ValidatedRequest;
	const { userId } = validatedReq.userData;
	const { id } = req.params;

	try {
		const id = req.params.id;
		if (!id) throw new Error("Lecture not found");
		const data = await getLectureReviewsData(id);

		res.status(200).json(data);
	} catch (err: any) {
		res.status(400).json({ code: 400, message: err.message });
	}
};

export const addLectureReview: RequestHandler<
	any,
	any,
	{ message: string; rating: number }
> = async (req, res) => {
	const validatedReq = req as ValidatedRequest;
	const { userId } = validatedReq.userData;

	try {
		const { id } = req.params;
		if (!id) throw new Error("Lecture not found");

		await addLectureReviewData(id, userId, req.body);

		res.status(200).json("Success");
	} catch (err: any) {
		res.status(400).json({ code: 400, message: err.message });
	}
};

export const deleteLectureReview: RequestHandler = async (req, res) => {
	const validatedReq = req as ValidatedRequest;
	const { userId } = validatedReq.userData;

	try {
		const { id } = req.params;
		const rating = req.body?.rating;

		if (!id) throw new Error("Lecture not found");
		if (!rating) throw new Error(tryAgainError);

		await deleteLectureReviewData(id, userId, rating);

		res.status(200).json("Success");
	} catch (err: any) {
		res.status(400).json({ code: 400, message: err.message });
	}
};
