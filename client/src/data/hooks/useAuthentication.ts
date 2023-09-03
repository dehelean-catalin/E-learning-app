import {
	GithubAuthProvider,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	sendEmailVerification,
	signInWithEmailAndPassword,
	signInWithPopup,
} from "firebase/auth";
import platform from "platform";
import { useContext, useState } from "react";
import auth from "../../config/firebase.config";
import AuthContext from "../context/auth-context";
import {
	postLoginProvider,
	postRegister,
	updateConnection,
} from "../services/userService";
import authenticationErrorService from "./authError.helper";
import { useAxios } from "./useAxios";

type ErrorState = { code: string; message: string } | undefined;

export const useAuthentication = () => {
	const axios = useAxios();
	const { login } = useContext(AuthContext);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<ErrorState>();

	const device = platform.product ? platform.product : platform.name;

	const handleLogin = async (email: string, password: string) => {
		setIsLoading(true);
		try {
			const response = await signInWithEmailAndPassword(auth, email, password);
			const tokenID = await response.user.getIdToken();
			const location = await axios.get("https://ipapi.co/json/");
			login(tokenID);
			await updateConnection(axios, device, location.data.city);
		} catch (err) {
			console.log(err);
			const { getLoginError } = authenticationErrorService();
			const error = getLoginError(err);
			setError(error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleRegister = async (data) => {
		setIsLoading(true);
		const { displayName, email, password } = data;

		try {
			const response = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);

			const { emailVerified } = response.user;
			if (!emailVerified) sendEmailVerification(response.user);

			const token = await response.user.getIdToken();
			const loc = await axios.get("https://ipapi.co/json/");
			login(token);

			await postRegister(axios, {
				displayName,
				email,
				device,
				location: loc.data.city,
			});
		} catch (err) {
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
			const token = await res.user.getIdToken();
			const { email, displayName, photoURL } = res.user.providerData[0];
			const location = await axios.get("https://ipapi.co/json/");
			login(token);
			localStorage.setItem("email_verified", "true");
			await postLoginProvider(axios, {
				email,
				displayName,
				photoURL,
				device,
				location: location.data.city,
			});
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
