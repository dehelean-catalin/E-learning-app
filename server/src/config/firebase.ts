import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyAMCfsGozkpBxF4I32Xq5gqj5RaxNHu37g",
	authDomain: "licenta-986d3.firebaseapp.com",
	databaseURL:
		"https://licenta-986d3-default-rtdb.europe-west1.firebasedatabase.app",
	projectId: "licenta-986d3",
	storageBucket: "licenta-986d3.appspot.com",
	messagingSenderId: "1073679862747",
	appId: "1:1073679862747:web:ad5b3cacea733901dbf5fe",
	measurementId: "G-7N69D2R5N9",
};

export const application = initializeApp(firebaseConfig);

const database = getFirestore(application);
export const auth = getAuth(application);

export const storage = getStorage(application);

export const loginRoute = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${firebaseConfig.apiKey}`;
export const registerRoute = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${firebaseConfig.apiKey}`;
export const baseRoute =
	"https://licenta-986d3-default-rtdb.europe-west1.firebasedatabase.app";

export default database;
