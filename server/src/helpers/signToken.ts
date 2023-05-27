import jwt from "jsonwebtoken";

require("dotenv").config();

export const signToken = (userId: string, email: string) => {
	const secretKey = process.env.JWT_KEY!;
	const expiresIn = process.env.EXPIRATION_TIME;
	return jwt.sign({ userId, email }, secretKey, {
		expiresIn,
	});
};
