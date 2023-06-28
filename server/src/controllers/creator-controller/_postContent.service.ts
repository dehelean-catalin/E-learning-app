import { Deepgram } from "@deepgram/sdk";
import { Request, Response } from "express";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { v4 as uuid } from "uuid";

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
const deepgram = new Deepgram("2a13dd5e7f255c33ce8556d7544f7ce7226b8d51");

export const postContent = async (req: Request, res: Response) => {
	const fileReq = req as FileRequest;
	const storage = getStorage();
	const storageRef = ref(storage, `content/` + fileReq.file?.originalname);
	const audioSource = { buffer: fileReq.file.buffer, mimetype: "video" };
	const trackRef = ref(storage, `track/` + fileReq.file?.originalname + uuid());

	try {
		await uploadBytes(storageRef, fileReq.file.buffer, {
			contentType: "video/*",
		});
		const response: any = await deepgram.transcription.preRecorded(
			audioSource,
			{
				punctuate: true,
				utterances: true,
				profanity_filter: true,
				language: "en",
			}
		);

		const vttContent = response.toWebVTT();
		const vttUint8Array = new TextEncoder().encode(vttContent);

		await uploadBytes(trackRef, vttUint8Array, {
			contentType: "text/vtt",
		});

		const content = await getDownloadURL(storageRef);
		const track = await getDownloadURL(trackRef);

		res.status(200).json({ content, track });
	} catch (err: any) {
		res.status(400).json({ code: 400, message: err.message });
	}
};
