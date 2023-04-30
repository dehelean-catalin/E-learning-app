import { Response } from "express";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { ValidatedRequest } from "../../models/request";

export const updatePromoVideo = async (req: any, res: Response) => {
	const validatedReq = req as ValidatedRequest;
	const storage = getStorage();

	const storageRef = ref(storage, `users/promoVideo`);

	try {
		await uploadBytes(storageRef, req.file.buffer, {
			contentType: "image/jpg",
		});
		const promoVideo = await getDownloadURL(storageRef);

		res.status(200).json(promoVideo);
	} catch (err: any) {
		res.status(400).json({ code: 400, message: err.message });
	}
};
