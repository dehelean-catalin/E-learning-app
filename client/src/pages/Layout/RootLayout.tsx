import { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import Notification from "../../components/BannerNotification/BannerNotification";
import NewForm from "../../components/Forms/NewForm";
import Header from "../../components/Header/Header";
import SideBar from "../../components/SideBar/SideBar";
import AuthContext from "../../store/context/auth-context";
const RootLayout = () => {
	const { token, logout } = useContext(AuthContext);

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
