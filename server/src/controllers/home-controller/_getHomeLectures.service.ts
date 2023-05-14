import { NextFunction, Request, Response } from "express";
import { collection, getDocs, query, where } from "firebase/firestore";
import db from "../../config/firebase";
import { Category, CreatedLectureModel } from "../../models/creator.model";
import { LectureCard } from "../../models/search-model";
import { ValidatedRequest } from "./../../models/request";

export const getLectures = async (
	req: Request,
	res: Response<LectureCard[]>,
	next: NextFunction
) => {
	const validatedRequest = req as ValidatedRequest;
	const { userId } = validatedRequest.userData;

	let compoundQuery;

	try {
		if (!req.query?.category) {
			throw new Error("Empty category");
		}
		const category = req.query.category as Category;

		if (!Object.values(Category).includes(category))
			throw new Error("Invalid category");

		if (category === "All") {
			compoundQuery = query(
				collection(db, "lectures"),
				where("publish.status", "==", "Public")
			);
		} else {
			compoundQuery = query(
				collection(db, "lectures"),
				where("publish.status", "==", "Public"),
				where("publish.category", "==", category)
			);
		}

		const querySnapshot = await getDocs(compoundQuery);
		const lectures = querySnapshot.docs
			.map((doc) => doc.data())
			.filter(
				(l: any) => l.publish.authorId !== userId
			) as CreatedLectureModel[];

		const formattedLectures = lectures.map((s) => ({
			id: s.id,
			title: s.publish.title,
			description: s.publish.description,
			caption: s.publish.caption,
			promoVideo: s.publish.promoVideo,
			author: s.publish.author,
			rating: s.rating,
			numberOfRatings: s.numberOfRatings,
			enrolledUsers: s.enrolledUsers,
		}));

		res.status(200).json(formattedLectures);
	} catch (err) {
		next(err);
	}
};
