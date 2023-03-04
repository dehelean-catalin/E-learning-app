import { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import AuthContext from "../../data/context/auth-context";

const LoginLayout = () => {
	const { token } = useContext(AuthContext);

	if (token) {
		return <Navigate to="/home?category=all" replace={true} />;
	}
	return (
		<div className="Auth">
			<Outlet />
		</div>
	);
};

export default LoginLayout;
