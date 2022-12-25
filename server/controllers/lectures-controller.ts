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
import db from "../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import axios from "axios";

interface Lecture {
	id: string;
	title: string;
	thumbnail: string;
	createdBy: string;
	rating: number;
	numberOfRates: number;
}
interface Params {
	id: string;
}
enum ICategory {
	ALL = "all",
	UTCN = "utcn",
	Design = "design",
	DataSience = "dataSience",
	Web = "web",
	Arhitecture = "arhitecture",
	Electronics = "electronics",
	Psychology = "psychology",
	History = "history",
	Policy = "policy",
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
	req: Request<{}, {}, {}, Query>,
	res: Response
) => {
	let lectures: any = [];
	let querySnapshot: QuerySnapshot;

	try {
		if (!req.query?.category) {
			throw new Error("Missing category!");
		}
		if (!FILTERS.includes(req.query.category)) {
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

		let basicLectures: Lecture[] = [];
		lectures.forEach(
			({ id, thumbnail, title, createdBy, rating, numberOfRates }: Lecture) =>
				basicLectures.push({
					id,
					thumbnail,
					title,
					createdBy,
					rating,
					numberOfRates,
				})
		);
		if (!basicLectures.length) {
			throw new Error("Something went wrong");
		}
		res.status(200).json(basicLectures);
	} catch (err: any) {
		res.status(400).json({ code: 400, message: err.message });
	}
};

export const getLectureById = async (
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

// export const getUrl = async (req: any, response: Response) => {
// 	const storage = getStorage();
// 	// getDownloadURL(ref(storage, "images/Dehelean_Rares_Catalin.pdf")).then(
// 	// 	(url) => console.log(url)
// 	// );
// 	axios
// 		.get(
// 			"https://firebasestorage.googleapis.com/v0/b/licenta-986d3.appspot.com/o/images%2FDehelean_Rares_Catalin.pdf?alt=media&token=bbc2deb6-a447-463c-af64-c2d446362f31"
// 		)
// 		.then((res) => response.send(res.data));
// };
