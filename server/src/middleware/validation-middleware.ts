import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";
import jwt from "jsonwebtoken";
import { adminAuth } from "../config/firebase-admin";
import { ValidatedRequest } from "../models/genericModels";

export default function authorization(model: ObjectSchema) {
	return async (req: Request, res: Response, next: NextFunction) => {
		if (req.method === "OPTIONS") return next();
		const validatedReq = req as ValidatedRequest;
		try {
			if (!req.headers?.authorization) throw new Error("Missing token");

			const token = req.headers?.authorization.split(" ")[1];
			if (!token) throw new Error("Authentication failed!");

			const { error } = model.validate(req.body);
			if (error)
				throw new Error(`${error.details.map((x) => x.message).join(" ")}`);

			const decodedToken = await adminAuth.verifyIdToken(token);

			validatedReq.userData = { userId: decodedToken.uid };
			next();
		} catch (err: any) {
			if (err instanceof jwt.JsonWebTokenError) {
				return res.status(401).json({ code: 401, message: err.message });
			}

			return res.status(400).json({ code: 400, message: err.message });
		}
	};
}
