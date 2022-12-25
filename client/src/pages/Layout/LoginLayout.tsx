import { Navigate, Outlet } from "react-router";
import { useContext } from "react";
import AuthContext from "../../store/context/auth-context";

const LoginLayout = () => {
	const { isLogin } = useContext(AuthContext);
	if (isLogin) {
		return <Navigate to="/home?category=all" replace={true} />;
	}
	return (
		<div className="App">
			<Outlet />
		</div>
	);
};

export default LoginLayout;
