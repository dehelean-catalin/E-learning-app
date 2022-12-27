import { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Outlet } from "react-router";
import Notification from "../../components/BannerNotification/BannerNotification";
import NewForm from "../../components/Forms/NewForm";
import Header from "../../components/Header/Header";
import SideBar from "../../components/SideBar/SideBar";
import { Axios } from "../../resources/routes";
import AuthContext from "../../store/context/auth-context";
import { AppInitializationActions } from "../../store/redux/appInitReducer";
const RootLayout = () => {
	const dispatch = useDispatch();
	const { token, logout } = useContext(AuthContext);
	const [error, setError] = useState(false);

	useEffect(() => {
		if (token) {
			Axios.get("/app-initialization", {
				headers: {
					authorization: "Bearer " + token,
				},
			})
				.then((response) => {
					dispatch(AppInitializationActions.setAppInitData(response.data));
				})
				.catch((err) => setError(true));
		}
	}, [token]);

	if (!token) {
		logout();
		return <Navigate to="/login" replace />;
	}

	return (
		<div className="App">
			<SideBar />
			<div className="box">
				<Header />
				<Notification />
				<Outlet />
			</div>
			<NewForm />
		</div>
	);
};

export default RootLayout;
