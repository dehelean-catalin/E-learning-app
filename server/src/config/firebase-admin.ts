import admin from "firebase-admin";
import { getAuth } from "firebase-admin/auth";

const secrets = require("./secrets.json");

export const adminInit = admin.initializeApp({
	credential: admin.credential.cert(secrets),
	databaseURL: process.env.DATABASE_URL,
	storageBucket: process.env.STORAGE_BUCKET,
});

export const adminAuth = getAuth();
