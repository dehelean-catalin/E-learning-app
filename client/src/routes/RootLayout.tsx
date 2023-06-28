import { AccountDataActions } from "data/redux/AccountReducer";
import { getAccountData } from "data/services";
import { useAxios } from "hooks/useAxios";
import { useFetchData } from "hooks/useFetchData";
import NotFoundError from "pages/NotFound/NotFoundError/NotFoundError";
import { ScrollTop } from "primereact/scrolltop";
import { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Outlet } from "react-router";
import Header from "../components/Header/Header";
import Notification from "../components/Notification/Notification";
import SideBar from "../components/SideBar/SideBar";
import AuthContext from "../data/context/auth-context";

const RootLayout = () => {
	const { token, emailVerified } = useContext(AuthContext);
	const dispatch = useDispatch();
	const axios = useAxios();
	console.log(emailVerified);
	const onSuccess = (e) => dispatch(AccountDataActions.setAccountData(e));

	const { isLoading, isError } = useFetchData(
		["getProfileData", token],
		() => getAccountData(axios),
		{
			onSuccess,
			enabled: !!token,
		}
	);

	useEffect(() => {
		if (isLoading) dispatch(AccountDataActions.setLoading(true));
	}, [isLoading]);

	if (isError) return <NotFoundError />;
	if (!emailVerified) return <Navigate to="/email-verified" replace />;
	if (!token) return <Navigate to="/login" replace />;

	return (
		<div className="App">
			<SideBar />
			<main className="main-wrapper">
				<Header />
				<div className="app-wrapper">
					<Outlet />
					<ScrollTop
						target="parent"
						threshold={600}
						className="mr-4 bg-primary"
						icon="pi pi-arrow-up text-base"
					/>
				</div>
			</main>
			<Notification />
		</div>
	);
};

export default RootLayout;
