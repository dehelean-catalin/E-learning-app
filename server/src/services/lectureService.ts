import {
	DocumentData,
	FieldValue,
	QuerySnapshot,
} from "firebase-admin/firestore";
import { firestoreDb } from "../config/firebase-admin";
import { applyFilters } from "../helpers/lecture.helper";
import {
	Category,
	CreatedLectureModel,
	Review,
	ReviewData,
} from "../models/creatorModels";
import {
	BasicLecture,
	QueryFilterParams,
	SavedLecture,
	SearchedLecture,
} from "../models/lectureModels";

export const getAllLecturesData = async (
	userId: string,
	category: Category
) => {
	let query;
	const lectureRef = firestoreDb.collection("lectures");

	if (category === "All") {
		query = lectureRef
			.where("publish.status", "==", "Public")
			.where("publish.authorId", "!=", userId)
			.select(
				"publish.title",
				"publish.caption",
				"publish.author",
				"rating",
				"numberOfRatings",
				"enrolledUsers"
			);
	} else {
		query = lectureRef
			.where("publish.status", "==", "Public")
			.where("publish.category", "==", category)
			.where("publish.authorId", "!=", userId)
			.select(
				"publish.title",
				"publish.caption",
				"publish.author",
				"rating",
				"numberOfRatings",
				"enrolledUsers"
			);
	}

	const querySnapshot: QuerySnapshot<DocumentData> = await query.get();

	const data: BasicLecture[] = querySnapshot.docs.map((doc) => {
		const {
			publish: { title, caption, author },
			rating,
			numberOfRatings,
			enrolledUsers,
		} = doc.data();

		return {
			id: doc.id,
			title,
			caption,
			author,
			rating,
			numberOfRatings,
			enrolledUsers,
		};
	});

	return data;
};

export const getLectureByIdData = async (id: string) => {
	const lectureRef = firestoreDb.collection("lectures").doc(id);

	const lectureSnap = await lectureRef.get();

	if (!lectureSnap.exists) throw new Error("Lecture not found");

	const data = lectureSnap.data() as CreatedLectureModel;

	return data;
};

export const getSavedLecturesData = async (id: string) => {
	const userRef = firestoreDb.collection("users").doc(id);
	const lectureRef = firestoreDb.collection("lectures");

	const userSnap = await userRef.get();
	if (!userSnap.exists) throw new Error("User not found");

	const savedLecturesIds = userSnap.get("savedLectures") as string[];

	if (!savedLecturesIds.length) return [];

	const querySnapshot = await lectureRef
		.where("id", "in", savedLecturesIds)
		.select(
			"publish.title",
			"publish.description",
			"publish.caption",
			"publish.author",
			"rating",
			"numberOfRatings",
			"enrolledUsers"
		)
		.get();

	const data: SavedLecture[] = querySnapshot.docs.map((doc) => {
		const {
			publish: { title, description, caption, author },
			rating,
			numberOfRatings,
			enrolledUsers,
		} = doc.data();

		return {
			id: doc.id,
			title,
			description,
			caption,
			author,
			rating,
			numberOfRatings,
			enrolledUsers,
		};
	});

	return data;
};

export const addSavedLectureIdData = async (id: string, lectureId: string) => {
	const userRef = firestoreDb.collection("users").doc(id);
	await userRef.update({ savedLectures: FieldValue.arrayUnion(lectureId) });

	return "Succesfully saved";
};

export const deleteSavedLectureIdData = async (
	id: string,
	lectureId: string
) => {
	const userRef = firestoreDb.collection("users").doc(id);
	await userRef.update({ savedLectures: FieldValue.arrayRemove(lectureId) });

	return "Succesfully deleted";
};

export const getAllSearchedLecturesData = async (
	filterValue: QueryFilterParams
) => {
	const { searchQuery } = filterValue;
	const searchValue = searchQuery.toLowerCase();

	const lectureRef = firestoreDb.collection("lectures");

	const querySnapshot = await lectureRef
		.select(
			"publish.title",
			"publish.language",
			"publish.description",
			"publish.caption",
			"publish.author",
			"publish.category",
			"rating",
			"duration",
			"lastUpdate",
			"numberOfRatings",
			"enrolledUsers"
		)
		.get();

	let lectures: SearchedLecture[] = querySnapshot.docs.map((doc) => {
		const {
			publish: { title, description, caption, author, category, language },
			rating,
			duration,
			lastUpdate,
			numberOfRatings,
			enrolledUsers,
		} = doc.data();

		return {
			id: doc.id,
			title,
			duration,
			language,
			description,
			caption,
			category,
			author,
			rating,
			lastUpdate,
			numberOfRatings,
			enrolledUsers,
		};
	});

	let searchedLectures = lectures.filter(
		(doc) =>
			!!doc.title.toLowerCase().includes(searchValue) ||
			!!doc.author.toLowerCase().includes(searchValue) ||
			!!doc.description?.toLowerCase().includes(searchValue) ||
			!!doc.category.toLowerCase().includes(searchValue)
	);

	const filteredLectures = applyFilters(searchedLectures, filterValue);

	return filteredLectures;
};

export const getLectureReviewsData = async (id: string) => {
	const reviewsRef = firestoreDb.collection(`lectures/${id}/reviews`);
	const reviewsSnap = await reviewsRef.get();

	const reviews = reviewsSnap.docs.map((doc) => doc.data()) as Review[];

	return reviews;
};

export const addLectureReviewData = async (
	id: string,
	userId: string,
	data: ReviewData
) => {
	const reviewsRef = firestoreDb
		.collection(`lectures/${id}/reviews`)
		.doc(userId);
	const lectureRef = firestoreDb.collection("lectures").doc(id);

	await reviewsRef.set({
		...data,
		authorId: userId,
		date: new Date().toISOString(),
	});

	await lectureRef.update({
		rating: FieldValue.increment(data.rating),
		numberOfRatings: FieldValue.increment(1),
	});

	return "Success";
};

export const deleteLectureReviewData = async (
	id: string,
	userId: string,
	rating: number
) => {
	const reviewsRef = firestoreDb
		.collection(`lectures/${id}/reviews`)
		.doc(userId);
	const lectureRef = firestoreDb.collection("lectures").doc(id);

	await reviewsRef.delete();
	await lectureRef.update({
		rating: FieldValue.increment(-rating),
		numberOfRatings: FieldValue.increment(-1),
	});

	return "Success";
};
