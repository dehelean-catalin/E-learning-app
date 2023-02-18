import { Request, Response } from "express";
import { ProviderAuthModel } from "../../models/auth-model";
import { ResponseErrorModel } from "../../models/error-model";

export type LoginWithCutsomProvider = (
	req: Request<any, any, ProviderAuthModel>,
	res: Response<string | ResponseErrorModel>
) => void;
