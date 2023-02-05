import admin from "firebase-admin";
import { getAuth } from "firebase-admin/auth";
const secrets = require("./secrets.json");

const adminInit = admin.initializeApp({
	credential: admin.credential.cert(secrets),
	databaseURL:
		"https://licenta-986d3-default-rtdb.europe-west1.firebasedatabase.app",
});

export const adminAuth = getAuth();
