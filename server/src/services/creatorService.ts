import { PrerecordedTranscriptionResponse } from "@deepgram/sdk/dist/types";
import { WriteResult } from "firebase-admin/firestore";
import { deepgram, firestoreDb, storageDb } from "../config/firebase-admin";
import {
	CreatedLectureModel,
	DashboardLecture,
	LectureTemplateData,
} from "../models/creatorModels";

export const createLectureTemplateData = async (
	userId: string,
	data: LectureTemplateData
) => {
	const lectureRef = firestoreDb.collection(`users/${userId}/createdLectures`);

	const lectureData: Omit<CreatedLectureModel, "id"> = {
		lastUpdate: new Date().getTime(),
		publish: {
			...data,
			status: "Draft",
			caption: "",
			promoVideo: "",
			authorId: userId,
			description: "",
			level: "Beginner",
		},
		content: [],
		goals: ["", "", ""],
		requirements: ["", "", ""],
		enrolledUsers: [],
		numberOfRatings: 0,
		rating: 0,
		duration: 0,
	};

	await lectureRef.add(lectureData);

	return "Successfully created";
};

export const getAllCreatedLecturesData = async (userId: string) => {
	const createdLectureRef = firestoreDb.collection(
		`users/${userId}/createdLectures`
	);
	const lectureRef = firestoreDb
		.collection("lectures")
		.where("publish.authorId", "==", userId);

	const draftLectureSnap = await createdLectureRef.get();
	const publicLectureSnap = await lectureRef.get();

	const dashboardLecture: DashboardLecture[] = draftLectureSnap.docs.map(
		(doc) => {
			const { publish, rating, enrolledUsers, lastUpdate, numberOfRatings } =
				doc.data() as CreatedLectureModel;

			return {
				id: doc.id,
				publish,
				rating,
				enrolledUsers,
				lastUpdate,
				numberOfRatings,
			};
		}
	);

	publicLectureSnap.docs.forEach((doc) => {
		const { publish, rating, enrolledUsers, lastUpdate, numberOfRatings } =
			doc.data() as CreatedLectureModel;
		dashboardLecture.push({
			id: doc.id,
			publish,
			rating,
			enrolledUsers,
			lastUpdate,
			numberOfRatings,
		});
	});

	return dashboardLecture.sort((a, b) => b.lastUpdate - a.lastUpdate);
};

export const getCreatedLectureByIdData = async (id: string, userId: string) => {
	const createdLectureRef = firestoreDb
		.collection(`users/${userId}/createdLectures`)
		.doc(id);
	const lectureRef = firestoreDb.collection("lectures").doc(id);

	let docSnap = await createdLectureRef.get();

	if (!docSnap.exists) docSnap = await lectureRef.get();
	if (!docSnap.exists) throw new Error("Lecture not found");

	const data = { id, ...docSnap.data() } as CreatedLectureModel;

	return data;
};

export const updateCreatedLectureData = async (
	id: string,
	userId: string,
	data: CreatedLectureModel
) => {
	const lectureRef = firestoreDb
		.collection(`users/${userId}/createdLectures`)
		.doc(id);

	await lectureRef.update({
		...data,
		lastUpdate: new Date().getTime(),
	});

	return "Successfully created";
};

export const uploadLessonData = async (id, buffer, originalname) => {
	const file = storageDb.file(`content/${id}/${originalname}`);
	const trackFile = storageDb.file(`track/${id}/${originalname}`);
	const audioSource = { buffer, mimetype: "video" };

	await file.save(buffer, {
		resumable: true,
		contentType: "video/*",
	});

	const transcription = (await deepgram.transcription.preRecorded(audioSource, {
		punctuate: true,
		utterances: true,
		profanity_filter: true,
		language: "en",
	})) as PrerecordedTranscriptionResponse;

	const vttContent = transcription.toWebVTT();
	const vttUint8Array = new TextEncoder().encode(vttContent);
	const trackBuffer = Buffer.from(vttUint8Array);

	await trackFile.save(trackBuffer, {
		resumable: true,
		contentType: "text/vtt",
	});

	const [content] = await file.getSignedUrl({
		action: "read",
		expires: "2050-12-12",
	});
	const [track] = await file.getSignedUrl({
		action: "read",
		expires: "2050-12-12",
	});

	return { content, track };
};

export const publishLectureData = async (
	id: string,
	userId: string,
	data: CreatedLectureModel
) => {
	const createdLectureRef = firestoreDb
		.collection(`users/${userId}/createdLectures`)
		.doc(id);
	const lectureRef = firestoreDb.collection("lectures").doc(id);

	await lectureRef.create({
		...data,
		publish: { ...data.publish, status: "Public" },
	});
	await createdLectureRef.delete();

	return "Successfully published";
};

export const deleteLectureData = async (id: string, userId: string) => {
	const deleteLecturePromises: Promise<WriteResult | unknown>[] = [];

	const createdLectureRef = firestoreDb
		.collection(`users/${userId}/createdLectures/`)
		.doc(id);
	deleteLecturePromises.push(createdLectureRef.delete());

	const lectureRef = firestoreDb.collection("lectures").doc(id);
	deleteLecturePromises.push(lectureRef.delete());

	const [content] = await storageDb.getFiles({
		prefix: `content/${id}`,
	});

	if (!!content.length)
		content.forEach((file) => {
			deleteLecturePromises.push(file.delete());
		});

	const [track] = await storageDb.getFiles({
		prefix: `track/${id}`,
	});

	if (!!track.length)
		track.forEach((file) => {
			deleteLecturePromises.push(file.delete());
		});

	await Promise.all(deleteLecturePromises);

	return "Successfully deleted";
};
