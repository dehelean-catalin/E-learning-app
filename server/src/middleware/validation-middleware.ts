import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";
import { ValidatedRequest } from "../models/request";

export default function authorization(model: ObjectSchema) {
	return (req: Request, res: Response, next: NextFunction) => {
		if (req.method === "OPTIONS") {
			return next();
		}
		if (!req.headers?.authorization) {
			throw new Error("Missing token");
		}
		try {
			const validatedReq = req as ValidatedRequest;

			const token = req.headers?.authorization.split(" ")[1];

			const { error } = model.validate(req.body);

			if (!token) {
				throw new Error("Authentication failed!");
			}
			const decodedData: any = jwt.verify(token, "code");
			if (error) {
				throw new Error(`${error.details.map((x) => x.message).join(" ")}`);
			}
			validatedReq.userData = { userId: decodedData.userId };
			next();
		} catch (err: any) {
			if (err instanceof jwt.JsonWebTokenError) {
				return res.status(401).json({ code: 401, message: err.message });
			}
			return res.status(400).json({ code: 400, message: err.message });
		}
	};
}
