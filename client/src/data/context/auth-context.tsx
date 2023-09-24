import { signOut } from "firebase/auth";
import { createContext, FC, useState } from "react";
import auth from "../../config/firebase.config";

type Props = {
	children: JSX.Element;
};

export interface IAuthContext {
	token: string;
	login: (token: string) => void;
	logout: () => void;
	handleDeleteUser: () => void;
	emailVerified: string;
	setEmailVerified: (state: string) => void;
}

const AuthContext = createContext<IAuthContext>({
	token: "",
	login: () => {},
	logout: () => {},
	handleDeleteUser() {},
	emailVerified: "false",
	setEmailVerified() {},
});

export const AuthContextProvider: FC<Props> = ({ children }) => {
	const initialToken = localStorage.getItem("token");
	const initialEmail = localStorage.getItem("email_verified");

	const [token, setToken] = useState(initialToken);
	const [email, setEmail] = useState(initialEmail ?? "false");

	const handleEmailVerified = (state) => {
		setEmail(state);
		localStorage.setItem("email_verified", state);
	};

	const loginHandler = (token: string) => {
		localStorage.setItem("token", token);
		setToken(token);
	};

	const logoutHandler = () => {
		signOut(auth).then(() => {
			setToken(null);
			setEmail(null);
			localStorage.clear();
		});
	};

	const handleDeleteUser = () => {
		setToken(null);
		setEmail(null);
		localStorage.clear();
	};

	const contexValue = {
		token,
		setToken,
		login: loginHandler,
		logout: logoutHandler,
		handleDeleteUser,
		emailVerified: email,
		setEmailVerified: handleEmailVerified,
	};
	return (
		<AuthContext.Provider value={contexValue}>{children}</AuthContext.Provider>
	);
};
export default AuthContext;
