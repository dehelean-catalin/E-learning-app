import { Request } from "express";

export interface ValidatedRequest extends Request {
	userData: {
		userId: string;
	};
}
