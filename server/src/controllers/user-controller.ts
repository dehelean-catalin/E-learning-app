import { NextFunction, Request, RequestHandler, Response } from "express";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import db from "../config/firebase";
import { firestoreDb } from "../config/firebase-admin";
import { FileRequest, ValidatedRequest } from "../models/genericModels";
import { Profile, UserDataModel, UserModel } from "../models/user-model";

export const getUserByID = async (req: Request, res: Response) => {
	try {
		const validatedReq = req as ValidatedRequest;
		const userRef = doc(db, "users", validatedReq.userData.userId);
		const userSnap = await getDoc(userRef);

		if (!userSnap.exists()) throw new Error("This user don't exist");

		const userData = userSnap.data() as UserModel;
		res.status(200).json(userData);
	} catch (err: any) {
		res.status(400).json({ code: 400, message: err.message });
	}
};

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

export const getProfilePicture = async (req: Request, res: Response) => {
	const validatedReq = req as ValidatedRequest;
	const userRef = doc(db, "users", validatedReq.userData.userId);
	try {
		const userSnap = await getDoc(userRef);
		if (!userSnap.exists()) throw new Error("This user don't exist");

		const profilePicture = userSnap.get("profilePicture") as UserDataModel;

		res.status(200).json(profilePicture);
	} catch (err: any) {
		res.status(400).json({ code: 400, message: err.message });
	}
};
export const putProfileData = async (req: Request, res: Response) => {
	const validatedReq = req as ValidatedRequest;
	const docRef = doc(db, "users", validatedReq.userData.userId);

	try {
		await updateDoc(docRef, req.body);
		res.status(200).json("Succesfully saved");
	} catch (err: any) {
		res.status(400).json({ code: 400, message: err.message });
	}
};
export const putProfilePicture: RequestHandler = async (req, res) => {
	const validatedReq = req as FileRequest;
	const storage = getStorage();
	const storageRef = ref(storage, "users/" + validatedReq.userData.userId);
	const docRef = doc(db, "users", validatedReq.userData.userId);

	try {
		await uploadBytes(storageRef, validatedReq.file.buffer, {
			contentType: "image/jpg",
		});
		const profilePicture = await getDownloadURL(storageRef);
		await updateDoc(docRef, { profilePicture });
		res.status(200).json(profilePicture);
	} catch (err: any) {
		res.status(400).json({ code: 400, message: err.message });
	}
};
