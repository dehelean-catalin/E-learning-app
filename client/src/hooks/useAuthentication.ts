import axios from "axios";
import { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import AuthContext from "../store/context/auth-context";
import { FormActions } from "./../store/redux/formReducer";

export const useAuthentication = () => {
	const dispatch = useDispatch();
	const { login } = useContext(AuthContext);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState({
		code: null,
		message: null,
	});

	const handleRegister = (data: any) => {
		setIsLoading(true);
		const { firstName, lastName, email, password } = data;
		axios
			.post("http://localhost:4000/register", {
				firstName,
				lastName,
				email,
				password,
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
			.post("http://localhost:4000/login", {
				email,
				password,
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

	return {
		error,
		isLoading,
		handleRegister,
		handleLogin,
	};
};
