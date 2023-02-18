import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ValidatedRequest } from "./../models/request";
export type DecodedToken = {
	userId: string;
	email: string;
};
export default async (req: Request, res: Response, next: NextFunction) => {
	const validatedReq = req as ValidatedRequest;
	if (req.method === "OPTIONS") {
		return next();
	}
	try {
		if (!req.headers?.authorization) {
			throw new Error("Missing token!");
		}

		const token = req.headers?.authorization.split(" ")[1];

		if (!token) {
			throw new Error("Authentication failed!");
		}

		const decodedData = jwt.verify(token, "code") as DecodedToken;
		validatedReq.userData = { userId: decodedData.userId };

		next();
	} catch (err: any) {
		if (err instanceof jwt.JsonWebTokenError) {
			return res.status(401).json({ code: 401, message: err.message });
		}
		res.status(400).json({ code: 400, message: err.message });
	}
};
