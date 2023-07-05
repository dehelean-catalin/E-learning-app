import { firestoreDb } from "../config/firebase-admin";
import {
	CreatedLectureModel,
	DashboardLecture,
	LectureTemplateData,
} from "../models/creator.model";

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
