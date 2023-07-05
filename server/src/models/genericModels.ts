import { Request } from "express";

export interface ValidatedRequest extends Request {
	userData: {
		userId: string;
	};
}
export interface FileRequest extends ValidatedRequest {
	file: {
		fieldname: string;
		originalname: string;
		encoding: string;
		mimetype: string;
		size: number;
		buffer: Buffer;
	};
}
