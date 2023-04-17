import { Response } from "express";
import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import db from "../../config/firebase";
import { ValidatedRequest } from "../../models/request";

export const updatePromoVideo = async (req: any, res: Response) => {
	const validatedReq = req as ValidatedRequest;
	const storage = getStorage();

	const storageRef = ref(storage, `users/promoVideo`);
	const lectureRef = doc(
		db,
		`users/${validatedReq.userData.userId}/createdLectures/${req.params.id}`
	);

	try {
		await uploadBytes(storageRef, req.file.buffer, {
			contentType: "image/jpg",
		});
		const promoVideo = await getDownloadURL(storageRef);
		await updateDoc(lectureRef, { "publish.promoVideo": promoVideo });

		res.status(200).json("Success");
	} catch (err: any) {
		res.status(400).json({ code: 400, message: err.message });
	}
};
