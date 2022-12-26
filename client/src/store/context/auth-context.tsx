import { createContext, useEffect, FC, useState } from "react";
import { IAuthContext } from "../../resources/models/models";

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
	const [userId, setUserId] = useState("");

	const loginHandler = (token: string, userId: string) => {
		setToken(token);
		setUserId(userId);
		localStorage.setItem("userId", userId);
		localStorage.setItem("token", token);
	};

	const logoutHandler = () => {
		setToken(null);
		localStorage.clear();
	};

	useEffect(() => {
		const userId = localStorage.getItem("userId");
		const token = localStorage.getItem("token");

		if (token && userId) {
			loginHandler(token, userId);
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
