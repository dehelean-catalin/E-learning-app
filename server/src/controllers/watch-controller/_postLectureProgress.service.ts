import { NextFunction, Request, Response } from "express";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import db from "../../config/firebase";
import { ValidatedRequest } from "../../models/request";
import { VideoProgress, VideoProgressItem } from "./../../models/creator.model";

export const postLectureProgress = async (
	req: Request<any, any, { items: string[]; lastName: string }>,
	res: Response,
	next: NextFunction
) => {
	const validatedReq = req as ValidatedRequest;
	const { userId } = validatedReq.userData;
	const { id } = req.params;
	const { items, lastName } = req.body;

	const lectureRef = doc(db, `lectures`, id);
	const userRef = doc(db, "users", userId);

	try {
		await updateDoc(lectureRef, { enrolledUsers: arrayUnion(id) });

		const userSnap = await getDoc(userRef);

		if (!userSnap.exists()) throw new Error("This user don't exists");

		const history = userSnap.get("history") as {
			id: string;
			videoProgress: VideoProgress;
		}[];

		if (!!history.find((h) => h.id === id))
			throw new Error("Lecture already exists");

		const newItems: VideoProgressItem[] = items.map((i) =>
			Object.assign({ id: i }, { current: 0, total: 0 })
		);

		const videoProgress: VideoProgress = {
			lastChapter: items[0],
			lastName,
			lastDate: new Date().toISOString(),
			items: newItems,
		};

		history.push({ id, videoProgress });

		await updateDoc(userRef, { history });

		res.status(200).json("Successfully enrolled");
	} catch (err) {
		next(err);
	}
};
