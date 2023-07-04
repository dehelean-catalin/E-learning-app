import { NextFunction, Request, Response } from "express";
import { doc } from "firebase/firestore";
import db from "../../config/firebase";
import { firestoreDb } from "../../config/firebase-admin";
import { ValidatedRequest } from "../../models/genericModels";
import { Profile, UserDataModel } from "../../models/user-model";

export const getProfileData = async (
	req: Request,
	res: Response<Profile>,
	next: NextFunction
) => {
	const validatedReq = req as ValidatedRequest;
	const { userId } = validatedReq.userData;
	const userRef = doc(db, "users", validatedReq.userData.userId);
	try {
		const userRef = firestoreDb.collection("users").doc(userId);
		const userSnap = await userRef.get();
		if (!userSnap.exists) throw new Error("This user don't exist");

		const userData = userSnap.data() as UserDataModel;

		res.status(200).json({
			email: userData.email,
			displayName: userData.displayName,
			profilePicture: userData?.profilePicture,
			phoneNumber: userData?.phoneNumber,
			address: userData?.address,
			aboutYou: userData?.aboutYou,
		});
	} catch (err) {
		next(err);
	}
};
