import jwt from "jsonwebtoken";
export const signToken = (userId: string, email: string) => {
	return jwt.sign({ userId, email }, "code", {
		expiresIn: `2h`,
	});
};
