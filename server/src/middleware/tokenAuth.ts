import { RequestHandler } from "express";
import { adminAuth } from "../config/firebase-admin";
import { ValidatedRequest } from "../models/genericModels";

export const tokenAuth: RequestHandler = async (req, res, next) => {
	const validatedReq = req as ValidatedRequest;

	try {
		if (!req.headers?.authorization) throw new Error("Missing token!");
		const token = req.headers?.authorization.split(" ")[1];
		if (!token) throw new Error("Invalid token format");

		const decodedToken = await adminAuth.verifyIdToken(token);
		validatedReq.userData = { userId: decodedToken.uid };

		next();
	} catch (err: any) {
		res.status(400).json({ code: 400, message: err.message });
	}
};
