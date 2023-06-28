import { NextFunction, Request, Response } from "express";
import { adminAuth } from "../config/firebase-admin";
import { ValidatedRequest } from "./../models/request";

export type DecodedToken = {
	userId: string;
	email: string;
};

export default async (req: Request, res: Response, next: NextFunction) => {
	const validatedReq = req as ValidatedRequest;
	if (req.method === "OPTIONS") return next();

	try {
		if (!req.headers?.authorization) throw new Error("Missing token!");

		const token = req.headers?.authorization.split(" ")[1];

		if (!token) throw new Error("Authentication failed!");
		const decodedToken = await adminAuth.verifyIdToken(token);

		validatedReq.userData = { userId: decodedToken.uid };

		next();
	} catch (err: any) {
		res.status(400).json({ code: 400, message: err.message });
	}
};
