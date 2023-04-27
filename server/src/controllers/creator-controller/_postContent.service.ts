import { Request, Response } from "express";
import {
	getDownloadURL,
	getMetadata,
	getStorage,
	ref,
	uploadBytes,
} from "firebase/storage";

export interface FileRequest extends Request {
	file: {
		fieldname: string;
		originalname: string;
		encoding: string;
		mimetype: string;
		size: number;
		buffer: Buffer;
	};
}

export const postContent = async (req: Request, res: Response) => {
	const fileReq = req as FileRequest;
	const storage = getStorage();
	const storageRef = ref(storage, `content/` + fileReq.file?.originalname);

	try {
		await uploadBytes(storageRef, fileReq.file.buffer, {
			contentType: "video/*",
		});

		const content = await getDownloadURL(storageRef);
		getMetadata(storageRef)
			.then((metadata) => {
				console.log(metadata);
			})
			.catch((error) => {
				// Uh-oh, an error occurred!
			});
		res.status(200).json(content);
	} catch (err: any) {
		res.status(400).json({ code: 400, message: err.message });
	}
};
