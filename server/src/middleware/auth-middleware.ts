import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";
import { LoginModel, ProviderAuthModel } from "../models/auth-model";

export default function authentication(
	model: ObjectSchema<ProviderAuthModel | LoginModel>
) {
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
