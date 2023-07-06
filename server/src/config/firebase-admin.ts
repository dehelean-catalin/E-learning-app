import { Deepgram } from "@deepgram/sdk";
import admin from "firebase-admin";
import { getAuth } from "firebase-admin/auth";

const secrets = require("./secrets.json");

export const adminDb = admin.initializeApp({
	credential: admin.credential.cert(secrets),
	databaseURL:
		"https://licenta-986d3-default-rtdb.europe-west1.firebasedatabase.app",
	storageBucket: "licenta-986d3.appspot.com",
});

export const firestoreDb = adminDb.firestore();
export const storageDb = adminDb.storage().bucket();
export const adminAuth = getAuth();

export const deepgram = new Deepgram(
	"2a13dd5e7f255c33ce8556d7544f7ce7226b8d51"
);
