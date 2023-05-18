import { Response } from "express";
import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import db from "../../config/firebase";
import { ValidatedRequest } from "../../models/request";

export const putProfilePicture = async (req: any, res: Response) => {
	const validatedReq = req as ValidatedRequest;
	const storage = getStorage();
	const storageRef = ref(storage, "users/" + validatedReq.userData.userId);
	const docRef = doc(db, "users", validatedReq.userData.userId);

	try {
		await uploadBytes(storageRef, req.file.buffer, {
			contentType: "image/jpg",
		});
		const profilePicture = await getDownloadURL(storageRef);
		await updateDoc(docRef, { profilePicture });
		res.status(200).json(profilePicture);
	} catch (err: any) {
		res.status(400).json({ code: 400, message: err.message });
	}
};
