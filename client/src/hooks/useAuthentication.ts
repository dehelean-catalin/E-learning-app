import axios from "axios";
import {
	GithubAuthProvider,
	GoogleAuthProvider,
	signInWithPopup,
} from "firebase/auth";
import platform from "platform";
import { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import AuthContext from "../data/context/auth-context";
import { FormActions } from "../data/redux/formReducer";
import { auth } from "../firebaseConfig";

export const useAuthentication = () => {
	const dispatch = useDispatch();
	const { login } = useContext(AuthContext);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState({
		code: null,
		message: null,
	});
	const getDevice = () => {
		if (platform.product) {
			return platform.product;
		}
		return platform.name;
	};
	const device = getDevice();

	const handleRegister = (data: any) => {
		setIsLoading(true);
		const { firstName, lastName, email, password } = data;
		axios
			.post("http://192.168.1.11:4000/register", {
				firstName,
				lastName,
				email,
				password,
				device,
			})
			.then((response) => {
				const { uid, token } = response.data;
				login(token, uid);
				dispatch(FormActions.openFormular({ type: "register" }));
			})
			.catch((err) => {
				setError(err.response.data);
			})
			.finally(() => setIsLoading(false));
	};

	const handleLogin = (email: string, password: string) => {
		setIsLoading(true);
		axios
			.post("http://192.168.1.11:4000/login", {
				email,
				password,
				device,
			})
			.then((response) => {
				const { uid, token } = response.data;
				login(token, uid);
			})
			.catch((err) => {
				setError(err.response.data);
			})
			.finally(() => setIsLoading(false));
	};
	const handleLoginWithGoogle = async () => {
		const provider = new GoogleAuthProvider();

		try {
			const result = await signInWithPopup(auth, provider);
			const credential = GoogleAuthProvider.credentialFromResult(result);
			login(credential.idToken, result.user.displayName);
		} catch (err: any) {
			console.log(err);
		}
	};
	const handleLoginWithGitHub = async () => {
		const provider = new GithubAuthProvider();

		try {
			const result = await signInWithPopup(auth, provider);
			const credential = GithubAuthProvider.credentialFromResult(result);
			console.log(credential);
			login(credential.idToken, result.user.displayName);
		} catch (err: any) {
			console.log(err);
		}
	};
	return {
		error,
		isLoading,
		handleRegister,
		handleLogin,
		handleLoginWithGoogle,
		handleLoginWithGitHub,
	};
};
