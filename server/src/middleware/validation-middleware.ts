import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";

export default function authorization(model: ObjectSchema) {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { error } = model.validate(req.body);
			if (error)
				throw new Error(`${error.details.map((x) => x.message).join(" ")}`);

			next();
		} catch (err: any) {
			console.log(err);
			return res.status(400).json({ code: 400, message: err.message });
		}
	};
}
