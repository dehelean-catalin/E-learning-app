import { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Outlet } from "react-router";
import NewForm from "../../components/Forms/NewForm";
import Header from "../../components/Header/Header";
import Notification from "../../components/Notification/Notification";
import SideBar from "../../components/SideBar/SideBar";
import AuthContext from "../../data/context/auth-context";
import { AccountDataActions } from "../../data/redux/account/AccountReducer";
const RootLayout = () => {
	const { token, emailVerified } = useContext(AuthContext);
	const dispatch = useDispatch();

	useEffect(() => {
		if (token) {
			dispatch(AccountDataActions.getAccountDataRequest());
		}
	}, [token]);

	if (!emailVerified) {
		return <Navigate to="/email-verified" replace />;
	}

	if (!token) {
		return <Navigate to="/login" replace />;
	}

	return (
		<div className="App">
			<SideBar />
			<Header />
			<Notification />
			<Outlet />
			<NewForm />
		</div>
	);
};

export default RootLayout;
