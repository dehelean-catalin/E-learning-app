import { createContext, FC, useState } from "react";
import { IAuthContext } from "../models/usersModel";

type Props = {
	children: JSX.Element;
};

const AuthContext = createContext<IAuthContext>({
	userId: "",
	token: "",
	emailVerified: false,
	handleEmailVerified: () => {},
	login: () => {},
	logout: () => {},
});

export const AuthContextProvider: FC<Props> = ({ children }) => {
	const initialToken = localStorage.getItem("token");
	const initialUserId = localStorage.getItem("userId");
	const initialEmailVerified = localStorage.getItem("emailVerified");
	const [token, setToken] = useState(initialToken);
	const [userId, setUserId] = useState(initialUserId);
	const [emailVerified, setEmailVerified] = useState(initialEmailVerified);

	const loginHandler = (token: string, userId: string) => {
		setToken(token);
		setUserId(userId);
		localStorage.setItem("userId", userId);
		localStorage.setItem("token", token);
	};

	const handleEmailVerified = () => {
		setEmailVerified("true");
		localStorage.setItem("emailVerified", "true");
	};
	const logoutHandler = () => {
		setToken(null);
		localStorage.clear();
		window.location.replace("/login");
	};

	const contexValue = {
		userId,
		token,
		emailVerified: !!emailVerified?.length,
		login: loginHandler,
		handleEmailVerified,
		logout: logoutHandler,
	};
	return (
		<AuthContext.Provider value={contexValue}>{children}</AuthContext.Provider>
	);
};
export default AuthContext;
