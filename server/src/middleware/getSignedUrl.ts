import { RequestHandler } from "express";

export const getSignedUrl: RequestHandler = async (req, res) => {
	try {
		const file = res.locals.file;
		const [url] = await file.getSignedUrl({
			action: "read",
			expires: "9999-10-10",
		});
		res.locals.file = undefined;

		res.status(200).json(url);
	} catch (err: any) {
		res.status(400).json({ code: 400, message: err.message });
	}
};
