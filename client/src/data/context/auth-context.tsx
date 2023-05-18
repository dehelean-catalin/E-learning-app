import { createContext, FC, useState } from "react";

type Props = {
	children: JSX.Element;
};
export interface IAuthContext {
	userId: string;
	token: string;
	emailVerified: boolean;
	providerId: string;
	login: (token: string, userId: string) => void;
	handleEmailVerified: () => void;
	logout: () => void;
	handleProviderId: (providerId: string) => void;
}

const AuthContext = createContext<IAuthContext>({
	userId: "",
	token: "",
	emailVerified: false,
	providerId: "",
	handleEmailVerified: () => {},
	login: () => {},
	logout: () => {},
	handleProviderId: () => {},
});

export const AuthContextProvider: FC<Props> = ({ children }) => {
	const initialToken = localStorage.getItem("token");
	const initialUserId = localStorage.getItem("userId");
	const initialEmailVerified = localStorage.getItem("emailVerified");
	const initProviderId = localStorage.getItem("providerId");

	const [token, setToken] = useState(initialToken);
	const [userId, setUserId] = useState(initialUserId);
	const [emailVerified, setEmailVerified] = useState(initialEmailVerified);
	const [providerId, setProviderId] = useState(initProviderId);

	const loginHandler = (token: string, userId: string) => {
		setToken(token);
		setUserId(userId);
		setEmailVerified("true");
		localStorage.setItem("emailVerified", "true");
		localStorage.setItem("userId", userId);
		localStorage.setItem("token", token);
	};

	const handleEmailVerified = () => {
		setEmailVerified("true");
		localStorage.setItem("emailVerified", "true");
	};
	const handleProviderId = (value: string) => {
		setProviderId(value);
		localStorage.setItem("providerId", value);
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
		providerId,
		handleProviderId,
	};
	return (
		<AuthContext.Provider value={contexValue}>{children}</AuthContext.Provider>
	);
};
export default AuthContext;
