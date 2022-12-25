import { Request, Response } from "express";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import db from "../firebase";

export const getUserData = async (req: any, res: Response) => {
	try {
		const docRef = doc(db, "users", req.userData.userId);
		const docSnap = await getDoc(docRef);
		if (!docSnap.exists()) {
			throw new Error("This user don't exist");
		}
		const { firstName, lastName, address, aboutYou, phoneNumber } =
			docSnap.data();
		res.status(200).json({
			firstName,
			lastName,
			address,
			aboutYou,
			phoneNumber,
		});
	} catch (err: any) {
		res.status(400).json({ code: 400, message: err.message });
	}
};

export const addUserData = async (req: any, res: Response) => {
	try {
		const docRef = doc(db, "users", req.userData.userId);
		await setDoc(docRef, req.body);
		res.status(200).json("Succesfully saved");
	} catch (err: any) {
		res.status(400).json({ code: 400, message: err.message });
	}
};

export const updateUserData = async (req: any, res: Response) => {
	try {
		const docRef = doc(db, "users", req.userData.userId);
		await updateDoc(docRef, req.body);
		res.status(200).json("Succesfully saved");
	} catch (err: any) {
		res.status(400).json({ code: 400, message: err.message });
	}
};

export const addUserSavedLecture = async (req: any, res: Response) => {
	try {
		const docRef = doc(db, "users", req.userData.userId);
		const docSnap = await getDoc(docRef);

		if (!docSnap.exists()) {
			throw new Error("Try again! Something went wrong");
		}
		const { savedLectures } = docSnap.data();
		if (savedLectures?.includes(req.body.id)) {
			throw new Error("Lecture is already saved");
		}

		savedLectures.push(req.body.id);

		await updateDoc(docRef, {
			savedLectures,
		});

		res.status(200).json({ code: 200, message: "Succesfully saved" });
	} catch (err: any) {
		return res.status(400).json({ code: 400, message: err.message });
	}
};

export const deleteUserSavedLecture = async (req: any, res: Response) => {
	try {
		const docRef = doc(db, "users", req.userData.userId);
		const docSnap = await getDoc(docRef);
		if (!docSnap.exists()) {
			throw new Error("Try again! Something went wrong");
		}

		let { savedLectures } = docSnap.data();
		savedLectures = savedLectures.filter(
			(lectureId: string) => lectureId !== req.body.id
		);
		await updateDoc(docRef, { savedLectures });
		res.status(200).json(savedLectures);
	} catch (err: any) {
		return res.status(400).json({ code: 400, message: err.message });
	}
};

export const getWatchingLectures = async (req: any, res: Response) => {
	try {
		const docRef = doc(db, "users", req.userData.userId);
		const docSnap = await getDoc(docRef);
		if (!docSnap.exists()) {
			throw new Error("Try again! Something went wrong");
		}

		let { watchingLectures } = docSnap.data();
		const value = watchingLectures.find((i: any) => i.id == req.query.id);
		const data = value?.progress.find((i: any) => i.page == req.query.page);
		res.status(200).json(data.value);
	} catch (err: any) {
		return res.status(400).json({ code: 400, message: err.message });
	}
};
export const addWatchingLectures = async (req: any, res: Response) => {
	try {
		const docRef = doc(db, "users", req.userData.userId);
		const docSnap = await getDoc(docRef);
		if (!docSnap.exists()) {
			throw new Error("Try again! Something went wrong");
		}

		let { watchingLectures } = docSnap.data();

		watchingLectures.push(req.body);

		await updateDoc(docRef, {
			watchingLectures,
		});

		res.status(200).json({ code: 200, message: "Succesfully saved" });
	} catch (err: any) {
		return res.status(400).json({ code: 400, message: err.message });
	}
};
export const updateWatchingLectures = async (req: any, res: Response) => {
	try {
		const docRef = doc(db, "users", req.userData.userId);
		const docSnap = await getDoc(docRef);
		if (!docSnap.exists()) {
			throw new Error("Try again! Something went wrong");
		}

		let { watchingLectures } = docSnap.data();

		watchingLectures.forEach((i: any) => {
			if (i.id === req.query.id) {
				i.progress.forEach((p: any) => {
					if (p.page == req.query.page) {
						p.value = req.body.value;
					}
				});
			}
		});

		await updateDoc(docRef, {
			watchingLectures,
		});

		res.status(200).json("succes");
	} catch (err: any) {
		return res.status(400).json({ code: 400, message: err.message });
	}
};
// export const getAllUserSavedLectures = async (req: any, res: Response) => {
// 	try {
// 		const docRef = doc(db, "users", req.userData.userId);
// 		const docSnap = await getDoc(docRef);
// 		if (!docSnap.exists()) {
// 			throw new Error("Try again! Something went wrong");
// 		}
// 		const { savedLectures } = docSnap.data();
// 		console.log(savedLectures);
// 		res.status(200).json(savedLectures);
// 	} catch (err: any) {
// 		return res.status(400).json({ code: 401, message: err.message });
// 	}
// };
