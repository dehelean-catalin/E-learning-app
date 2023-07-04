import { signOut } from "firebase/auth";
import { createContext, FC, useState } from "react";
import { auth } from "../../config/firebase.config";

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
	handleDeleteUser: () => void;
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
	handleDeleteUser() {},
});

export const AuthContextProvider: FC<Props> = ({ children }) => {
	const initialToken = localStorage.getItem("token");
	const initialUserId = localStorage.getItem("userId");
	const initialEmailVerified = localStorage.getItem("emailVerified");
	const initProviderId = localStorage.getItem("providerId");

	const [token, setToken] = useState(initialToken);
	const [userId, setUserId] = useState(initialUserId);
	const [emailVerified, setEmailVerified] = useState<boolean>(
		initialEmailVerified === "true" ? true : false
	);

	const [providerId, setProviderId] = useState(initProviderId);

	const loginHandler = (token: string, userId: string) => {
		setToken(token);
		setUserId(userId);
		localStorage.setItem("userId", userId);
		localStorage.setItem("token", token);
	};

	const handleEmailVerified = () => {
		setEmailVerified(true);
		localStorage.setItem("emailVerified", "true");
	};

	const handleProviderId = (value: string) => {
		setProviderId(value);
		localStorage.setItem("providerId", value);
	};

	const logoutHandler = () => {
		signOut(auth).then(() => {
			setToken(null);
			localStorage.clear();
			window.location.replace("/login");
		});
	};
	const handleDeleteUser = () => {
		setToken(null);
		localStorage.clear();
		window.location.replace("/login");
	};

	const contexValue = {
		userId,
		token,
		emailVerified,
		login: loginHandler,
		handleEmailVerified,
		logout: logoutHandler,
		providerId,
		handleProviderId,
		handleDeleteUser,
	};
	return (
		<AuthContext.Provider value={contexValue}>{children}</AuthContext.Provider>
	);
};
export default AuthContext;
