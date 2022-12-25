import { createContext, useEffect, FC, useState } from "react";
import { redirect } from "react-router";
import { IAuthContext } from "../../resources/models/models";

let logoutTimer: any;
type Props = {
	children: JSX.Element;
};

const AuthContext = createContext<IAuthContext>({
	userId: "",
	token: "",
	isLogin: false,
	login: () => {},
	logout: () => {},
});

export const AuthContextProvider: FC<Props> = ({ children }) => {
	const initialToken = localStorage.getItem("token");
	const [token, setToken] = useState(initialToken);
	const [tokenExpirationDate, setTokenExpirationDate] = useState<Date>(null);
	const [userId, setUserId] = useState("");
	const loginHandler = (
		token: string,
		userId: string,
		expirationDate?: Date
	) => {
		setToken(token);
		setUserId(userId);
		const tokenExpirationDate =
			expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
		setTokenExpirationDate(tokenExpirationDate);
		localStorage.setItem("userId", userId);
		localStorage.setItem("token", token);
		localStorage.setItem("expirationDate", tokenExpirationDate.toISOString());
	};

	const logoutHandler = () => {
		setToken(null);
		localStorage.clear();
		redirect("/");
	};

	useEffect(() => {
		if (token && tokenExpirationDate) {
			const remainingTime =
				tokenExpirationDate.getTime() - new Date().getTime();
			logoutTimer = setTimeout(logoutHandler, remainingTime);
		} else {
			clearTimeout(logoutTimer);
		}
	}, [token, tokenExpirationDate]);

	useEffect(() => {
		const userId = localStorage.getItem("userId");
		const token = localStorage.getItem("token");
		const expirationDate = localStorage.getItem("expirationDate");

		if (token && userId && new Date(expirationDate) > new Date()) {
			loginHandler(token, userId, new Date(expirationDate));
		}
	}, []);

	const contexValue = {
		userId: userId,
		token: token,
		isLogin: !!token,
		login: loginHandler,
		logout: logoutHandler,
	};
	return (
		<AuthContext.Provider value={contexValue}>{children}</AuthContext.Provider>
	);
};
export default AuthContext;
