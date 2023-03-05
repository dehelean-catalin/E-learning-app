import { Request, Response } from "express";
import { collection, getDocs } from "firebase/firestore";
import db from "../../config/firebase";
import { LectureCardModel, LectureModel } from "../../models/lecture-model";

type SearchQuery = { searchQuery: string };

export const getSearchLectures = async (
	req: Request<any, any, any, SearchQuery>,
	res: Response
) => {
	let searchedLectures: LectureCardModel[] = [];

	try {
		if (!req.query?.searchQuery) {
			throw new Error("Search query can't be empty");
		}
		const formatedQuery = req.query.searchQuery.toLowerCase();

		const lectures = await getDocs(collection(db, "lectures"));

		lectures.forEach((doc) => {
			const lecture = doc.data() as LectureModel;
			const formatedTitle = lecture.title.toLowerCase();
			const formatedAuthor = lecture.createdBy.toLowerCase();
			if (
				!!!formatedTitle.search(formatedQuery) ||
				!!!formatedAuthor.search(formatedQuery)
			) {
				searchedLectures.push({
					title: lecture.title,
					thumbnail: lecture.thumbnail,
					createdAt: lecture.createdAt,
					createdBy: lecture.createdBy,
					reviewList: lecture.reviewList,
				});
			}
		});

		res.status(200).json(searchedLectures);
	} catch (err: any) {
		res.status(400).json({ code: 400, message: err.message });
	}
};
