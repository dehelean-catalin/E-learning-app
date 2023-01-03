import { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import Notification from "../components/Notification/Notification";
import NewForm from "../components/Forms/NewForm";
import Header from "../components/Header/Header";
import SideBar from "../components/SideBar/SideBar";
import AuthContext from "../store/context/auth-context";
const RootLayout = () => {
	const { token } = useContext(AuthContext);
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
