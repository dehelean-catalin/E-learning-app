import { Request, Response } from "express";
import {
	collection,
	doc,
	getDoc,
	getDocs,
	query,
	QueryDocumentSnapshot,
	QuerySnapshot,
	setDoc,
	where,
} from "firebase/firestore";
import { v4 as uuid } from "uuid";
import db from "../firebase";
import { ICategory, LectureModel } from "../models/lecture-model";

interface Params {
	id: string;
}

interface Query {
	category: ICategory;
}

const FILTERS = [
	ICategory.ALL,
	ICategory.UTCN,
	ICategory.Design,
	ICategory.DataSience,
	ICategory.Web,
	ICategory.Electronics,
	ICategory.Arhitecture,
	ICategory.History,
	ICategory.Psychology,
	ICategory.Policy,
];
export const getLectures = async (
	req: Request<any, any, Query, any>,
	res: Response
) => {
	let lectures: any = [];
	let querySnapshot: QuerySnapshot;

	try {
		if (!req.query?.category) {
			throw new Error("Missing category!");
		}
		if (!FILTERS.includes(req.query?.category)) {
			throw new Error("Category doesnt exist !");
		}
		if (req.query.category === "all") {
			querySnapshot = await getDocs(collection(db, "lectures"));
		} else {
			const q = query(
				collection(db, "lectures"),
				where("category", "==", req.query.category)
			);
			querySnapshot = await getDocs(q);
		}

		querySnapshot.forEach((doc: QueryDocumentSnapshot) => {
			lectures.push(doc.data());
		});

		let basicLectures: any = [];
		lectures.forEach(
			({ id, thumbnail, title, createdBy, items, reviewList }: LectureModel) =>
				basicLectures.push({
					id,
					thumbnail,
					title,
					createdBy,
					items,
					reviewList,
				})
		);

		res.status(200).json(basicLectures);
	} catch (err: any) {
		res.status(400).json({ code: 400, message: err.message });
	}
};

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

export const addLecture = async (req: Request, res: Response) => {
	const id = uuid();
	try {
		await setDoc(doc(db, "lectures", id), { id, ...req.body });

		res.status(200).json(" Lecture was added");
	} catch (err: any) {
		res.status(400).json({ code: 400, message: err.message });
	}
};

export const getSavedLectures = async (req: any, res: Response) => {
	let savedLecturesArray: any[] = [];
	try {
		const docRef = doc(db, "users", req.userData.userId);
		const docSnap = await getDoc(docRef);
		if (!docSnap.exists()) {
			throw new Error("This Lecture dont exist");
		}
		const { savedLectures } = docSnap.data();
		if (!savedLectures.length) {
			res.status(200).json(savedLecturesArray);
		} else {
			const q = query(
				collection(db, "lectures"),
				where("id", "in", savedLectures)
			);
			const querySnapshot = await getDocs(q);
			querySnapshot.forEach((doc) => {
				savedLecturesArray.push(doc.data());
			});
			res.status(200).json(savedLecturesArray);
		}
	} catch (err: any) {
		res.status(400).json({ code: 400, message: err.message });
	}
};
