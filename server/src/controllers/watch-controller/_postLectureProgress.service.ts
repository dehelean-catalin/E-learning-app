import { NextFunction, Request, Response } from "express";
import {
	arrayUnion,
	doc,
	increment,
	setDoc,
	updateDoc,
} from "firebase/firestore";
import db from "../../config/firebase";
import { VideoProgress, VideoProgressItem } from "../../models/creator.model";
import { ValidatedRequest } from "../../models/request";

export const postLectureProgress = async (
	req: Request<any, any, string[]>,
	res: Response,
	next: NextFunction
) => {
	const validatedReq = req as ValidatedRequest;
	const { userId } = validatedReq.userData;
	const { id } = req.params;

	const lectureProgressRef = doc(db, `lectures/${id}/enrolledUsers`, userId);
	const lectureRef = doc(db, `lectures`, id);
	const userRef = doc(db, "users", userId);

	const items: VideoProgressItem[] = req.body.map((i) =>
		Object.assign({ id: i }, { current: 0, total: 0 })
	);

	const videoProgress: VideoProgress = {
		lastChapter: req.body[0],
		lastDate: new Date().toLocaleString(),
		items,
	};

	try {
		await setDoc(lectureProgressRef, videoProgress);
		await updateDoc(lectureRef, { enrolledUsers: increment(1) });
		await updateDoc(userRef, { history: arrayUnion(id) });

		res.status(200).json("Successfully enrolled");
	} catch (err) {
		next(err);
	}
};
