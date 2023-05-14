import { NextFunction, Request, Response } from "express";
import {
	QueryDocumentSnapshot,
	QuerySnapshot,
	collection,
	getDocs,
} from "firebase/firestore";
import db from "../../config/firebase";
import {
	lastHourCheck,
	lastMonthCheck,
	lastWeekCheck,
	lastYearCheck,
	todayCheck,
} from "../../helpers/search-helpers";
import { CreatedLectureModel } from "../../models/creator.model";
import { LectureCard, QueryFilterParams } from "../../models/search-model";

export const getSearchLectures = async (
	req: Request<any, any, any, QueryFilterParams & { searchQuery?: string }>,
	res: Response<LectureCard[]>,
	next: NextFunction
) => {
	let lectures: CreatedLectureModel[] = [];
	let searchedLectures: CreatedLectureModel[] = [];
	let querySnapshot: QuerySnapshot;

	try {
		if (!req.query?.searchQuery) {
			throw new Error("Search query can't be empty");
		}

		const formatedSearchQuery = req.query.searchQuery.toLowerCase();
		const formatedRating = req.query?.rating;

		querySnapshot = await getDocs(collection(db, "lectures"));

		querySnapshot.forEach((doc: QueryDocumentSnapshot) => {
			lectures.push(doc.data() as CreatedLectureModel);
		});

		lectures.forEach((lecture) => {
			const formatedTitle = lecture.publish.title.toLowerCase();
			const formatedAuthor = lecture.publish.author.toLowerCase();
			const formatedDescription = lecture.publish.description?.toLowerCase();
			const formatedCategory = lecture.publish.category.toLowerCase();

			if (
				!!formatedTitle.includes(formatedSearchQuery) ||
				!!formatedAuthor.includes(formatedSearchQuery) ||
				!!formatedCategory.includes(formatedSearchQuery) ||
				!!formatedDescription?.includes(formatedSearchQuery)
			) {
				searchedLectures.push(lecture);
			}
		});

		if (formatedRating === "9g") {
			searchedLectures = searchedLectures.filter(
				({ rating, numberOfRatings }) => rating / numberOfRatings >= 4.5
			);
		}
		if (formatedRating === "8-9b") {
			searchedLectures = searchedLectures.filter(
				({ rating, numberOfRatings }) => rating / numberOfRatings >= 3
			);
		}
		if (formatedRating === "8u") {
			searchedLectures = searchedLectures.filter(
				({ numberOfRatings, rating }) => rating / numberOfRatings < 3
			);
		}
		if (req.query?.language === "english") {
			searchedLectures = searchedLectures.filter(
				(lecture) => lecture.publish.language === "English"
			);
		}
		if (req.query?.language === "french") {
			searchedLectures = searchedLectures.filter(
				(lecture) => lecture.publish.language === "French"
			);
		}
		if (req.query?.language === "romanian") {
			searchedLectures = searchedLectures.filter(
				(lecture) => lecture.publish.language === "Romanian"
			);
		}
		if (req.query?.duration === "4u") {
			searchedLectures = searchedLectures.filter(
				({ duration }) => duration / 3600 < 240
			);
		}
		if (req.query?.duration === "4-16b") {
			searchedLectures = searchedLectures.filter(
				({ duration }) => duration / 3600 >= 240 && duration / 3600 < 960
			);
		}
		if (req.query?.duration === "16-40b") {
			searchedLectures = searchedLectures.filter(
				({ duration }) => duration / 3600 >= 960 && duration / 3600 < 2400
			);
		}
		if (req.query?.duration === "40g") {
			searchedLectures = searchedLectures.filter(
				({ duration }) => duration / 3600 >= 2400
			);
		}

		if (req.query?.date === "lh") {
			searchedLectures = searchedLectures.filter(({ lastUpdate }) =>
				lastHourCheck(lastUpdate)
			);
		}
		if (req.query?.date === "td") {
			searchedLectures = searchedLectures.filter(({ lastUpdate }) =>
				todayCheck(lastUpdate)
			);
		}
		if (req.query?.date === "lw") {
			searchedLectures = searchedLectures.filter(({ lastUpdate }) =>
				lastWeekCheck(lastUpdate)
			);
		}
		if (req.query?.date === "lm") {
			searchedLectures = searchedLectures.filter(({ lastUpdate }) =>
				lastMonthCheck(lastUpdate)
			);
		}
		if (req.query?.date === "ly") {
			searchedLectures = searchedLectures.filter(({ lastUpdate }) =>
				lastYearCheck(lastUpdate)
			);
		}

		const result = searchedLectures?.map((s) => ({
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

		res.status(200).json(result);
	} catch (err: any) {
		next(err);
	}
};
