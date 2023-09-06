import { firestoreDb } from "../config/firebase-admin";

import { FieldValue } from "firebase-admin/firestore";
import { HistoryLecture } from "../models/lectureModels";
import {
	HistoryModel,
	VideoProgress,
	VideoProgressItem,
} from "../models/userModels";

export const getMonitoringHistoryListData = async (id: string) => {
	const userRef = firestoreDb.collection("users").doc(id);
	const userSnap = await userRef.get();

	if (!userSnap.exists) throw new Error("This user don't exists");

	const progress: HistoryModel[] = userSnap.get("history");

	if (!progress.length) return [];

	const lectureIds = progress.map((h) => h.id);
	const lectureRef = firestoreDb
		.collection("lectures")
		.where("id", "in", lectureIds)
		.select(
			"publish.title",
			"publish.language",
			"publish.caption",
			"publish.author",
			"publish.category",
			"content",
			"rating",
			"duration",
			"lastUpdate",
			"numberOfRatings",
			"enrolledUsers"
		);

	const querySnapshot = await lectureRef.get();

	const lectures = querySnapshot.docs.map((doc) => {
		const {
			publish: { title, caption, author },
			rating,
			duration,
			numberOfRatings,
			enrolledUsers,
			content,
		} = doc.data();

		return {
			id: doc.id,
			title,
			caption,
			author,
			rating,
			numberOfRatings,
			enrolledUsers,
			duration,
			content,
		};
	});

	const convertedLectures: HistoryLecture[] = lectures.map((doc) => {
		const duration =
			doc.content.map((c) => c.children.map((i) => i.data?.duration)).flat() ??
			[];

		const currentVideoProgress = progress.find(
			(p) => p.id === doc.id
		)?.videoProgress;

		if (!currentVideoProgress) throw new Error("Progress not found");

		const totalProgress = currentVideoProgress.items.map((i) => i.total);

		const completed = duration?.filter(
			(d, index) => Math.round(d - d / 20) <= Math.round(totalProgress[index])
		).length;

		delete doc["content"];

		return {
			...doc,
			progress: (completed / totalProgress.length) * 100,
			lastChapter: currentVideoProgress.lastChapter,
			lastName: currentVideoProgress.lastName,
			date: currentVideoProgress.lastDate,
		};
	});

	const sortedLectures = convertedLectures.sort((a, b) => {
		const dateA = new Date(a.date);
		const dateB = new Date(b.date);

		return dateB.getTime() - dateA.getTime();
	});

	return sortedLectures;
};

export const getLectureProgressData = async (id: string, userId: string) => {
	const userRef = firestoreDb.collection("users").doc(userId);
	const userSnap = await userRef.get();

	if (!userSnap.exists) throw new Error("User not found");

	const history: HistoryModel[] = userSnap.get("history");

	const historyItem = history.find((i) => i.id === id);

	if (!historyItem) return [];

	return historyItem.videoProgress;
};

export const createLectureProgressData = async (
	id: string,
	userId: string,
	data: { items: string[]; lastName: string }
) => {
	const { items, lastName } = data;
	const userRef = firestoreDb.collection("users").doc(userId);
	const lectureRef = firestoreDb.collection("lectures").doc(id);

	await lectureRef.update({ enrolledUsers: FieldValue.arrayUnion(userId) });

	const userSnap = await userRef.get();

	if (!userSnap.exists) throw new Error("User not found");

	const history: HistoryModel[] = userSnap.get("history");

	if (history.find((h) => h.id === id))
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

	userRef.update({ history: history });

	return "Successfully enrolled";
};

export const updateLectureProgressData = async (
	id: string,
	userId: string,
	data: { progress: number; chapterId: string }
) => {
	const { chapterId, progress } = data;

	const userRef = firestoreDb.collection("users").doc(userId);

	const userSnap = await userRef.get();

	const history: HistoryModel[] = userSnap.get("history");

	let currentLecture = history.find((h) => h.id === id)?.videoProgress;
	if (!currentLecture) throw new Error("Lecture not found");

	currentLecture.lastDate = new Date().toISOString();

	currentLecture.items.forEach((i) => {
		if (i.id === chapterId) {
			i.current = progress;

			if (i.total < i.current) {
				i.total = i.current;
			}
		}
	});

	userRef.update({ history });

	return currentLecture.items;
};

export const getLastChapterIdData = async (id: string, userId: string) => {
	const userRef = firestoreDb.collection("users").doc(userId);

	const userSnap = await userRef.get();

	if (!userSnap.exists) throw new Error("Document not found");

	const history: HistoryModel[] = userSnap.get("history");
	const lastChapterId = history.find((doc) => doc.id === id);

	if (!lastChapterId) throw new Error("Document not found");

	return lastChapterId.videoProgress.lastChapter;
};

export const updateLastChapterData = async (
	id: string,
	userId: string,
	data: { lastChapter: string; lastName: string }
) => {
	const userRef = firestoreDb.collection("users").doc(userId);

	const userSnap = await userRef.get();
	const history: HistoryModel[] = userSnap.get("history");

	history.forEach((doc) => {
		if (doc.id === id) {
			doc.videoProgress.lastDate = new Date().toISOString();
			doc.videoProgress.lastName = data.lastName;
			doc.videoProgress.lastChapter = data.lastChapter;
		}
	});

	await userRef.update({ history });

	return "Success";
};
