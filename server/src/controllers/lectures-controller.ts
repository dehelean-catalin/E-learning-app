import { Deepgram } from "@deepgram/sdk";
import { NextFunction, Request, RequestHandler, Response } from "express";
import { doc, getDoc } from "firebase/firestore";
import db from "../config/firebase";
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

	try {
		const lectureRef = doc(db, `lectures/${id}/enrolledUsers`, userId);

		const lectureSnap = await getDoc(lectureRef);
		if (!lectureSnap.exists()) throw new Error("Something went wrong");

		res.status(200).json(lectureSnap.get("lastChapter"));
	} catch (err: any) {
		next(err);
	}
};

const deepgram = new Deepgram("2a13dd5e7f255c33ce8556d7544f7ce7226b8d51");

export const transcribe = async (req, res, next) => {
	const audioSource = { buffer: req.file.buffer, mimetype: "video" };
	try {
		const response: any = await deepgram.transcription.preRecorded(
			audioSource,
			{
				punctuate: true,
				utterances: true,
			}
		);
		res.json(response.toWebVTT());
	} catch (err) {
		console.log(err);
		next(err);
	}
};
