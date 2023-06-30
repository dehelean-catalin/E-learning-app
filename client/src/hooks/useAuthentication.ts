import axios from "axios";
import {
	postConnectionDetails,
	postLoginProvider,
	postRegister,
} from "data/services";
import {
	GithubAuthProvider,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signInWithPopup,
} from "firebase/auth";
import platform from "platform";
import { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../config/firebase.config";
import AuthContext from "../data/context/auth-context";
import { RegisterModel } from "../data/models/_auth.model";
import { findTypeOfDevice } from "../helpers/_findTypeOfDevice.helper";
import authenticationErrorService from "./services/authenticationErrorService";

type ErrorState = { code: string; message: string } | undefined;

export const useAuthentication = () => {
	const dispatch = useDispatch();
	const { login } = useContext(AuthContext);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<ErrorState>();

	const device = findTypeOfDevice(platform);

	const handleLogin = async (email: string, password: string) => {
		setIsLoading(true);
		try {
			const response = await signInWithEmailAndPassword(auth, email, password);
			const { uid } = response.user;

			const tokenID = await response.user.getIdToken();
			const location = await axios.get("https://ipapi.co/json/");

			await postConnectionDetails(uid, device, location.data.city);

			login(tokenID, uid);
		} catch (err) {
			console.log(err);
			const { getLoginError } = authenticationErrorService();
			const error = getLoginError(err);
			setError(error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleRegister = async (data: RegisterModel) => {
		setIsLoading(true);
		const { displayName, email, password } = data;

		try {
			const response = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);

			const { uid } = response.user;
			const token = await response.user.getIdToken();
			const loc = await axios.get("https://ipapi.co/json/");

			await postRegister({
				displayName,
				email,
				uid,
				device,
				city: loc.data.city,
			});
			login(token, uid);
		} catch (err) {
			console.log(err);
			const { getRegisterError } = authenticationErrorService();
			const error = getRegisterError(err);
			setError(error);
		} finally {
			setIsLoading(false);
		}
	};

	const loginWithProvider = async (
		provider: GoogleAuthProvider | GithubAuthProvider
	) => {
		try {
			provider.addScope("email");
			const res = await signInWithPopup(auth, provider);
			const { uid } = res.user;
			const token = await res.user.getIdToken();
			const { email, displayName, photoURL } = res.user.providerData[0];
			const location = await axios.get("https://ipapi.co/json/");

			await postLoginProvider({
				email,
				displayName,
				photoURL,
				uid,
				device,
				city: location.data.city,
			});

			login(token, uid);
			localStorage.setItem("emailVerified", "true");
		} catch (err) {
			console.log(err);
			const { getLoginError } = authenticationErrorService();
			const error = getLoginError(err);
			setError(error);
		} finally {
			setIsLoading(false);
		}
	};

	return {
		error,
		isLoading,
		setError,
		handleRegister,
		handleLogin,
		loginWithProvider,
	};
};
