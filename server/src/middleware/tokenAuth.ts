import { RequestHandler } from "express";
import { adminAuth } from "../config/firebase-admin";
import { ValidatedRequest } from "../models/genericModels";

class HttpError extends Error {
	statusCode: number;
	constructor(statusCode, message) {
		super(message);
		this.name = "HttpError";
		this.statusCode = statusCode;
	}
}

export const tokenAuth: RequestHandler = async (req, res, next) => {
	const validatedReq = req as ValidatedRequest;

	try {
		if (!req.headers?.authorization) throw new Error("Missing token!");
		const token = req.headers?.authorization.split(" ")[1];
		if (!token) throw new Error("Invalid token format");

		const decodedToken = await adminAuth.verifyIdToken(token);
		if (!decodedToken) throw new HttpError(401, "Unauthorized");

		validatedReq.userData = { userId: decodedToken.uid };

		next();
	} catch (err: any) {
		if (err instanceof HttpError) {
			return res
				.status(err.statusCode)
				.json({ code: err.statusCode, message: err.message });
		}
		res.status(400).json({ code: 400, message: err.message });
	}
};
