import { Request, Response } from "express";
import {
	QueryDocumentSnapshot,
	QuerySnapshot,
	collection,
	getDocs,
} from "firebase/firestore";
import db from "../../config/firebase";
import {
	calculateRating,
	lastHourCheck,
	lastMonthCheck,
	lastWeekCheck,
	lastYearCheck,
	lectureDurationInMinutesHelper,
	todayCheck,
} from "../../helpers/search-helpers";
import { LectureModel } from "../../models/lecture-model";
import { QueryFilterParams } from "../../models/search-model";

export const getSearchLectures = async (
	req: Request<any, any, any, QueryFilterParams & { searchQuery?: string }>,
	res: Response
) => {
	let lectures: LectureModel[] = [];
	let searchedLectures: LectureModel[] = [];
	let querySnapshot: QuerySnapshot;

	try {
		if (!req.query?.searchQuery) {
			throw new Error("Search query can't be empty");
		}
		const formatedSearchQuery = req.query.searchQuery.toLowerCase();
		const formatedRating = req.query?.rating;

		querySnapshot = await getDocs(collection(db, "lectures"));

		querySnapshot.forEach((doc: QueryDocumentSnapshot) => {
			lectures.push(doc.data() as LectureModel);
		});

		lectures.forEach((lecture) => {
			const formatedTitle = lecture.title.toLowerCase();
			const formatedAuthor = lecture.createdBy.toLowerCase();
			const formatedDescription = lecture.description.data.toLowerCase();
			const formatedCategory = lecture.category.toLowerCase();

			if (
				!!formatedTitle.includes(formatedSearchQuery) ||
				!!formatedAuthor.includes(formatedSearchQuery) ||
				!!formatedCategory.includes(formatedSearchQuery) ||
				!!formatedDescription.includes(formatedSearchQuery)
			) {
				searchedLectures.push(lecture);
			}
		});

		if (formatedRating === "9g") {
			searchedLectures = searchedLectures.filter(
				({ reviews }) => calculateRating(reviews.data) >= 9
			);
		}
		if (formatedRating === "8-9b") {
			searchedLectures = searchedLectures.filter(
				({ reviews }) => calculateRating(reviews.data) >= 8
			);
		}
		if (formatedRating === "8u") {
			searchedLectures = searchedLectures.filter(
				({ reviews }) => calculateRating(reviews.data) < 8
			);
		}
		if (req.query?.language === "english") {
			searchedLectures = searchedLectures.filter(
				(lecture) => lecture.language === "english"
			);
		}
		if (req.query?.language === "french") {
			searchedLectures = searchedLectures.filter(
				(lecture) => lecture.language === "french"
			);
		}
		if (req.query?.language === "romanian") {
			searchedLectures = searchedLectures.filter(
				(lecture) => lecture.language === "romanian"
			);
		}
		if (req.query?.duration === "4u") {
			searchedLectures = searchedLectures.filter(
				(lecture) => lectureDurationInMinutesHelper(lecture.items.data) < 240
			);
		}
		if (req.query?.duration === "4-16b") {
			searchedLectures = searchedLectures.filter(
				(lecture) =>
					lectureDurationInMinutesHelper(lecture.items.data) >= 240 &&
					lectureDurationInMinutesHelper(lecture.items.data) < 960
			);
		}
		if (req.query?.duration === "16-40b") {
			searchedLectures = searchedLectures.filter(
				(lecture) =>
					lectureDurationInMinutesHelper(lecture.items.data) >= 960 &&
					lectureDurationInMinutesHelper(lecture.items.data) < 2400
			);
		}
		if (req.query?.duration === "40g") {
			searchedLectures = searchedLectures.filter(
				(lecture) => lectureDurationInMinutesHelper(lecture.items.data) > 2400
			);
		}

		if (req.query?.date === "lh") {
			searchedLectures = searchedLectures.filter(({ createdAt }) =>
				lastHourCheck(createdAt)
			);
		}
		if (req.query?.date === "td") {
			searchedLectures = searchedLectures.filter(({ createdAt }) =>
				todayCheck(createdAt)
			);
		}
		if (req.query?.date === "lw") {
			searchedLectures = searchedLectures.filter(({ createdAt }) =>
				lastWeekCheck(createdAt)
			);
		}
		if (req.query?.date === "lm") {
			searchedLectures = searchedLectures.filter(({ createdAt }) =>
				lastMonthCheck(createdAt)
			);
		}
		if (req.query?.date === "ly") {
			searchedLectures = searchedLectures.filter(({ createdAt }) =>
				lastYearCheck(createdAt)
			);
		}

		if (!searchedLectures.length) throw new Error("No lecture found");

		res.status(200).json(searchedLectures);
	} catch (err: any) {
		res.status(400).json({ code: 400, message: err.message });
	}
};
