import axiosPub from "axios";
import {
	GithubAuthProvider,
	GoogleAuthProvider,
	browserLocalPersistence,
	createUserWithEmailAndPassword,
	sendEmailVerification,
	setPersistence,
	signInWithEmailAndPassword,
	signInWithPopup,
} from "firebase/auth";
import platform from "platform";
import { useContext, useState } from "react";
import auth from "../../config/firebase.config";
import AuthContext from "../context/auth-context";
import authenticationErrorService from "./authError.helper";
import { useAxios } from "./useAxios";

type ErrorState = { code: string; message: string } | undefined;

export const useAuthentication = () => {
	const axios = useAxios();
	const { login, setEmailVerified } = useContext(AuthContext);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<ErrorState>();

	const device = platform.product ? platform.product : platform.name;

	const handleLogin = async (email: string, password: string) => {
		setIsLoading(true);
		try {
			const response = await signInWithEmailAndPassword(auth, email, password);
			const tokenID = await response.user.getIdToken();
			const location = await axiosPub.get("https://ipapi.co/json/");
			login(tokenID);
			setEmailVerified("true");

			await setPersistence(auth, browserLocalPersistence);
			await axiosPub.post(
				"http://localhost:4000/connections",
				{
					device,
					location: location.data.city,
				},
				{ headers: { Authorization: `Bearer ${tokenID}` } }
			);
		} catch (err) {
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

			const token = await response.user.getIdToken();
			const loc = await axiosPub.get("https://ipapi.co/json/");
			login(token);
			setEmailVerified("false");

			await setPersistence(auth, browserLocalPersistence);
			await sendEmailVerification(response.user);
			await axios.post(
				"/account",
				{
					displayName,
					email,
					device,
					location: loc.data.city,
				},
				{ headers: { Authorization: `Bearer ${token}` } }
			);
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
			const response = await signInWithPopup(auth, provider);
			const { email, displayName, photoURL } = response.user.providerData[0];
			const location = await axiosPub.get("https://ipapi.co/json/");
			const token = await response.user.getIdToken();
			await axiosPub.post(
				"http://localhost:4000/login-provider",
				{
					email,
					displayName,
					photoURL,
					device,
					location: location.data.city,
				},
				{ headers: { Authorization: `Bearer ${token}` } }
			);
			login(token);
			setEmailVerified("true");
			await setPersistence(auth, browserLocalPersistence);
		} catch (err) {
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
