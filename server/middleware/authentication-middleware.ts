import { ObjectSchema } from "joi";
import { NextFunction, Request, Response } from "express";

export default function authentication(model: ObjectSchema) {
	return (req: Request, res: Response, next: NextFunction) => {
		const { error } = model.validate(req.body);
		if (error) {
			return res.status(400).json({
				code: 400,
				message: `${error.details.map((x) => x.message).join(" ")}`,
			});
		}
		next();
	};
}
