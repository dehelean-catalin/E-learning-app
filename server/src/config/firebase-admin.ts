import admin from "firebase-admin";
import { getAuth } from "firebase-admin/auth";

const secrets = require("./secrets.json");

export const adminInit = admin.initializeApp({
	credential: admin.credential.cert(secrets),
	databaseURL:
		"https://licenta-986d3-default-rtdb.europe-west1.firebasedatabase.app",
	storageBucket: "licenta-986d3.appspot.com",
});

export const adminAuth = getAuth();
