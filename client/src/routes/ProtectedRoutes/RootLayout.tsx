import { AccountDataActions } from "data/redux/account/AccountReducer";
import { getAccountData } from "data/services";
import { useAxios } from "hooks/useAxios";
import { useFetchData } from "hooks/useFetchData";
import NotFoundError from "pages/NotFound/NotFoundError/NotFoundError";
import { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Outlet } from "react-router";
import NewForm from "../../components/Forms/NewForm";
import Header from "../../components/Header/Header";
import Notification from "../../components/Notification/Notification";
import SideBar from "../../components/SideBar/SideBar";
import AuthContext from "../../data/context/auth-context";

const RootLayout = () => {
	const { token, emailVerified } = useContext(AuthContext);
	const dispatch = useDispatch();
	const axios = useAxios();

	const onSuccess = (e) => dispatch(AccountDataActions.getAccountData(e));

	const { isLoading, isError } = useFetchData(
		["account", token],
		() => getAccountData(axios),
		{
			onSuccess,
			enabled: !!token,
		}
	);

	useEffect(() => {
		if (isLoading) dispatch(AccountDataActions.setLoading(true));
	}, [isLoading]);

	if (isError) {
		return <NotFoundError />;
	}

	if (!emailVerified) {
		return <Navigate to="/email-verified" replace />;
	}

	if (!token) {
		return <Navigate to="/login" replace />;
	}

	return (
		<div className="App">
			<SideBar />
			<main className="main-wrapper">
				<Header />
				<div className="app-wrapper">
					<Outlet />
				</div>
			</main>
			<Notification />
			<NewForm />
		</div>
	);
};

export default RootLayout;
