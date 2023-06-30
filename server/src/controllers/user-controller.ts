import { Request, Response } from "express";
import {
	collection,
	doc,
	getDoc,
	getDocs,
	query,
	where,
} from "firebase/firestore";
import db from "../config/firebase";
import { tryAgainError } from "../constant";
import { CreatedLectureModel } from "../models/creator.model";
import { ValidatedRequest } from "../models/request";
import { UserModel } from "../models/user-model";
import { VideoProgress } from "./../models/creator.model";

export const getUserByID = async (req: Request, res: Response) => {
	try {
		const validatedReq = req as ValidatedRequest;
		const userRef = doc(db, "users", validatedReq.userData.userId);
		const userSnap = await getDoc(userRef);

		if (!userSnap.exists()) throw new Error("This user don't exist");

		const userData = userSnap.data() as UserModel;
		res.status(200).json(userData);
	} catch (err: any) {
		res.status(400).json({ code: 400, message: err.message });
	}
};

export const getHistoryLectureList = async (req: Request, res: Response) => {
	const validatedReq = req as ValidatedRequest;
	const { userId } = validatedReq.userData;
	const userRef = doc(db, "users", userId);

	try {
		const userSnap = await getDoc(userRef);

		if (!userSnap.exists()) throw new Error("This user don't exists");

		const progress = userSnap.get("history") as {
			id: string;
			videoProgress: VideoProgress;
		}[];

		if (!progress.length) res.status(200).json([]);

		const ids = progress.map((h) => h.id);
		const q = query(collection(db, "lectures"), where("id", "in", ids));

		const querySnapshot = await getDocs(q);

		const lectures = querySnapshot.docs.map((doc) =>
			doc.data()
		) as CreatedLectureModel[];

		const convertedLectures = lectures.map((lecture, index) => {
			const duration =
				lecture.content
					.map((c) => c.children.map((i) => i.data?.duration))
					.flat() ?? [];
			const currentVideoProgress = progress.find(
				(p) => p.id === lecture.id
			)?.videoProgress;

			if (!currentVideoProgress) throw new Error(tryAgainError);

			const totalProgress = currentVideoProgress.items.map((i) => i.total);

			const completed = duration?.filter(
				(d, index) => Math.round(d - d / 20) <= Math.round(totalProgress[index])
			).length;

			return {
				id: lecture.id,
				title: lecture.publish.title,
				caption: lecture.publish.caption,
				author: lecture.publish.author,
				rating: lecture.rating,
				numberOfRatings: lecture.numberOfRatings,
				enrolledUsers: lecture.enrolledUsers,
				progress: (completed / totalProgress.length) * 100,
				lastChapter: currentVideoProgress.lastChapter,
				lastName: currentVideoProgress.lastName,
				date: currentVideoProgress.lastDate,
			};
		});
		const sortedDates = convertedLectures.sort((a, b) => {
			const dateA = new Date(a.date);
			const dateB = new Date(b.date);

			return dateB.getTime() - dateA.getTime();
		});
		res.status(200).json(sortedDates);
	} catch (err: any) {
		return res.status(400).json({ code: 400, message: err.message });
	}
};
