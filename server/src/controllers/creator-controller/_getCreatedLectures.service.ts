import { Request, Response } from "express";
import { collection, getDocs } from "firebase/firestore";
import db from "../../config/firebase";
import { tryAgainError } from "../../constant";
import { ValidatedRequest } from "../../models/request";

export const getCreatedLectures = async (req: Request, res: Response) => {
	const validatedReq = req as ValidatedRequest;
	const lectureRef = collection(
		db,
		`users/${validatedReq.userData.userId}/createdLectures`
	);

	try {
		// let q = query(lectureRef, limit(4));

		// const docRef = doc(
		// 	db,
		// 	`users/${validatedReq.userData.userId}/createdLectures/${req.query.lectureId}`
		// );
		// const docSnap = await getDoc(docRef);

		// if (req.query.direction === "forward") {
		// 	console.log("forward");
		// 	q = query(lectureRef, orderBy("id"), startAfter(docSnap), limit(4));
		// 	console.log(q);
		// }

		// if (req.query.direction === "backward")
		// 	q = query(lectureRef, orderBy("id"), endBefore(docSnap), limitToLast(4));

		// if (req.query.direction === "final")
		// 	q = query(
		// 		lectureRef,
		// 		orderBy("id"),
		// 		limitToLast(
		// 			Number(req.query.items) % 4 === 0 ? 4 : Number(req.query.items) % 4
		// 		)
		// 	);

		const snapshot = await getDocs(lectureRef);

		const items = snapshot.docs.map((doc) => doc.data());

		res.status(200).json(items);
	} catch (err) {
		console.error(err);
		res.status(400).json(tryAgainError);
	}
};
