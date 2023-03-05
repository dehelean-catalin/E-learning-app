import axios, { AxiosResponse } from "axios";
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
import { auth } from "../config/firebaseConfig";
import AuthContext from "../data/context/auth-context";
import { ProviderAuthModel, RegisterModel } from "../data/models/authModel";
import { FormActions } from "../data/redux/formReducer";
import authenticationErrorService from "./services/authenticationErrorService";

type ErrorState = { code: string; message: string } | undefined;

export const useAuthentication = () => {
	const dispatch = useDispatch();
	const { login } = useContext(AuthContext);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<ErrorState>();

	const getDevice: () => string = () => {
		if (platform.product) {
			return platform.product;
		}
		return platform.name;
	};

	const device = getDevice();

	const handleLogin = async (email: string, password: string) => {
		setIsLoading(true);
		try {
			const response = await signInWithEmailAndPassword(auth, email, password);
			const { uid } = response.user;
			const axiosResponse = await axios.post("http://localhost:4000/login", {
				email,
				uid,
				device,
			});
			setIsLoading(false);
			const { token } = axiosResponse.data;
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

			const axiosResponse = await axios.post<
				any,
				AxiosResponse<string>,
				ProviderAuthModel
			>("http://localhost:4000/register", {
				displayName,
				email,
				uid,
				device,
			});
			login(axiosResponse.data, uid);
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

			const axiosResponse = await axios.post<
				any,
				AxiosResponse<string>,
				ProviderAuthModel
			>("http://localhost:4000/login-provider", {
				displayName,
				email,
				uid,
				device,
				photoURL,
			});

			setIsLoading(false);
			login(axiosResponse.data, uid);
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
