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
}

const AuthContext = createContext<IAuthContext>({
	token: "",
	login: () => {},
	logout: () => {},
	handleDeleteUser() {},
});

export const AuthContextProvider: FC<Props> = ({ children }) => {
	const initialToken = localStorage.getItem("token");

	const [token, setToken] = useState(initialToken);

	const loginHandler = (token: string) => {
		localStorage.setItem("token", token);
		setToken(token);
	};

	const logoutHandler = () => {
		signOut(auth).then(() => {
			setToken(null);
			localStorage.clear();
		});
	};

	const handleDeleteUser = () => {
		setToken(null);
		localStorage.clear();
	};

	const contexValue = {
		token,
		setToken,
		login: loginHandler,
		logout: logoutHandler,
		handleDeleteUser,
	};
	return (
		<AuthContext.Provider value={contexValue}>{children}</AuthContext.Provider>
	);
};
export default AuthContext;
