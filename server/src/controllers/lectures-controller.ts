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
import { CreatedLectureModel } from "../models/creator.model";

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

export const getLectureChapterUrl = async (
	req: Request<Params, any, any, any>,
	res: Response
) => {
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

export const getSavedLectures = async (req: any, res: Response) => {
	const docRef = doc(db, "users", req.userData.userId);

	try {
		const docSnap = await getDoc(docRef);
		if (!docSnap.exists()) throw new Error("This Lecture dont exist");

		const { savedLectures: savedLecturesIds } = docSnap.data();

		const q = query(
			collection(db, "lectures"),
			where("id", "in", savedLecturesIds)
		);

		const querySnapshot = await getDocs(q);

		const savedLectures = querySnapshot.docs.map((doc) =>
			doc.data()
		) as CreatedLectureModel[];

		res.status(200).json(
			savedLectures.map((s) => ({
				id: s.id,
				title: s.publish.title,
				description: s.publish.description,
				caption: s.publish.caption,
				promoVideo: s.publish.promoVideo,
				author: s.publish.author,
				rating: s.rating,
				numberOfRatings: s.numberOfRatings,
				enrolledUsers: s.enrolledUsers,
			}))
		);
	} catch (err: any) {
		res.status(400).json({ code: 400, message: err.message });
	}
};
