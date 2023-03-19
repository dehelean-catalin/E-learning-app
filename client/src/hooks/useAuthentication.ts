import { postLogin, postLoginProvider, postRegister } from "data/services";
import {
	createUserWithEmailAndPassword,
	GithubAuthProvider,
	GoogleAuthProvider,
	signInWithEmailAndPassword,
	signInWithPopup,
} from "firebase/auth";
import platform from "platform";
import { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../config/firebase.config";
import AuthContext from "../data/context/auth-context";
import { RegisterModel } from "../data/models/_auth.model";
import { FormActions } from "../data/redux/formReducer";
import { findTypeOfDevice } from "./../helper/_findTypeOfDevice.helper";
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
			const token = await postLogin({
				email,
				uid,
				device,
			});

			setIsLoading(false);
			login(token, uid);
		} catch (err) {
			setIsLoading(false);
			const { getLoginError } = authenticationErrorService();
			const error = getLoginError(err);
			setError(error);
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

			const token = await postRegister({
				displayName,
				email,
				uid,
				device,
			});

			login(token, uid);
			dispatch(FormActions.openFormular({ type: "register" }));
		} catch (err) {
			setIsLoading(false);
			const { getRegisterError } = authenticationErrorService();
			const error = getRegisterError(err);
			setError(error);
		}
	};

	const loginWithProvider = async (
		provider: GoogleAuthProvider | GithubAuthProvider
	) => {
		try {
			provider.addScope("email");
			const result = await signInWithPopup(auth, provider);
			const { uid } = result.user;
			const { email, displayName, photoURL } = result.user.providerData[0];

			const axiosResponse = await postLoginProvider({
				email,
				displayName,
				photoURL,
				uid,
				device,
			});
			setIsLoading(false);
			login(axiosResponse, uid);
		} catch (err) {
			console.log(err);
			setIsLoading(false);
			const { getLoginError } = authenticationErrorService();
			const error = getLoginError(err);
			setError(error);
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
