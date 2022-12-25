import { useEffect, useContext } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router";
import NewForm from "../../components/Forms/NewForm";
import Notification from "../../components/BannerNotification/BannerNotification";
import Header from "../../components/Header/Header";
import NavigationHeader from "../../components/Header/NavigationHeader/NavigationHeader";
import { Axios } from "../../resources/routes";
import AuthContext from "../../store/context/auth-context";
import { AppInitializationActions } from "../../store/redux/appInitializationReducer";
const RootLayout = () => {
	const dispatch = useDispatch();

	const { token } = useContext(AuthContext);

	useEffect(() => {
		if (token) {
			Axios.get("/app-initialization", {
				headers: {
					authorization: "Bearer " + token,
				},
			})
				.then((response) => {
					dispatch(
						AppInitializationActions.getInitializationData(response.data)
					);
				})
				.catch((err) => console.log(err));
		}
	}, [token]);
	if (!token) {
		return <Navigate to="/login" replace />;
	}

	return (
		<div className="App">
			<NavigationHeader />
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
