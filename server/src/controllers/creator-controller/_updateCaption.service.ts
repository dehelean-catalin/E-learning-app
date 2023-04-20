import { Request, Response } from "express";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { FileRequest } from "./_postContent.service";

export const updateCaption = async (req: Request, res: Response) => {
	const fileReq = req as FileRequest;
	const storage = getStorage();

	const storageRef = ref(storage, "caption" + fileReq.file.originalname);

	try {
		await uploadBytes(storageRef, fileReq.file.buffer, {
			contentType: "image/jpg",
		});

		const caption = await getDownloadURL(storageRef);

		res.status(200).json(caption);
	} catch (err: any) {
		res.status(400).json({ code: 400, message: err.message });
	}
};
