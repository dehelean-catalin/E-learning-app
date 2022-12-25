import { useNavigate } from "react-router";
import { FormActions } from "./../store/redux/formReducer";
import { NotificationActions } from "../store/redux/notificationReducer";
import { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import AuthContext from "../store/context/auth-context";
import { Axios } from "../resources/routes";
import { BannerNotificationType } from "../resources/models/models";
type Error = {
	code: string;
	field: string;
	message: string;
};
export const useAuthentication = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { login } = useContext(AuthContext);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<Error>({
		code: null,
		message: null,
		field: null,
	});

	const handleRegister = (data: any) => {
		setIsLoading(true);
		const { firstName, lastName, email, password } = data;
		Axios.post("/register", {
			firstName,
			lastName,
			email,
			password,
		})
			.then((response) => {
				const { uid, token } = response.data;
				login(token, uid);
				dispatch(
					NotificationActions.showBannerNotification({
						type: BannerNotificationType.Info,
						message: "Registration successfully",
					})
				);
				dispatch(FormActions.openFormular({ type: "register" }));
			})
			.catch((err) => {
				setError(err.response.data);
			})
			.finally(() => setIsLoading(false));
	};

	const handleLogin = (email: string, password: string) => {
		setIsLoading(true);
		Axios.post("/login", {
			email,
			password,
		})
			.then((response) => {
				const { uid, token } = response.data;
				login(token, uid);
				navigate("/home");
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
