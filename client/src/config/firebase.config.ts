import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyAMCfsGozkpBxF4I32Xq5gqj5RaxNHu37g",
	authDomain: "licenta-986d3.firebaseapp.com",
	databaseURL:
		"https://licenta-986d3-default-rtdb.europe-west1.firebasedatabase.app",
	projectId: "licenta-986d3",
	messagingSenderId: "1073679862747",
	appId: "1:1073679862747:web:ad5b3cacea733901dbf5fe",
	measurementId: "G-7N69D2R5N9",
};

const application = initializeApp(firebaseConfig);
const auth = getAuth(application);

export default auth;

export const loginRoute = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${firebaseConfig.apiKey}`;
export const registerRoute = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${firebaseConfig.apiKey}`;
export const baseRoute =
	"https://licenta-986d3-default-rtdb.europe-west1.firebasedatabase.app";
