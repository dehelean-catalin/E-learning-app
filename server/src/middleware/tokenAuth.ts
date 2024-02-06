import { RequestHandler } from "express";
import { adminAuth } from "../config/firebase-admin";
import { ValidatedRequest } from "../models/genericModels";

export class HttpError extends Error {
	statusCode: number;
	constructor(statusCode, message) {
		super(message);
		this.name = "HttpError";
		this.statusCode = statusCode;
	}
}

export const tokenAuth: RequestHandler = async (req, res, next) => {
	try {
		if (!req.headers?.authorization) throw new Error("Missing token!");

		const token = req.headers?.authorization.split(" ")[1];

		if (!token) throw new Error("Invalid token format");

		const decodedToken = await adminAuth.verifyIdToken(token);

		if (!decodedToken) throw new HttpError(401, "Unauthorized");

		(req as ValidatedRequest).userData = { userId: decodedToken.uid };

		next();
	} catch (err: any) {
		if (err.codePrefix === "auth") {
			return res
				.status(401)
				.json({ code: 401, message: err.errorInfo.message });
		}
		if (err instanceof HttpError) {
			return res
				.status(err.statusCode)
				.json({ code: err.statusCode, message: err.message });
		}
		res
			.status(500)
			.json({ code: 500, message: "Try again! Something went wrong" });
	}
};
